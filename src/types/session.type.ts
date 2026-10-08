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

export interface ISessionDetailsAdmin {
  sessionId: string;
  userId: string;
  mentorId: string;
  scheduleId: string;
  slotId: string;
  sessionFees: string;
  sessionDate: string;
  startUTC: string;
  endUTC: string;
  status: string;
  purpose: string;
  completedSession: boolean;
  feedbackByMentor?: string;
  meetingLink: string;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  mentor: Mentor;
  slot: Slot;
  payment?: Payment;
  review: Review;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  profileURL: string;
  accountStatus: string;
  createdAt: string;
}

export interface Mentor {
  mentorId: string;
  headline: string;
  sessionCharge: string;
  user: User2;
}

export interface User2 {
  userId: string;
  name: string;
  email: string;
  profileURL: string;
}

export interface Slot {
  slotId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  schedule: {
    scheduleId: string;
    date: string;
  };
}

export interface Review {
  reviewId: string;
  ratings: string;
  comment: string;
  createdAt: string;
}

export interface Payment {
  paymentId: string;
  transactionId: string;
  bkashPaymentId: string;
  payerReference: string;
  amount: number;
  platformCharge: number;
  mentorEarnings: number;
  status: string;
  paidAt: string;
  gatewayResponse: string;
  createdAt: string;
}

export interface MentorSessions {
  sessionId: string;
  meetingLink: string;
  user: {
    name: string;
    profileURL: string;
  };
  slot: {
    startTime: string;
    endTime: string;
    schedule: {
      date: string;
    };
  };
}

export interface BookSchedule {
  slotId: string;
  purpose: string;
}

export interface PaySchedulePayload {
  sessionId: string;
}

export interface CancleSession {
  sessionId: string;
  cancellationReason: string;
}

export type SessionStatusType = "PENDING" | "COMFIRMED" | "CONFIRMED" | "CANCELLED";

export interface IUserSessionDetails {
  sessionId: string;
  userId: string;
  mentorId: string;
  scheduleId: string;
  slotId: string;
  sessionFees: string | number;
  sessionDate: string;
  startUTC: string;
  endUTC: string;
  status: SessionStatusType;
  purpose: string;
  completedSession: boolean;
  feedbackByMentor: string | null;
  meetingLink: string | null;
  cancellationReason: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  mentor: {
    mentorId: string;
    headline: string;
    user: {
      name: string;
      email: string;
      profileURL?: string;
    };
  };
  payment?: {
    paymentId: string;
    status: string;
    amount: string | number;
    transactionId: string;
    paidAt: string;
  } | null;
}