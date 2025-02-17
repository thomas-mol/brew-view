import { v4 } from "uuid";
import Review from "../interfaces/review";
import APIClient from "./apiClient";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

class ReviewAPIClient extends APIClient<Review> {
  constructor() {
    super("reviews");
  }

  async postWithImage(toAdd: Review, imageFile: File): Promise<Review> {
    try {
      const imageRef = ref(storage, `images/${v4()}`);
      await uploadBytes(imageRef, imageFile);
      console.log("Image uploaded:" + imageRef);

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
}

export default ReviewAPIClient;
