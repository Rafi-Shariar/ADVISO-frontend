export interface IUserAnalytic {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  totalPayment: number;
  pendingReviews: number;
  nextSession: {
    sessionId: string;
    mentorName: string;
    mentorProfileURL: string;
    mentorHeadline: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingLink: string;
  };
}
