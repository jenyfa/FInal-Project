
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    enableIndexedDbPersistence
 } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqMCOLNdMVuaCst-anFfchqVl8slZATZE",
  authDomain: "homework-6114c.firebaseapp.com",
  projectId: "homework-6114c",
  storageBucket: "homework-6114c.appspot.com",
  messagingSenderId: "330804766182",
  appId: "1:330804766182:web:9cb37ab72f5728a6086227",
  measurementId: "G-S7X6E26TVN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTutors (db){
    const TutorsCol = collection (db, "Tutors");
    const TutorsSnapshot = await getDocs (TutorsCol);
    const Tutorslist = TutorsSnapshot.docs.map ((doc) => doc);
    return Tutorslist;
}

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      //Multiple tabs open, persistence can only be enabled in one tab at a time
      console.log("Persistence failed")

    }else if (err.code == 'unimplemented') {
      //The current browser does not support all of the features required to enable persistence
      console.log("Persistence is not valid")
    }
  });

const unsub = onSnapshot(collection(db, "Tutors"), (doc) => {
    //   console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
      // console.log(change, change.doc.data(), change.doc.id);
      if (change.type === "added") {
        //Call render function in UI
        renderTutors(change.doc.data(), change.doc.id);
      }
      if (change.type === "removed") {
        //do something
        removeTutors(change.doc.id);
      }
    });
  });
  
//add new study session
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(collection(db, "Tutors"), {
    title: form.title.value,
    description: form.description.value,
  }).catch((error) => console.log(error));
  form.title.value = "";
  form.description.value = "";
});