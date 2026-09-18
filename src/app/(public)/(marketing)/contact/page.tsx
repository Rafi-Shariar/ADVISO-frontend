"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API কল বা মেসেজ প্রসেসিং সিমুলেশন
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "Our team will reach out to you within 24 hours.",
        position: "top-right",
      });
    }, 1000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          We&apos;re Here to Help You Grow
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have questions about mentorship, bookings, or becoming an advisor?
          Drop us a line and our team will get back to you shortly.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-[12px] bg-card border border-border/70 p-6 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-foreground">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                    Direct Email
                  </p>
                  <a
                    href="mailto:support@adviso.com"
                    className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors"
                  >
                    support@adviso.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                    Response Window
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Within 24 hours (Mon - Fri)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                    Headquarters
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ / Note Box */}
          <div className="rounded-[12px] bg-muted/40 border border-border/60 p-5 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-orange-500" />
              Looking for Mentorship Guidance?
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you want to apply as a mentor or explore active sessions, you
              can also browse our top-rated mentors directly from the directory.
            </p>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-[12px] bg-card border border-border/70 p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
                  We have received your message. One of our advisors will review
                  it and get back to you shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="rounded-[12px] mt-4 border-border/70 hover:border-orange-500 text-xs"
                >
                  Send Another Note
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground">
                      Full Name
                    </Label>

                    <Input
                      required
                      placeholder="e.g. Rafi Shariar"
                      className="rounded-[12px] border-border/70 focus-visible:ring-orange-500 text-xs sm:text-sm h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="rounded-[12px] border-border/70 focus-visible:ring-orange-500 text-xs sm:text-sm h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-foreground">
                    Subject
                  </Label>
                  <Input
                    required
                    placeholder="e.g. Inquiry about Mentor Verification"
                    className="rounded-[12px] border-border/70 focus-visible:ring-orange-500 text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-foreground">
                    Your Message
                  </Label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Tell us what you need help with..."
                    className="rounded-[12px] border-border/70 focus-visible:ring-orange-500 text-xs sm:text-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-[12px] bg-orange-500 hover:bg-orange-600 text-white font-medium gap-2 shadow-sm transition-all h-10 cursor-pointer text-xs sm:text-sm"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
