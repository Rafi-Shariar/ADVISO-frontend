import apiClient from "@/lib/apiClient";
import type { PaymentParams } from "@/types/payment.type";

export const getAllPaymentsAdmin = (params: PaymentParams) => {
  return apiClient(`/api/v1/payment/admin/all-payments`, { params });
};

export const getPaymentDetailsAdmin = (id: string) => {
  return apiClient(`/api/v1/payment/admin/all-payments/${id}`);
};

export const getAllPaymentsUser = () => {
  return apiClient(`/api/v1/payment/my-payments`);
};
