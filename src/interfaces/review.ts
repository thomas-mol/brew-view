interface Review {
  id: number;
  title: string;
  body: string;
  location: string;
  date: string;
  roast: string;
  score: number;
  photo?: {
    url: string;
    thumbnailUrl: string;
  };
}

export default Review;
