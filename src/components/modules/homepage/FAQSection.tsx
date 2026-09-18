"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FAQItem {
  id: string;
  code: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "item-1",
    code: "FAQ_01",
    question: "How are mentors vetted on Adviso?",
    answer:
      "Every mentor goes through manual identity verification, background audits of their verifiable engineering/product credentials, and an interview process to ensure real tactical depth rather than theoretical advice.",
  },
  {
    id: "item-2",
    code: "FAQ_02",
    question: "How do 1-on-1 strategy sessions work?",
    answer:
      "Once you select a mentor, you pick an open slot directly from their calendar and provide an upfront agenda (repo links, resume, or systemic blockers). Calls occur directly on our secure platform with structured follow-up notes.",
  },
  {
    id: "item-3",
    code: "FAQ_03",
    question: "What happens if a session doesn't meet expectations?",
    answer:
      "We enforce a strict satisfaction guarantee. If a scheduled session suffers from connectivity failure or a verified mismatched agenda, our support team reviews the session notes and initiates a full refund or rebooking credit.",
  },
  {
    id: "item-4",
    code: "FAQ_04",
    question: "Can I book mentors for recurring long-term guidance?",
    answer:
      "Yes. While single 30 to 45-minute tactical unblocking sessions are standard, mentors offer custom monthly cadence plans for continuous career transitions, system architecture mentorship, or leadership prep.",
  },
  {
    id: "item-5",
    code: "FAQ_05",
    question: "How do payouts and session charges work for mentors?",
    answer:
      "Mentors define their own hourly or session rates transparently. All checkout transactions are secured end-to-end with automated invoicing and clear breakdown fees—no surprise subscriptions.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("item-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8  dark:bg-zinc-950 selection:bg-orange-500/20 selection:text-orange-600">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Everything you need to know about booking, sessions, and vetted
            mentorship standards.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-[12px] border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-card border-orange-500/40 shadow-xs"
                    : "bg-card/60 border-border/60 hover:border-border"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-orange-600 dark:text-orange-400 shrink-0">
                      {faq.code}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-foreground truncate-none leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`size-7 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-orange-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="size-3.5" />
                    ) : (
                      <Plus className="size-3.5" />
                    )}
                  </div>
                </button>

                {/* Animated Body Dropdown */}
                <div
                  className={`grid transition-all duration-200 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="rounded-[12px] bg-muted/40 border border-border/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="size-9 rounded-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <HelpCircle className="size-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">
                Have a unique query not covered here?
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Reach out directly to our team for platform or enterprise
                advisory setups.
              </p>
            </div>
          </div>

          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              className="w-full sm:w-auto h-9 px-4 rounded-[12px] border-border text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <span>Contact Desk</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
