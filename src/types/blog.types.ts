export interface BlogItem {
  blogId: string;
  title: string;
  content: string;
  bannerImage: string;
  createdAt: string;
  mentor: {
    mentorId: string;
    headline: string;
    user: {
      name: string;
      profileURL: string;
    };
  };
}

export interface BlogItemInMentorDetails {
  blogId : string;
  bannerImage : string;
  title : string;
  createdAt : string;
}
