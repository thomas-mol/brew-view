import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type Filters<T> = Partial<{
  [K in keyof T]: T[K];
}>;

class APIClient<T extends { id?: string } & DocumentData> {
  collectionRef: string;

  constructor(collection: string, private defaultFilters: Filters<T> = {}) {
    this.collectionRef = collection;
  }

  private applyFilters(data: T[], filters: Filters<T>): T[] {
    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null || value === "") return true;
        return item[key as keyof T] === value;
      })
    );
  }

  async getAll(options?: Filters<T>, ids?: string[]): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionRef));

      let data: T[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }));

      if (ids) {
        data = data.filter((item) => item.id && ids.includes(item.id));
      }

      const filters = { ...this.defaultFilters, ...options };
      return this.applyFilters(data, filters);
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<T> {
    try {
      const documentSnapshot = await getDoc(doc(db, this.collectionRef, id));

      if (documentSnapshot.exists()) {
        return { id: documentSnapshot.id, ...(documentSnapshot.data() as T) };
      } else {
        throw new Error(`Document with id: ${id} not found.`);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  async post(toAdd: T, id?: string): Promise<T> {
    try {
      if (id?.trim()) {
        await setDoc(doc(db, this.collectionRef, id), toAdd, { merge: true });
        console.log("Document added with id:", id);
        return { ...toAdd, id: id };
      } else {
        const docRef = await addDoc(collection(db, this.collectionRef), toAdd);
        console.log("Document added with id:", docRef.id);
        return { ...toAdd, id: docRef.id };
      }
    } catch (error) {
      console.error("Error adding document", error);
      throw error;
    }
  }

  async update(toUpdate: T) {
    try {
      if (!toUpdate.id) throw new Error("Document ID is required for update.");
      await updateDoc(doc(db, this.collectionRef, toUpdate.id), {
        ...toUpdate,
      });
      console.log(`Document with id: ${toUpdate.id} successfully edited!`);
      return await this.getById(toUpdate.id);
    } catch (error) {
      console.log("Error updating document:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionRef, id));
    } catch (error) {
      console.log(error);
    }
  }
}

export default APIClient;
