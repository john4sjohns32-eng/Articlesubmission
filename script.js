const gameData = [
    {
        q: "Which Japanese city is famous for its 10,000 Torii gates?",
        a: ["Tokyo", "Kyoto", "Osaka", "Nara"],
        correct: 1
    }
];

const qEl = document.getElementById("question");
const optEl = document.getElementById("options");

function loadGame() {
    let current = gameData[0];
    qEl.innerText = current.q;
    
    current.a.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.onclick = () => {
            if(index === current.correct) {
                btn.style.background = "#2ecc71";
                btn.innerText = "Correct! 🎉 Continue Reading...";
            } else {
                btn.style.background = "#ff7675";
                btn.innerText = "Try Again!";
            }
        };
        optEl.appendChild(btn);
    });
}

loadGame();
