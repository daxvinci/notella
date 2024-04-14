 // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

import{initializeApp} from 'firebase/app'
import{collection, getFirestore,getDocs,addDoc} from 'firebase/firestore'
 const firebaseConfig = {
  apiKey: "AIzaSyCZ_nCJg4pf6-vK6_My4d2VqiQiofw3dRg",
  authDomain: "notella-69420.firebaseapp.com",
  databaseURL: "https://notella-69420-default-rtdb.firebaseio.com",
  projectId: "notella-69420",
  storageBucket: "notella-69420.appspot.com",
  messagingSenderId: "692975560939",
  appId: "1:692975560939:web:4627b5cd79538789b636ae"
};
// init firebase app
initializeApp(firebaseConfig)
//init services
const db = getFirestore()
// collection reference
const colRef = collection(db,'notes')
//get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let notes = []
//     snapshot.docs.forEach((doc) =>{
//       notes.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(notes)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })
//real time get collection data 
onSnapshot(colRef, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

  // saving document
const addnote = document.querySelector(".saves")

addnote.addEventListener("click",(e)=>{
  e.preventDefault()

  addDoc(colRef, {
    title:title.value,
    note: textarea.value
  })
  .then(()=>{
    title.reset()
    textarea.reset()
  })
})
//delete document
const deleteNote = document.querySelector(".deletes")

deleteNote.addEventListener("click",(e)=>{
  e.preventDefault()

  const docRef = doc(db,'books',deleteNote.id.value)

  deleteDoc(docRef)
})

 // Your web app's Firebase configuration
//  var firebaseConfig = {
//    apiKey: "AIzaSyCZ_nCJg4pf6-vK6_My4d2VqiQiofw3dRg",
//    authDomain: "notella-69420.firebaseapp.com",
//    projectId: "notella-69420",
//    storageBucket: "notella-69420.appspot.com",
//    messagingSenderId: "692975560939",
//    appId: "1:692975560939:web:4627b5cd79538789b636ae"
//  };

//  // Initialize Firebase
//  firebase.initializeApp(firebaseConfig);

// var database = firebase.database();
// function save(){
//     var cardTitle = document.querySelector(".card-title").value;
//     var cardNote = document.querySelector(".card-note").value;

//     database.ref('Notes/' + cardTitle).set({
//         cardTitle : cardTitle,
//         cardNote : cardNote
//     })

//     alert("saved");
// }

console.log('hello from firebase bundle')