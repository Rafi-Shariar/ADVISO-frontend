export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED"


export interface PaymentParams {
  status?: PaymentStatus;
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}