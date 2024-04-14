import{initializeApp} from 'firebase/app'
import{
  collection, getFirestore,addDoc,getDocs,deleteDoc,doc,updateDoc
} from 'firebase/firestore'
import{
  getAuth,createUserWithEmailAndPassword
} from 'firebase/auth'
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
const auth = getAuth()
// collection reference
const colRef = collection(db,'notes')
//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let notes = []
    snapshot.docs.forEach((doc) =>{
      notes.push({ ...doc.data(), id: doc.id})
    })
    console.log(notes)
  })
  .catch(err => {
    console.log(err.message)
  })



//LOGIN
var email = document.querySelector(".mail")
var pass = document.querySelector(".pass")
var signup = document.querySelector(".signup")

signup.addEventListener("click",() =>{
  const mail = email.value
  const password = pass.value

  createUserWithEmailAndPassword(auth,mail,password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signup.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

var addNoteButton = document.querySelector(".addbtn");
var notesContainer = document.querySelector(".notesContainer");
var card = document.querySelector(".card");
var container = document.querySelector(".container");
var empty = document.querySelector(".empty");
var edit = document.getElementsByClassName("edit");
var addNew = document.querySelector(".new-addbtn");
var cardclone = document.querySelector(".card-body");
var cardTitle = document.querySelector(".card-title");
var cardNote = document.querySelector(".card-note");


// function eventAdd(){
//      // edit
//     for (var i = 0; i < edit.length; i ++) {
//         edit[i].addEventListener("click", function() {
//             var cn = cardNote[i];   
//             var ct = cardTitle[i];                                           
//             EditNote(this,cn,ct);
//             // alert("event added");
//         },false);
//     }
// }

// Attach click event listeners to the "Edit" buttons (using event delegation)
// Attach click event listeners to the "Edit" buttons

var cardsContainer = document.querySelector('.card'); // Replace with the actual container of your cards

cardsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit')) {
    document.querySelector(".notesContainer").style.zIndex = "3";
    // Find the closest card element relative to the clicked "Edit" button
    var card2 = event.target.closest('.card-body');

    if (card2) {
      // Extract text from the card title and card note of the specific card
      var cardTitle = card2.querySelector('.card-title');
      var cardNote = card2.querySelector('.card-note');
      var titleText = cardTitle.innerHTML;
      var noteText = cardNote.innerHTML;

      var note = document.createElement("div");
      note.className = "note";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
      note.style.display = "block";
    // Append the note to the notes container
      notesContainer.appendChild(note);

    // Create input and textarea
      var title = document.createElement("input");
      title.setAttribute("type", "text");
      title.className = "title";
      title.placeholder = "title";
      var textarea = document.createElement("textarea");
      textarea.className = "textarea";
      textarea.placeholder = "Enter your note here...";

      note.appendChild(title);
      note.appendChild(textarea);

      // Set the input and textarea values with the extracted text
    //   var titleInput = document.querySelector('.title');
    //   var textarea = document.querySelector('.textarea');
      title.value = titleText;
      textarea.value = noteText;
    }
  }


   // Create a delete button for removing the note
   var deleteButton = document.createElement("button");
   deleteButton.className = "delete";
   deleteButton.innerText = "Delete";
   note.appendChild(deleteButton);
   deleteButton.addEventListener("click", (e) => {
       e.preventDefault()
       
       //DELETE FROM SERVER
       getDocs(colRef)
        .then((snapshot) => {
          let notes = snapshot.docs
          // snapshot.docs.forEach((doc) =>{
          // notes.push({ ...doc.data(), id: doc.id})
          // })
          // console.log(notes)
          const docRef = doc(db,'books',notes.id.value)
   
          deleteDoc(docRef)
            .then(() => {
              deleteButton.reset()
            })
        })

       
       notesContainer.removeChild(note);
       card.removeChild(card2);
       // cardTitle.innerHTML = "Title";
       // cardNote.innerHTML = "Note";
       document.querySelector(".notesContainer").style.zIndex = "-2";
       // document.querySelector("notesContainer").style.zIndex = "-1";o
   });


   // Create a save button for saving the note
   var saveButton = document.createElement("button");
   saveButton.className = "save";
   saveButton.innerText = "Save";
   note.appendChild(saveButton);
   saveButton.addEventListener("click", () => {
       
     //SAVE TO SERVER
     addDoc(colRef, {
       title:title.value,
       note: textarea.value
      })
      .then(()=>{
        // title.reset()
        // textarea.reset()
        console.log(title.value)
        console.log(textarea.value)
      })


      //    card.appendChild(editCardBody);
       cardTitle.innerHTML = title.value;
       cardNote.innerHTML = textarea.value;
       document.querySelector(".notesContainer").style.zIndex = "-1";
       notesContainer.removeChild(note);
   });
});

// function EditNote(chosenEdit,cn,ct){
//     document.querySelector(".notesContainer").style.zIndex = "3";
//     // var note = chosenEdit.closest(".note");   
    
//     // var editTitle = chosenEdit.closest(".card-title");
//     // var editNote = chosenEdit.closest(".card-note"); 
//     var note = document.createElement("div");
//     note.className = "note";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
//     note.style.display = "block";
//     // Append the note to the notes container
//     notesContainer.appendChild(note);

