import React from "react";
import { 
  DollarSign, 
  Wallet, 
  ArrowDownRight, 
  ArrowUpRight, 
  PieChart 
} from "lucide-react";

export interface IFinancialOverview {
  totalRevenue: number;
  platformEarnings: number;
  mentorPayouts: number;
}

interface Props {
  financials?: IFinancialOverview;
}

export const FinancialCards = ({ financials }: Props) => {
  const total = financials?.totalRevenue ?? 0;
  const platform = financials?.platformEarnings ?? 0;
  const payouts = financials?.mentorPayouts ?? 0;

  // Platform Cut Calculation (%)
  const platformRate = total > 0 ? ((platform / total) * 100).toFixed(1) : "0";
  const payoutRate = total > 0 ? ((payouts / total) * 100).toFixed(1) : "0";

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
      {/* 1. Primary Highlight Card: Gross Platform Volume (Takes 5 columns) */}
      <div className="lg:col-span-5 rounded-[12px] border border-orange-500/20 bg-gradient-to-b from-orange-500/[0.04] to-card p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative watermark */}
        <DollarSign className="absolute -right-4 -bottom-4 size-32 text-orange-500/[0.03] stroke-[1] pointer-events-none" />

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground">
              Total Processed Volume
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-foreground pt-2">
            {formatCurrency(total)}
          </h2>
        </div>

        <div className="pt-6 mt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span>Gross transaction value</span>
          <span className="font-mono text-foreground font-semibold">100% Inflow</span>
        </div>
      </div>

      {/* 2. Breakdown Panel: Platform Margin vs Mentor Distribution (Takes 7 columns) */}
      <div className="lg:col-span-7 rounded-[12px] border border-border/70 bg-card p-6 flex flex-col justify-between space-y-6">
        <div>
          {/* Header Strip */}
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <PieChart className="size-4 text-muted-foreground/70" />
              <span className="text-xs font-semibold text-foreground tracking-tight">
                Net Margin vs Community Payouts
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              Ratio {platformRate}% / {payoutRate}%
            </span>
          </div>

          {/* Comparative Cashflow Bar */}
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden flex">
              <div
                style={{ width: `${platformRate}%` }}
                className="bg-emerald-500/90 h-full transition-all duration-500"
              />
              <div
                style={{ width: `${payoutRate}%` }}
                className="bg-blue-500/80 h-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Distributed Sub-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Platform Net Earnings */}
          <div className="rounded-[8px] bg-muted/20 border border-border/50 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Platform Cut
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                <ArrowUpRight className="size-3.5" />
                <span>{platformRate}%</span>
              </div>
            </div>
            <div className="text-xl font-bold font-mono text-foreground mt-1.5">
              {formatCurrency(platform)}
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-1">
              Net retained platform commission
            </p>
          </div>

          {/* Mentor Outflow */}
          <div className="rounded-[8px] bg-muted/20 border border-border/50 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Mentor Payouts
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-blue-500">
                <ArrowDownRight className="size-3.5" />
                <span>{payoutRate}%</span>
              </div>
            </div>
            <div className="text-xl font-bold font-mono text-foreground mt-1.5">
              {formatCurrency(payouts)}
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-1">
              Disbursed directly to instructors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCards;