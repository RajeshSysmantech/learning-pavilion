import { describe, expect, it } from "vitest";
import { computeNewBalance } from "@/server/services/wallet-service";

describe("wallet ledger balance math", () => {
  it("credits balance correctly", () => {
    expect(computeNewBalance(100, "CREDIT", 50)).toBe(150);
  });

  it("debits balance correctly", () => {
    expect(computeNewBalance(100, "DEBIT", 40)).toBe(60);
  });
});
