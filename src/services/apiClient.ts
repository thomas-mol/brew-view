import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type Filters<T> = Partial<{
  [K in keyof T]: T[K];
}>;

class APIClient<T extends DocumentData> {
  collectionRef: string;

  constructor(collection: string, private defaultFilters: Filters<T> = {}) {
    this.collectionRef = collection;
  }

  async getAll(options?: Filters<T>): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionRef));
    const data: T[] = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }))
      .filter((item) => {
        const filters = { ...this.defaultFilters, ...options };
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null || value === "")
            return true;
          return item[key as keyof T] === value;
        });
      });
    return data;
  }

  async post(toAdd: T): Promise<T> {
    try {
      await addDoc(collection(db, this.collectionRef), { ...toAdd });
    } catch (error) {
      console.log(error);
    }
    return toAdd;
  }

  async update(id: string, toUpdate: T) {
    try {
      await setDoc(doc(db, this.collectionRef, id), { ...toUpdate });
      console.log(`Document with id: ${id} successfully edited!`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default APIClient;
