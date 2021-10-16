const btn = document.querySelector(".container-item .btn");
const imagens = document.querySelector(".container-item .imagens");
const background = document.querySelector(".container-main");
const showContainer = document.querySelector(".show-container");
const scoreValue = document.querySelector(".score-level .score-main .score");
const levelValue = document.querySelector(".score-level .level-main .level");
const showDino = document.querySelector(".show-dino");
const gameOver = document.querySelector(".game-over");

const music_jump = new Audio();
music_jump.src = "./effects/music_jump.mp3";

const music_gameover = new Audio();
music_gameover.src = "./effects/music_gameover.mp3";

const music_base = new Audio();
music_base.src = "./effects/music_base.mp3";

let position = 0;
let score = 0;
let level = 0;
let isjump = false;

//    funcao verificar keycode
function handleKeyup(e) {
  if (e.keyCode === 32) {
    music_jump.play();
    if (!isjump) {
      jump();
    }
  }
}

// funcção Junmp
function jump() {
  isjump = true;
  let upInterval = setInterval(() => {
    if (position >= 180) {
      clearInterval(upInterval);

      // descendo
      let downInterval = setInterval(() => {
        if (position <= -9) {
          clearInterval(downInterval);
          isjump = false;
        } else {
          position -= 20;
          showDino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      //subindo
      position += 20;
      showDino.style.bottom = position + "px";
    }
  }, 20);
}

// função criar cactus
function createCactus() {
  music_base.play();

  let cactusPostion = 1000;
  let randomtime = Math.random() * 6000;

  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";
  background.appendChild(cactus);

  let letfInterval = setInterval(() => {
    if (cactusPostion < -60) {
      clearInterval(letfInterval);
      background.removeChild(cactus);
    } else if (cactusPostion > 0 && cactusPostion < 60 && position < 60) {
      // logica para fim de jogo
      clearTimeout(timeOut);
      clearInterval(letfInterval);
      music_base.pause();

      setInterval(() => {
        gameOver.innerHTML = '<div class="game-over">Game Over</div>';
        music_gameover.play();
      }, 200);

      showContainer.remove();
      cactus.remove();

      // funcaçao reniciar jogo
      setTimeout(() => {
        location.reload();
      }, 5000);
    } else {
      cactusPostion = cactusPostion - (level + 10);
      cactus.style.left = cactusPostion + "px";

      // imprimir  pontuação e level
      let nextLevel = (scoreValue.innerHTML = `${scoreResult()}`);
      if (nextLevel % 900 === 0) {
        level++;
      }
      levelValue.innerHTML = `${level}`;
    }
  }, 20);

  let timeOut = setTimeout(createCactus, randomtime);
}
// botao start
btn.addEventListener("click", start);

// evento da função handleKeyup
document.addEventListener("keyup", handleKeyup);

// função start
function start() {
  imagens.remove();
  btn.remove();
  showContainer.classList.add("container");
  showDino.classList.add("dino");
  createCactus();
}
function scoreResult(s) {
  s = score++;
  return score;
}
