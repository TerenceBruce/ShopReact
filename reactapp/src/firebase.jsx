import { initializeApp}  from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// update to env.local
const app  = initializeApp({
  apiKey: "AIzaSyD-R1DjXGmk2Khn08syxOvrk5NgkYM4ooc",
  authDomain: "reactapp-d41d0.firebaseapp.com",
  projectId: "reactapp-d41d0",
  storageBucket: "reactapp-d41d0.appspot.com",
  messagingSenderId: "1070373665336",
  appId: "1:1070373665336:web:64f02b99679459a58744cd",
  measurementId: "G-KDLS6KFSBW"
})

export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app


