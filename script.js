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
const roomObjects = [
    {
        id: "photograph",
        need: "lonely",
        name: "Photograph",
        description: "Three people. Standing somewhere you almost remember.",
        clue: "There is something written on the back."

    },
    {
        id: "letter",
        need: "confused",
        name: "Letter",
        description: "A folded letter, yellowed at the edges",
        clue: "It has your name on it."
    },
    {
        id: "key",
        need: "lost",
        name: "Small Key",
        description: "A small brass key lying beneath the dust.",
        clue: "you have no idea what it opens."
    }
];
let roomMemory = {
    visited: false,
    need: "",
    objectId: "",
    objectState: "unknown"
};
const exploreObjects = document.getElementById("explore-object");
const objectCard = document.getElementById("object-card");
const leaveObject = document.getElementById("leave-object");
const objectName = document.getElementById("object-name");
const objectDescription = document.getElementById("object-description");
const objectType = document.getElementById("object-type");
const objectClue = document.getElementById("object-clue");

submitNeed.addEventListener("click", function () {

    const userNeed = needInput.value.trim();

    if (userNeed === "") {
        needInput.focus();
        return;
    }

    roomMemory.visited = true;
    roomMemory.need = userNeed;
    saveMemory();

    questionBox.classList.add("hidden");
    responseBox.classList.remove("hidden");

    const message = userNeed.toLowerCase();
    const foundObject = roomObjects.find(object =>
        message.includes(object.need)
    );
    console.log(foundObject);
    if (foundObject) {
        roomMemory.objectId = foundObject.id;
        roomMemory.objectState = "unknown";
        objectType.textContent = foundObject.name.toUpperCase();
        objectName.textContent = foundObject.name;
        objectDescription.textContent = foundObject.description;
        objectClue.textContent = foundObject.clue;
        saveMemory();
    }
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
        if (roomMemory.visited) {
            questionBox.classList.add("hidden");
            responseBox.classList.remove("hidden");
            roomResponse.textContent = `You have been here before. The Room remembers what brought you here: "${roomMemory.need}" ${getMemoryMessage()}`;
            if (roomMemory.objectId) {
                const previousObject = roomObjects.find(
                    object => object.id === roomMemory.objectId
                );
                if (previousObject) {
                    objectType.textContent = previousObject.name.toUpperCase();
                    objectName.textContent = previousObject.name;
                    objectDescription.textContent = previousObject.description;
                    objectClue.textContent = previousObject.clue;
                    firstObject.classList.remove("hidden");
                }
            }
            
        }
        const now = new Date();
        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
        roomTime.textContent = time;
    },900);
    
});

exploreObjects.addEventListener("click", function () {

    const foundObject = roomObjects.find(
        object => object.id === roomMemory.objectId
    );

    if (!foundObject) {
        return;
    }

    if (exploreObjects.dataset.action !== "keep") {

        objectClue.textContent =
            "On the back, someone has written: \"Some rooms remember what people forget.\"";

        exploreObjects.textContent = "Keep the object";
        exploreObjects.dataset.action = "keep";

    } else {

        roomResponse.textContent =
            `You take the ${foundObject.name.toLowerCase()}. The Room does not seem to mind.`;

        roomMemory.objectState = "kept";

        saveMemory();

        firstObject.classList.add("opacity-60");

        exploreObjects.disabled = true;
        leaveObject.disabled = true;
    }
});

leaveObject.addEventListener("click", function () {

    const foundObject = roomObjects.find(
        object => object.id === roomMemory.objectId
    );

    if (!foundObject) {
        return;
    }

    roomResponse.textContent =
        `You leave the ${foundObject.name.toLowerCase()} where you found it.`;

    roomMemory.objectState = "left";

    saveMemory();

    firstObject.classList.add("opacity-60");

    exploreObjects.disabled = true;
    leaveObject.disabled = true;
});

function saveMemory(){
    localStorage.setItem(
        "roomMemory",
        JSON.stringify(roomMemory)
    );
}

function getMemoryMessage() {

    const foundObject = roomObjects.find(
        object => object.id === roomMemory.objectId
    );

    if (!foundObject) {
        return "The Room remembers you were here.";
    }

    if (roomMemory.objectState === "kept") {
        return `You kept the ${foundObject.name.toLowerCase()}.`;
    }

    if (roomMemory.objectState === "left") {
        return `You left the ${foundObject.name.toLowerCase()} behind.`;
    }

    return `The ${foundObject.name.toLowerCase()} was never decided.`;
}

function loadMemory() {
    const savedMemory = localStorage.getItem("roomMemory");
    if(savedMemory) {
        roomMemory = JSON.parse(savedMemory);
    }
}
loadMemory();