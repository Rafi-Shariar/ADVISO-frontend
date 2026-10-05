export interface ISessionAdmin {
  sessionId: string;
  userName: string;
  userEmail: string;
  userProfileURL: string;
  mentorName: string;
  mentorEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  fees: number;
  paymentStatus: string;
  platformCharge: number;
  mentorEarnings: number;
}
