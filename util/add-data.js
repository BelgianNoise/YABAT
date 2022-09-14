import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { ClickedAddEntryEvent } from "../app.events";
export async function addData(c, e) {
    if (!(e instanceof ClickedAddEntryEvent))
        throw new Error('');
    console.log('Saving: ', e.entry);
    const col = collection(getFirestore(), getAuth().currentUser.email);
    delete e.entry.id; // Remove filler id to not save in document
    const added = await addDoc(col, e.entry);
    return Object.assign(Object.assign({}, e.entry), { id: added.id });
}
