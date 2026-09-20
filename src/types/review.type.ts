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
