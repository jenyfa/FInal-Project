import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
const auth = getAuth(app)

//listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in: ", user.email);
        getTutors(db).then((snapshot) => {
            setupTutors(snapshot);
        });
        setupUI(user);
        const form = document.querySelector("form");
        form.addEventListener("submit", (event) => {
          event.preventDefault();
        
          addDoc(collection(db, "Tutors"), {
            title: form.title.value,
            description: form.description.value,
          }).catch((error) => console.log(error));
          form.title.value = "";
          form.description.value = "";
        })
    }else {
        console.log("User logged out");
        setupUI();
        setupTutors([]);
    }
})

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //getuserinfo
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
    //signed in
    const user = userCredentials.user;
        console.log(user);
        const modal = document.querySelector("modal-signup");
        Map.modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch ((error) =>{
        const errorCode = error.code;
        const errorMessage = error.message;
        
    }) 
});


//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e,preventDefault();
    signOut(auth)
        .then(() => {
            console.log("User has signed out");
        })
        .catch((error) => {
            //An error happened
            const errorCode = error.code;
            const errorMessage = error.message;
        //
        });
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("Log In", (e)=> {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    signInWithEmailandPassword(auth, email, password).then ((userCredential) => {
         //signed in
         const user = userCredentials.user;
         console.log(user);
         const modal = document.querySelector("modal-signup");
         M.modal.getInstance(modal).close();
         signupForm.reset()
     }).catch ((error) =>{
         const errorCode = error.code;
         const errorMessage = error.message;
         //
     });
    })

