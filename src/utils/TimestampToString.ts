import { Timestamp } from "firebase/firestore";

export function TimestampToString(timestamp: Timestamp): string {
  let date = timestamp.toDate();

  return `${date.getDate().toString().padStart(2, "0")}/ ${date
    .getMonth()
    .toString()
    .padStart(2, "0")}/ '${date.getFullYear().toString().slice(2, 4)}`;
}
