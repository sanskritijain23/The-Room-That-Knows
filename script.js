const enterButton = document.getElementById("enter-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const roomScreen = document.getElementById("room-screen");
const roomTime = document.getElementById("room-time");
const submitNeed = document.getElementById("submit-need");
const needInput = document.getElementById("need-input");
const questionBox = document.getElementById("question-box");
const responseBox = document.getElementById("response-box");
const roomResponse = document.getElementById("room-response");
const firstObject = document.getElementById("first-object");

submitNeed.addEventListener("click", function () {

    console.log("BUTTON CLICKED");

    const userNeed = needInput.value.trim();

    if (userNeed === "") {
        needInput.focus();
        return;
    }

    questionBox.classList.add("hidden");
    responseBox.classList.remove("hidden");

    if(userNeed.toLowerCase().includes("lonely")){
        roomResponse.textContent = "The Room feels a little quieter around you.";
    }
    else if(userNeed.toLowerCase().includes("tired")){
        roomResponse.textContent = "Perhaps you were not looking for a room. Perhaps you were looking for rest."
    }
    else{
        roomResponse.textContent = ""
    }

    firstObject.classList.remove("hidden");
});

enterButton.addEventListener("click",function(){

    welcomeScreen.classList.add("leaving");
    setTimeout(function(){
        welcomeScreen.style.display = "none";
        roomScreen.classList.remove("hidden");
        const now = new Date();
        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
        roomTime.textContent = time;
    },900);
    
});