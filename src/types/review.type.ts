export interface IReview {
  session: {
    user: {
      name: string;
      profileURL: string;
    };
  };
  ratings: string;
  comment: string;
}

export interface IFeedback {
  reviewId: string
  sessionId: string;
  mentorId: string;
  ratings: string;
  comment: string
  createdAt: string
  updatedAt: string
  session: {
    sessionId: string
    sessionDate: string
    user: {
      userId: string
      name: string
      email: string
    };
  };
  mentor: {
    mentorId: string
    user: {
      name: string
      email: string
    };
  };
}
