import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "../config/firebase";

export type Filters<T> = Partial<{
  [K in keyof T]: T[K];
}>;

class APIClient<T extends { id?: string } & DocumentData> {
  collectionRef: string;

  constructor(collection: string, private defaultFilters: Filters<T> = {}) {
    this.collectionRef = collection;
  }

  async getAll(options?: Filters<T>, ids?: string[]): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionRef));
    const data: T[] = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }))
      .filter((item) => {
        if (ids) {
          return ids.includes(item.id);
        }
        return true;
      })
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

  async getById(id: string): Promise<T> {
    const documentSnapshot = await getDoc(doc(db, this.collectionRef, id));
    if (documentSnapshot.exists()) {
      const data: T = documentSnapshot.data() as T;
      return data;
    } else {
      throw new Error(`Document with id: ${id} not found.`);
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

  async postWithImage(toAdd: T, imageFile: File): Promise<T> {
    try {
      const imageRef = ref(storage, `images/${v4()}`);
      await uploadBytes(imageRef, imageFile);
      console.log("Image uploaded!" + imageRef);

      const downloadUrl = await getDownloadURL(imageRef);

      const documentWithUrl = {
        photo_url: downloadUrl,
        ...toAdd,
      };
      const docRef = await addDoc(
        collection(db, this.collectionRef),
        documentWithUrl
      );

      console.log("Document added with id:", docRef.id);
      return { ...documentWithUrl, id: docRef.id };
    } catch (error) {
      console.log("Error uploading image or document:", error);
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
}

export default APIClient;
