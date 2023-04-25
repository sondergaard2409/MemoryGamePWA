// Grab things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate object
const getData = () => [
    { imgSrc: "/Assets/Images/Sinatra.jpg", name: "Frank Sinatra" },
    { imgSrc: "/Assets/Images/DeanMartin.jpg", name: "Dean Martin" },
    { imgSrc: "/Assets/Images/MBuble.jpg", name: "Micheal Buble" },
    { imgSrc: "/Assets/Images/Angerfist.jpg", name: "Angerfist" },
    { imgSrc: "/Assets/Images/IceCube.jpg", name: "Ice Cube" },
    { imgSrc: "/Assets/Images/KimLarsen.jpg", name: "Kim Larsen" },
    { imgSrc: "/Assets/Images/Eminem.jpg", name: "Eminem" },
    { imgSrc: "/Assets/Images/Logic.jpg", name: "Logic" },
    { imgSrc: "/Assets/Images/Sinatra.jpg", name: "Frank Sinatra" },
    { imgSrc: "/Assets/Images/DeanMartin.jpg", name: "Dean Martin" },
    { imgSrc: "/Assets/Images/MBuble.jpg", name: "Micheal Buble" },
    { imgSrc: "/Assets/Images/Angerfist.jpg", name: "Angerfist" },
    { imgSrc: "/Assets/Images/IceCube.jpg", name: "Ice Cube" },
    { imgSrc: "/Assets/Images/KimLarsen.jpg", name: "Kim Larsen" },
    { imgSrc: "/Assets/Images/Eminem.jpg", name: "Eminem" },
    { imgSrc: "/Assets/Images/Logic.jpg", name: "Logic" },
];

//Randomize cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    
    //Generate HTML
    cardData.forEach((item) => {
     const card = document.createElement("div");
     const face = document.createElement("img");
     const back = document.createElement("div");
     card.classList = "card";
     face.classList = "face";
     back.classList = "back";
    
     //Attach info to cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    //Attach cards to section
     section.appendChild(card);
     card.appendChild(face);
     card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        checkCards(e);
    });
  });
};

//Check cards match
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    
    //Flip logic
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")){
            console.log("match");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else{
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 2000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart("Get good.");
            }
        }
    }
    //Check won game
    if(toggleCard.length === 16){
        restart("Nice job.");
    }
};

//Restart for 0 lives
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize after restart
        setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};


cardGenerator();

