navigator.serviceWorker && navigator.serviceWorker.register('./../sw.js').then(function (registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js'
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyD3_6VMJGn-6cefFy36OcDVbx4DwpSzkz4",
        authDomain: "snap-messages.firebaseapp.com",
        databaseURL: "https://snap-messages-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "snap-messages",
        storageBucket: "snap-messages.appspot.com",
        messagingSenderId: "660410053513",
        appId: "1:660410053513:web:ba84653470c011472ba758",
        measurementId: "G-0WL7T5N436"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const database = getDatabase(app);



const userId = 0

const frame = document.querySelector(".frame");

let userData = ref(database, 'users/' + userId)

onValue(userData, (snapshot) => {
  document.querySelector("#status").innerHTML = 'Loading...';
  
  frame.innerHTML = '';
  
  const data = snapshot.val()
  const chatIds = Object.values(data.chats)
  
  console.log(chatIds)
  
  let chats = [];
  
  for (let i = 0; i < chatIds.length; i++) {
    console.log("Processing chat id number:", chatIds[i])
    get(ref(database, `chats/${chatIds[i]}/members`)).then((snapshot) => {
      console.log("Chat id number:", chatIds[i], "has been fetched")
      if (snapshot.exists()) {
        let chatMemberList = Object.values(snapshot.val());
        
        console.log(chatMemberList)
        
        const index = chatMemberList.indexOf(userId);
        if (index > -1) { // only splice array when item is found
          chatMemberList.splice(index, 1); // 2nd parameter means remove one item only
        }
        
        console.log("Members of chat id number:", chatIds[i], "which aren't the user:", chatMemberList)
        
        
        chats.push([])
        
        console.log(chats)
        
        for (let b = 0; b < chatMemberList.length; b++) {
          get(ref(database, `users/${chatMemberList[b]}`)).then((snapshot) => {
            const value = snapshot.val()
            
            console.log(value)
            
            let currentChat = {username: value.username, id: chatMemberList[b]}
            
            console.log(currentChat)
            
            renderChat(currentChat)
          });
          console.log("Chat member fetched")
        }
        
        console.log("Fetching finished")
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
  console.log("Still working on it")
  
  for (let i = 0; i < chats.length; i++) {
    const currentChat = chats[i]
    
   
  }

  document.querySelector("#status").innerHTML = '';
});

function renderChat(chatToRender) {
  console.log("The current chat being rendered is", chatToRender)
    
  frame.innerHTML += `
    <div class="chat-list-item">This is chat with @${chatToRender.username}</div>
    `
}

/* window.onload = function () {
  document.querySelector("#status").innerHTML = 'Loading...';

  var newDiv = "";
  
  const frame = document.querySelector(".frame");
  for (let i = 0; i < 12; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add("div");
    frame.appendChild(newDiv);
  }

  document.querySelector("#status").innerHTML = '';
}
*/