//     // Create input and textarea
//     var title = document.createElement("input");
//     title.setAttribute("type", "text");
//     title.className = "title";
//     title.placeholder = "title";
//     var textarea = document.createElement("textarea");
//     textarea.className = "textarea";
//     textarea.placeholder = "Enter your note here...";

   
//     alert(ct.textContent);
//     title.value = ct.textContent;
//     textarea.value = cn.textContent;
//     note.appendChild(title);
//     note.appendChild(textarea);
    
    
//     // title.value = cardTitle.innerText;                     
//     // textarea.innerText = cardNote.innerText;

//     // Create a delete button for removing the note
//     var deleteButton = document.createElement("button");
//     deleteButton.className = "delete";
//     deleteButton.innerText = "Delete";
//     note.appendChild(deleteButton);
//     deleteButton.addEventListener("click", () => {
//         notesContainer.removeChild(note);
//         // cardTitle.innerHTML = "Title";
//         // cardNote.innerHTML = "Note";
//         document.querySelector(".notesContainer").style.zIndex = "-2";
//         // document.querySelector("notesContainer").style.zIndex = "-1";o
//     });
//     // Create a save button for saving the note
//     var saveButton = document.createElement("button");
//     saveButton.className = "save";
//     saveButton.innerText = "Save";
//     note.appendChild(saveButton);
//     saveButton.addEventListener("click", () => {
//         var cardTitle = document.querySelector(".card-title");
//         var cardNote = document.querySelector(".card-note");
//         var editCardBody = chosenEdit.closest(".card-body");
//         card.appendChild(editCardBody);
//         cardTitle.innerHTML = title.value;
//         cardNote.innerHTML = textarea.value;
//         document.querySelector(".notesContainer").style.zIndex = "-1";
//         notesContainer.removeChild(note);
//     });

   
    
// }

function addNote(){
      //bring note container forward 
      document.querySelector(".notesContainer").style.zIndex = "3";
      var note = document.createElement("div");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      note.className = "note";
      card.style.display = "none";
  
      // Create an input and textarea for the note content
      var title = document.createElement("input");
      title.setAttribute("type", "text");
      title.className = "title";
      title.placeholder = "title";
      var textarea = document.createElement("textarea");
      textarea.className = "textarea";
      textarea.placeholder = "Enter your note here...";
      note.appendChild(title);
      note.appendChild(textarea);
  
      // Create a delete button for removing the note
      var deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", () => {
          document.querySelector(".notesContainer").style.zIndex = "-1";
          notesContainer.removeChild(note);
          card.style.display = "flex";
          // document.querySelector("notesContainer").style.zIndex = "-1";
      });
      note.appendChild(deleteButton);
      // Create a save button for saving the note
      var saveButton = document.createElement("button");
      saveButton.className = "save";
      saveButton.innerText = "Save";
      note.appendChild(saveButton);
      saveButton.addEventListener("click", () => {
        var cardTitle = document.querySelector(".card-title");
        var cardNote = document.querySelector(".card-note");
        // var cardBody = document.createElement("div");
        var clone = cardclone.cloneNode(true);
        // cardBody.className = "card-body";
        card.appendChild(clone);
          // cardTitle.append(titleContent);
          cardTitle.innerHTML = title.value;
          cardNote.innerHTML = textarea.value;
          document.querySelector(".notesContainer").style.zIndex = "-1";
          card.style.display = "flex";
          notesContainer.removeChild(note);
          // eventAdd();
      });
      
  
      // Append the note to the notes container
      notesContainer.appendChild(note);
}
   // create note
addNoteButton.addEventListener("click", () => {
    //bring notecontainer forward 
    empty.style.display = "none";
    document.querySelector(".notesContainer").style.zIndex = "1";
    var note = document.createElement("div");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    note.className = "note";

    // Create an input and textarea for the note content
    var title = document.createElement("input");
    title.setAttribute("type", "text")
    title.className = "title";
    title.placeholder = "title";
    var textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.placeholder = "Enter your note here...";
    note.appendChild(title);
    note.appendChild(textarea);

    // Create a delete button for removing the note
    var deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = "Delete";
    note.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        document.querySelector(".notesContainer").style.zIndex = "-1";
        notesContainer.removeChild(note);
        empty.style.display = "block";
        // document.querySelector("notesContainer").style.zIndex = "-1";
    });
    
    // Create a save button for saving the note
    var saveButton = document.createElement("button");
    saveButton.className = "save";
    saveButton.innerText = "Save";
    note.appendChild(saveButton);
    saveButton.addEventListener("click", () => {
        // cardTitle.append(titleContent);
       
        var cardTitle = document.querySelector(".card-title");
        var cardNote = document.querySelector(".card-note");
        card.style.display = "flex";
        addNew.style.display = "flex";
        cardTitle.innerHTML = title.value;
        cardNote.innerHTML = textarea.value;
        document.querySelector(".notesContainer").style.zIndex = "-1";
        // notesContainer.removeChild(note);
        note.style.display = "none";
        // var newAdd = document.createElement("button");
        // newAdd.className = "new-addbtn";
        container.appendChild(addNew);
        // eventAdd();                      something might have to be here
    });
    

    // Append the note to the notes container
    notesContainer.appendChild(note);
});

   
    
   


    // addnew
    addNew.addEventListener("click", ()=> {
        addNote();
    });

    
    // var navWidthE = document.querySelector("sidenav");
    // var style = getComputedStyle(navWidthE, ":hover");
    // var navWidth = style.width;
    // var mainMargin = document.querySelector("main").style.marginLeft = navWidth;
    // alert(navWidth);
    // console.log(style);
