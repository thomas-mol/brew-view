import { Timestamp } from "firebase/firestore";

interface Review {
  id: string;
  uid: string;
  title: string;
  type: string;
  location: string;
  date: Timestamp;
  roast: string;
  score: number;
  photo_url?: string;
}

export default Review;
