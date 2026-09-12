"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "sonner";

const VerifyAccountForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("")
  const [isInvalid, setIsInvalid] = useState(false)
  const router = useRouter()

  const {mutate : verify, isPending} = useVerifyAccount()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(()=>{

    if(!email){
        router.push('/')
    }

  }, [email])

  const handleOTP = () => {
    if(otp.length !== 6){
        setIsInvalid(true)
        return
    }

    const verifyData = {
        email,
        otp
    }

    verify(verifyData, {
        onSuccess: (res) => {
          
          toast.success("Email Verified Successfully.", {
            description: "Your account has been verified. Welcome onboard",
            position: "top-right",
          });


          router.push(`/`);
        },
        onError: (err: any) => {
          const errorDescription =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";

          toast.error("Login Failed.", {
            description: errorDescription,
            position: "top-right",
          });
        },
      });


  };


  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
         <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp"> OTP</FieldLabel>
             <InputOTP maxLength={6} 
          onChange={(value) => {
            setOtp(value)
            if(isInvalid){
                setIsInvalid(false)
            }
          }}
          name="otp"
          id="otp"
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {
            isInvalid && <FieldError errors={[{message: "Invalid Code. Please try again"}]}/>
          }
         </Field>


          <Button type="submit"> Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyAccountForm;
