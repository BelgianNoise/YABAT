import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { ClickedDeleteEntryEvent } from "../app.events";
export async function deleteData(c, e) {
    if (!(e instanceof ClickedDeleteEntryEvent))
        throw new Error('');
    console.log('Deleteing ID: ', e.id);
    const docu = doc(getFirestore(), getAuth().currentUser.email, e.id);
    await deleteDoc(docu);
    return e.id;
}
