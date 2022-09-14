import { ClickedLogInEvent } from "../../app.events";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
export async function login(c, ev) {
    const auth = getAuth();
    // Save authentication data in local storage for automatic login on refresh
    // This also loads existing sessions on load
    await setPersistence(auth, browserLocalPersistence);
    if (auth.currentUser)
        return; // User is already logged in
    if (!(ev instanceof ClickedLogInEvent))
        throw new Error('Must be ClickedLogInEvent (Error can occur on initial load of app)');
    // Sign in, will error when something goes wrong, error caught in machine
    await signInWithEmailAndPassword(auth, ev.email, ev.password);
}
export async function logout() {
    const auth = getAuth();
    // Sign out, will error when something goes wrong, error caught in machine
    await signOut(auth);
}
