let score = 0;
let currentQuestion = 0;

const questions = [
  {
    image: "https://static.wikia.nocookie.net/cartoons/images/4/41/Profile_-_Patrick_Star.png/revision/latest?cb=20230111062602",
    options: ["Patrick", "Sandy", "Mr.Krabs", "Squidward"],
    answer: "Patrick"
  },
  {
    image: "https://i.scdn.co/image/ab6761610000517409292e4840dbd0d634a2f480",
    options: ["Patrick", "Sandy", "Mr.Krabs", "Squidward"],
    answer: "Squidward"
  },
  {
    image: "https://static.wikia.nocookie.net/spongebob/images/6/69/Sandy_Season_5.png/revision/latest/scale-to-width-down/397?cb=20210430141927&path-prefix=id",
    options: ["Patrick", "Sandy", "Mr.Krabs", "Squidward"],
    answer: "Sandy"
  },
  {
    image: "https://www.diamondartclub.com/cdn/shop/files/mr-krabs-diamond-art-painting-45675149557953.jpg?v=1762461267&width=3000",
    options: ["Patrick", "Sandy", "Mr.Krabs", "Squidward"],
    answer: "Mr.Krabs"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCgfmrCvXkIjqXzym-p8Yd8VxF7PPosHZVkw&s",
    options: ["FlyingDutchman", "Plankton", "Larry", "Garry"],
    answer: "Garry"
  },
  {
    image: "https://static.wikia.nocookie.net/spongebob/images/f/f6/200px-Larry_the_Lobster.svg.png/revision/latest?cb=20201121143957&path-prefix=id",
    options: ["FlyingDutchman", "Plankton", "Larry", "Garry"],
    answer: "Larry"
  },
  {
    image: "https://i.pinimg.com/originals/f7/ed/fc/f7edfc8e430e7f743e8abbaba4012e42.png",
    options: ["FlyingDutchman", "Plankton", "Larry", "Garry"],
    answer: "Plankton"
  },
  {
    image: "https://preview.redd.it/what-happened-to-the-flying-dutchman-and-why-havent-we-seen-v0-e5ku3rf25u5e1.jpeg?auto=webp&s=8a31ebdb5be76505cfc3e6fe0962f1dd01171bf5",
    options: ["FlyingDutchman", "Plankton", "Larry", "Garry"],
    answer: "FlyingDutchman"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo62tEh8W2LyKEGU9N96oNUmgRICeISDduyQ&s",
    options: ["FlyingDutchman", "Plankton", "Mrs.Puff", "Garry"],
    answer: "Mrs.Puff"
  },
  {
    image: "https://i.pinimg.com/736x/1c/c8/70/1cc870c033beda791d949f553e5097ca.jpg",
    options: ["Karen", "Plankton", "Larry", "Garry"],
    answer: "Karen"
  }
];

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setName() {
  const input = document.getElementById("nameInput").value;

  if (input.trim() !== "") {
    document.getElementById("playerName").innerText = input;
  } else {
    alert("Silakan masukkan nama terlebih dahulu!");
  }
}

function klik() {
  if (score < 10) {
    score++;
    document.getElementById("score").innerText = score;
  }

  if (score === 10) {
    alert("Mantap! Kamu mencapai score maksimal: 10");
  }
}

/* 🔥 ANIMASI TRUE / FALSE */
function showAnimation(isCorrect) {
  const anim = document.getElementById("result-animation");

  if (isCorrect) {
    anim.innerHTML = "✔️<br>TRUE";
    anim.className = "correct";
  } else {
    anim.innerHTML = "❌<br>FALSE";
    anim.className = "wrong";
  }

  anim.style.display = "block";
  anim.style.opacity = "1";
  anim.style.transform = "translate(-50%, -50%) scale(1.6)";

  setTimeout(() => {
    anim.style.opacity = "0";
    anim.style.transform = "translate(-50%, -50%) scale(1)";
  }, 800);

  setTimeout(() => {
    anim.style.display = "none";
  }, 1200);
}

function loadQuestion() {
  if (currentQuestion >= questions.length || score >= 10) {
    document.getElementById("quiz").innerHTML = `
      <h2>Quiz Selesai!</h2>
      <p>Score akhir kamu: ${score} / 10</p>
    `;
    return;
  }

  const q = questions[currentQuestion];

  let html = `
    <h4>Soal ${currentQuestion + 1}</h4>
    <img src="${q.image}" width="200"><br><br>
  `;

  q.options.forEach(option => {
    html += `
      <button class="btn btn-outline-primary"
        onclick="checkAnswer('${option}')">
        ${option}
      </button><br>
    `;
  });

  document.getElementById("quiz").innerHTML = html;
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    klik();
    showAnimation(true);
  } else {
    showAnimation(false);
  }

  currentQuestion++;

  setTimeout(() => {
    loadQuestion();
  }, 1500);
}

window.onload = function () {
  shuffleQuestions(questions);
  loadQuestion();
};