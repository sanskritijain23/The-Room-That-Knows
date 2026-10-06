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
const roomResponses = {
    lonely: "The Room feels a little quieter around you.",
    tired: "Perhaps you were not looking for a room. Perhaps you were looking for rest.",
    confused: "Not every room is meant to give you answers.",
    lost: "Perhaps being lost is why you found this room."
};
const exploreObjects = document.getElementById("explore-object");
const leaveObject = document.getElementById("leave-object");

submitNeed.addEventListener("click", function () {

    console.log("BUTTON CLICKED");

    const userNeed = needInput.value.trim();

    if (userNeed === "") {
        needInput.focus();
        return;
    }

    questionBox.classList.add("hidden");
    responseBox.classList.remove("hidden");

    const message = userNeed.toLowerCase();
    if (message.includes("lonely")){
        roomResponse.textContent = roomResponses.lonely;

    }
    else if (message.includes("tired")){
        roomResponse.textContent = roomResponses.tired;
    }
    else if (message.includes("confused")){
        roomResponse.textContent = roomResponses.confused;
    }
    else if (message.includes("lost")){
        roomResponse.textContent = roomResponses.lost;
    }
    else{
        roomResponse.textContent = "The Room heard you. Perhaps you should look around.";
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

exploreObjects.addEventListener("click", function (){
    const photographClue = document.getElementById("photograph-clue");
    if (exploreObjects.dataset.action !== "keep"){
        photographClue.textContent = "On the back, someone has written: \"Some rooms remember what people forget.\"";
        exploreObjects.textContent = "Keep the photograph";
        exploreObjects.dataset.action = "keep";
    }
    else{
        roomResponse.textContent = "You take the photograph. the Room does not seem to mind";
        firstObject.classList.add("opacity-60");
        exploreObjects.disabled = true;
        leaveObject.disabled = true;
    }
});

leaveObject.addEventListener("click", function (){
    roomResponse.textContent = "You leave the photograph where you found it.";
    firstObject.classList.add("opacity-60");
    exploreObjects.disabled = true;
    leaveObject.disabled = true;
} );