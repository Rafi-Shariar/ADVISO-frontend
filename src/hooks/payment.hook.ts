import {
  getAllPaymentsAdmin,
  getAllPaymentsUser,
  getPaymentDetailsAdmin,
} from "@/api/payment.api";
import { PaymentParams } from "@/types/payment.type";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetAllPaymentsAdmin(params: PaymentParams) {
  return useSuspenseQuery({
    queryKey: [`payments`, params],
    queryFn: () => getAllPaymentsAdmin(params),
  });
}

export function usePaymentDetailsAdmin(id: string) {
  return useQuery({
    queryKey: [`payment-details`, id],
    queryFn: () => getPaymentDetailsAdmin(id),
    enabled: Boolean(id),
  });
}

export function useGetAllPaymentUser() {
  return useQuery({
    queryKey: [`my-payments`],
    queryFn: getAllPaymentsUser,
  });
}
