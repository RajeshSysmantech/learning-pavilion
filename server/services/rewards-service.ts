import { RedemptionStatus, WalletDirection, WalletEntryType, WalletReason } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { canRedeemReward } from "@/server/services/reward-rules";
import { createLedgerEntryTx } from "@/server/services/wallet-service";

export async function redeemReward(userId: bigint, rewardId: bigint) {
  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });

  if (!reward || !reward.isPublished) throw new Error("Reward not found");
  if (!profile) throw new Error("Student profile not found");
  if (!canRedeemReward({ coins: profile.totalCoins, coinCost: reward.coinCost, stock: reward.stock })) {
    throw new Error("Reward cannot be redeemed");
  }

  return prisma.$transaction(async (tx) => {
    const redemption = await tx.rewardRedemption.create({
      data: {
        userId,
        rewardId,
        coinsDebited: reward.coinCost,
        status: reward.requiresApproval ? RedemptionStatus.PENDING : RedemptionStatus.APPROVED
      }
    });

    await createLedgerEntryTx(tx, {
      userId,
      entryType: WalletEntryType.COIN,
      direction: WalletDirection.DEBIT,
      reason: WalletReason.REWARD_REDEMPTION,
      amount: reward.coinCost,
      relatedType: "reward_redemption",
      relatedId: redemption.id
    });

    if (typeof reward.stock === "number") {
      await tx.reward.update({
        where: { id: rewardId },
        data: { stock: { decrement: 1 } }
      });
    }

    return redemption;
  });
}
