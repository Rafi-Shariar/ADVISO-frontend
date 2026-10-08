export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface PaymentParams {
  status?: PaymentStatus;
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IPayment {
  paymentId: string;
  amount: number;
  paidAt: string;
  status: PaymentStatus;
  platformCharge: number;
  mentorEarnings: number;
  session: {
    mentor: {
      user: {
        name: string;
        profileURL: string;
      };
    };
    sessionDate: string;
    startUTC: string;
    endUTC: string;
  };
}
