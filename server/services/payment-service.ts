export type CheckoutPayload = {
  provider: "stripe" | "razorpay";
  planSlug: string;
  couponCode?: string;
  userId: bigint;
};

export async function createCheckoutSession(payload: CheckoutPayload) {
  return {
    provider: payload.provider,
    checkoutUrl: `/subscription/checkout?provider=${payload.provider}&plan=${payload.planSlug}`
  };
}
