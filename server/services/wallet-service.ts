import { Prisma, PrismaClient, WalletDirection, WalletEntryType, WalletReason } from "@prisma/client";
import { prisma } from "@/server/db/prisma";

export type LedgerInput = {
  userId: bigint;
  entryType: WalletEntryType;
  reason: WalletReason;
  amount: number;
  direction: WalletDirection;
  relatedType?: string;
  relatedId?: bigint;
  metadata?: Prisma.JsonValue;
};

export function computeNewBalance(currentBalance: number, direction: WalletDirection, amount: number) {
  return direction === WalletDirection.CREDIT ? currentBalance + amount : currentBalance - amount;
}

type LedgerClient = Prisma.TransactionClient | PrismaClient;

async function createLedgerEntryWithClient(
  client: LedgerClient,
  input: LedgerInput
) {
  const profile = await client.studentProfile.findUnique({
    where: { userId: input.userId }
  });

  if (!profile) {
    throw new Error("Student profile not found");
  }

  const currentBalance =
    input.entryType === WalletEntryType.COIN ? profile.totalCoins : profile.totalXp;
  const balanceAfter = computeNewBalance(currentBalance, input.direction, input.amount);

  if (balanceAfter < 0) {
    throw new Error("Insufficient balance");
  }

  const transaction = await client.walletTransaction.create({
    data: {
      userId: input.userId,
      entryType: input.entryType,
      direction: input.direction,
      reason: input.reason,
      amount: input.amount,
      balanceAfter,
      relatedType: input.relatedType,
      relatedId: input.relatedId,
      ...(input.metadata === undefined || input.metadata === null
        ? {}
        : { metadata: input.metadata })
    }
  });

  await client.studentProfile.update({
    where: { userId: input.userId },
    data:
      input.entryType === WalletEntryType.COIN
        ? { totalCoins: balanceAfter }
        : { totalXp: balanceAfter }
  });

  return transaction;
}

export async function createLedgerEntry(input: LedgerInput) {
  return prisma.$transaction(async (tx) => {
    return createLedgerEntryWithClient(tx, input);
  });
}

export async function createLedgerEntryTx(
  client: LedgerClient,
  input: LedgerInput
) {
  return createLedgerEntryWithClient(client, input);
}
