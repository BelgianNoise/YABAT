import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { AppContext } from "../app.context";
import { AppEvent, ClickedAddEntryEvent } from "../app.events";
import { Entry } from "./models/entry";

export async function addData(c: AppContext, e: AppEvent): Promise<Entry> {
  if (!(e instanceof ClickedAddEntryEvent)) throw new Error('');
  console.log('Saving: ', e.entry);
  const col = collection(getFirestore(), getAuth().currentUser.email);
  await addDoc(col, e.entry);
  return e.entry;
}