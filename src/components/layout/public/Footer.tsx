"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Send, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const navigationLinks = {
  platform: [
    { label: "Find Mentors", href: "/mentors" },
    { label: "Explore Domains", href: "/mentors?category=all" },
    { label: "Become a Mentor", href: "/apply" },
    { label: "Book a Strategy Call", href: "/mentors" },
    { label: "Pricing & Sessions", href: "/pricing" },
  ],
  domains: [
    {
      label: "Software Engineering",
      href: "/mentors?domain=SOFTWARE_ENGINEERING",
    },
    { label: "Product Management", href: "/mentors?domain=PRODUCT_MANAGEMENT" },
    {
      label: "System Design & Cloud",
      href: "/mentors?domain=SOFTWARE_ENGINEERING",
    },
    {
      label: "Career & Job Search",
      href: "/mentors?domain=CAREER_AND_JOB_SEARCH",
    },
    {
      label: "Higher Ed & Migration",
      href: "/mentors?domain=HIGHER_EDUCATION_AND_ADMISSIONS",
    },
  ],
  company: [
    { label: "About Adviso", href: "/about-us" },
    { label: "How It Works", href: "/about-us#how-it-works" },
    { label: "Customer Stories", href: "/stories" },
    { label: "Contact Support", href: "/contact" },
    { label: "Privacy & Terms", href: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Newsletter logic here
  };

  return (
    <footer className="w-full bg-[#0A0A0C] text-white border-t border-zinc-800/80 selection:bg-orange-500/30 selection:text-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* ================= TOP CTA BANNER ================= */}
        <div className="rounded-[12px] bg-zinc-900/70 border border-zinc-800 p-8 sm:p-10 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-mono uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              <span>Direct Mentorship</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Ready to unblock your next career milestone?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Get matched with vetted operators from top tech firms and start
              booking tactical calls today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 w-full sm:w-auto">
            <Link href="/mentors" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-11 px-6 rounded-[12px] bg-white text-zinc-950 hover:bg-orange-500 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                <span>Browse Mentors</span>
                <ArrowUpRight className="size-4" />
              </Button>
            </Link>
            <Link href="/apply" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-11 px-6 rounded-[12px] border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800 text-zinc-300 font-medium text-xs tracking-wide transition-all active:scale-95"
              >
                Join as an Expert
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= MAIN LINKS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-zinc-800/80">
          {/* Brand Column & Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-3">
              {/* <Link href="/" className="inline-flex items-center gap-2">
                <span className="size-8 rounded-[8px] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                  A
                </span>
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  ADVISO
                </span>
              </Link> */}
              <Logo textClassName="text-white text-2xl font-semibold" />
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
                A modern mentorship and career engineering ecosystem. Connect
                1-on-1 with industry practitioners for tactical guidance.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-2.5 max-w-sm">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Weekly Tactical Insights
              </label>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="w-full h-10 px-3.5 rounded-[12px] bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/80 transition-colors"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 px-4 rounded-[12px] bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shrink-0 transition-all"
                >
                  <Send className="size-3.5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links Column 1: Platform */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              // Platform
            </p>
            <ul className="space-y-2.5">
              {navigationLinks.platform.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2: Domains */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              // Domains
            </p>
            <ul className="space-y-2.5">
              {navigationLinks.domains.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 3: Company */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              // Company
            </p>
            <ul className="space-y-2.5">
              {navigationLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM SUB-FOOTER ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright & Live Service Status */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            <span>© {currentYear} Adviso Inc. All rights reserved.</span>
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-zinc-400">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Social Icons Strip */}
          {/* Social Icons Strip */}
          <div className="flex items-center gap-2">
            {[
              {
                label: "GitHub",
                href: "https://github.com",
                svg: (
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                ),
              },
              {
                label: "X (Twitter)",
                href: "https://twitter.com",
                svg: (
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com",
                svg: (
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66z" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="size-9 rounded-[10px] bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 flex items-center justify-center transition-all active:scale-95"
              >
                {item.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
