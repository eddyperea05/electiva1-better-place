import type { Timestamp } from "firebase/firestore";

export interface comment {
  comment: string;
  publicationDate: Timestamp;
  rate: number;
  uid: string;
}

export interface CommentsInterface {
  comment: string;
  publicationDate: Date;
  userName: string;
  image: string;
  rawDate: Date;
  rate: number;
}
