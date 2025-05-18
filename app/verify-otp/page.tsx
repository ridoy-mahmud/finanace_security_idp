"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation - any input is accepted
    toast.success("OTP verified successfully!");
    // Redirect to dashboard or home page after 1 second
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify OTP
          </CardTitle>
          <CardDescription className="text-center">
            Please enter the OTP sent to your email/phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
            <div className="text-center text-sm text-gray-500">
              <p>Didn't receive the OTP?</p>
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => toast.info("New OTP sent! (Dummy)")}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
