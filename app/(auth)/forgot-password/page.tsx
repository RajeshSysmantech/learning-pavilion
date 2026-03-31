import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
      <Card className="w-full space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-ink">Reset password</h1>
          <p className="text-sm text-slate-500">OTP-ready architecture can plug into SMS or email verification here.</p>
        </div>
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email or mobile number" />
        <Button className="w-full">Send reset link</Button>
      </Card>
    </div>
  );
}
