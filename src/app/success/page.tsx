 "use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">✅ Payment Successful!</h1>
      <p className="mb-6">Your account has been upgraded to Pro.</p>
      <Button onClick={() => router.push("/builder")}>Go to Builder</Button>
    </div>
  );
}
