import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
export async function loadData() {
    const col = collection(getFirestore(), getAuth().currentUser.email);
    const snapshot = await getDocs(col);
    const res = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        res.push({
            id: doc.id,
            amount: data.amount,
            year: data.year,
            month: data.month,
            description: data.description,
            categories: data.categories,
        });
    });
    return res;
}
