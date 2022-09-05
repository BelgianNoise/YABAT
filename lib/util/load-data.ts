import { collection, getFirestore, getDocs } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { Entry } from "./models/entry";

export async function loadData(): Promise<Entry[]> {
  const col = collection(getFirestore(), getAuth().currentUser.email);
  const snapshot = await getDocs(col);
  const res: Entry[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    res.push({
      amount: data.amount,
      year: data.year,
      month: data.month,
      description: data.description,
      categories: data.categories,
    })
  });

  return res;
}