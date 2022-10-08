
let randomNumber = Math.round(Math.random() * 100);
console.log(randomNumber);

let score = 10;
let topScore = localStorage.getItem("topScore") || 0;

//? DOM'daki top-score degerini localStorage'den okuyarak guncelle.
document.querySelector(".top-score").textContent = topScore;

//* CheckBtn basildiginda kontrolleri yap
const checkButton = document.querySelector(".check-btn");

let guessAll = [];

checkButton.addEventListener("click", () => {
  const guessInput = Number(document.querySelector(".guess-input").value);
  const msg = document.querySelector(".msg");
  const body = document.querySelector("body");
  const alr = document.querySelector(".alr");

  guessAll.push(guessInput);
  let compare = guessAll.filter((item => item == guessInput));
  if (compare.length > 1){
  alr.innerText = "This number has already been entered, Please enter a new number";
    }
  //? eger input girilmediyse Kullaniciya uyari ver.  
  else if (!guessInput) {
    msg.innerText = "Please enter a number";
    //! eger rasgele == input.value
  } else if (randomNumber === guessInput) {
    msg.innerHTML = `Congrats You Win <i class="fa-solid fa-face-grin-hearts fa-2x"></i> `;
    body.className = "bg-success";
    document.querySelector(".check-btn").disabled = true;
    if (score > topScore) {

      //? localStorage'deki topScore degiskenini guncelle
      localStorage.setItem("topScore", score);

      //? DOM'daki top-score degerini guncelle
      document.querySelector(".top-score").textContent = score;
    }
    document.querySelector(".secret-number").textContent = randomNumber;

    //! eger rasgele!= input.value
  } else {
    score--;
    if (score > 0) {
      guessInput > randomNumber
        ? (msg.innerHTML = `<i class="fa-solid fa-arrow-trend-down fa-2x"></i> DECREASE `)
        : (msg.innerHTML = `<i class="fa-solid fa-arrow-trend-up fa-2x"></i> INCREASE `);
    } else {
      msg.innerHTML = `You Lost <i class="fa-regular fa-face-sad-tear fa-2x"></i>`;
      document.querySelector(".secret-number").textContent = randomNumber;
      body.className = "bg-danger";
      document.querySelector(".check-btn").disabled = true;
    }

    document.querySelector(".score").textContent = score;
  }
});

//* again basildiginda oyunu baslangic dgerlerin kur
document.querySelector(".again-btn").addEventListener("click", () => {
  score = 10;
  document.querySelector(".score").textContent = score;
  randomNumber = Math.round(Math.random() * 100);
  document.querySelector(".secret-number").textContent = "?";
  console.log(randomNumber);
  document.querySelector(".check-btn").disabled = false;
  document.querySelector("body").classList.remove("bg-success", "bg-danger");
  document.querySelector(".guess-input").value = "";
  document.querySelector(".msg").innerText = `Starting..`;
});

document.querySelector(".guess-input").addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    document.querySelector(".check-btn").click();
  }
});