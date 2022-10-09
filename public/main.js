// References to DOM Elements

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const pages = {};
const pageTemplate = (id) => {
  return `

      <div id="p${id}" class="paper">
        <div class="front">
          <div id="f${id}" class="front-content">
            <img src="${id}.jpg" />
          </div>
        </div>
        <div class="back">
          <div id="b${id}" class="back-content">
            <img src="${id + 1}.jpg" />
          </div>
        </div>
      </div>

`;
};
let pageCount = 6;
for (let i = 0; i < pageCount; i++) {
  book.innerHTML += pageTemplate(i + 1);
}
const pageData = [];
pageData.push("<img src='1.jpg' />");
pageData.push(
  `<img src='2.jpg' />
  <div id='pageContent1' class='pageContent'>
  <div class='videoDiv'>
  <video id="clip1" preload="auto">
  <source src="./clip1.mp4">
  </video><img id='play1' class='playButton1' src='./playbutton.png' />
  </div>

  </div>
  `
);
{
  /*  */
}
pageData.push(
  "<img src='3.jpg' /><div class='pageContent'><img id='play2' class='playButton2' src='./playbutton.png' /></div>"
);
pageData.push("<img src='4.jpg' />");
pageData.push("<img src='5.jpg' />");
pageData.push("<img src='3.jpg' />");

pageData.push("<img src='7.jpg' />");
pageData.push("<img src='8.jpg' />");
pageData.push("<img src='4.jpg' />");
pageData.push("<img src='5.jpg' />");
pageData.push("<img src='3.jpg' />");
pageData.push("<img src='10.jpg' />");
const pageOrder = [];
pageData.push("<img src='10.jpg' />");
pageOrder.push(
  "f1",
  "b1",
  "f2",
  "b2",
  "f3",
  "b3",
  "f4",
  "b4",
  "f5",
  "b5",
  "f6",
  "b6"
);
if (isMobile()) {
  for (let i in pageOrder) {
    if (i % 2 == 1) {
      document.getElementById(pageOrder[i]).innerHTML = pageData[2];

      document.getElementById(pageOrder[i]).classList.add("backfaceForMobile");
    } else {
      document.getElementById(pageOrder[i]).innerHTML = pageData.shift();
    }
  }
} else {
  for (let i in pageOrder) {
    document.getElementById(pageOrder[i]).innerHTML = pageData.shift();
  }
}
let paper = [];
for (let i = 1; i <= pageCount; i++) {
  paper[i] = document.querySelector("#p" + i);
  paper[i].style.zIndex = pageCount - i;
}
// paper[0] = document.querySelector("#p1");
// const paper2 = document.querySelector("#p2");
// const paper3 = document.querySelector("#p3");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = pageCount;
let maxLocation = paper.length;

function openBook() {
  if (!isMobile()) book.style.transform = "translateX(50%)";
  //prevBtn.style.transform = "translateX(-60px)";
  // nextBtn.style.transform = "translateX(60px)";
}

function closeBook(isAtBeginning) {
  if (isAtBeginning) {
    paper[currentLocation - 1].style.pointerEvents = "auto";
    if (!isMobile()) book.style.transform = "translateX(0%)";
  } else {
    if (!isMobile()) book.style.transform = "translateX(100%)";
  }

  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}
function goNextPage() {
  if (currentLocation < maxLocation) {
    if (currentLocation === 1) {
      openBook();
    }

    paper[currentLocation].classList.add("flipped");
    if (!isMobile()) paper[currentLocation].style.pointerEvents = "none";

    //paper[currentLocation + 1].style.pointerEvents = "none";
    if (paper[currentLocation - 1]) paper[currentLocation - 1].style.zIndex = 0;

    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    if (currentLocation === 2) {
      closeBook(true);

      paper[currentLocation - 1].classList.remove("flipped");
      paper[currentLocation - 1].style.zIndex = paper.length;
    } else if (currentLocation === paper.length) {
      openBook();

      paper[currentLocation - 1].classList.remove("flipped");

      paper[currentLocation - 1].style.zIndex = paper.length;
    } else {
      paper[currentLocation - 1].classList.remove("flipped");
      paper[currentLocation - 1].style.zIndex = paper.length - currentLocation;
      paper[currentLocation].style.zIndex = paper.length - currentLocation - 1;
    }

    currentLocation--;
  }
}
document.getElementById("play1").style.cursor = "pointer";
document.getElementById("pageContent1").addEventListener("mouseover", (e) => {
  console.log("aa");
});
document.getElementById("play1").addEventListener("click", () => {
  // document.querySelector(".modal").style.display = "block";
  if (!isMobile()) {
    document.getElementById("play1").style.display = "none";
    console.log("aa");
    book.style.transition = "transform 1s";
    book.style.transform += "scale(2)";
    book.style.transform += "translateX(80%)";
    book.style.transform += "translateY(-20%)";
    document.getElementById("clip1").play();
    document.getElementById("clip1").style.opacity = 1;
    setTimeout(() => {
      book.style.transform = "translateX(50%)";
      book.style.transition = "transform 0.6s";

      document.getElementById("play1").style.display = "block";
      document.getElementById("clip1").style.opacity = 0;
    }, 4500);
  } else {
    document.getElementById("play1").style.display = "none";

    book.style.transition = "transform 1s";
    book.style.transform += "scale(1.25)";
    book.style.transform += "translateX(0%)";
    book.style.transform += "translateY(-20%)";
    document.getElementById("clip1").play();
    document.getElementById("clip1").style.opacity = 1;
    setTimeout(() => {
      book.style.transform = "translateX(0%)";
      book.style.transition = "transform 0.6s";

      document.getElementById("play1").style.display = "block";
      document.getElementById("clip1").style.opacity = 0;
    }, 4500);
  }
});
document.getElementById("play2").addEventListener("click", () => {
  //
});

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
  document.querySelector("#video1").pause();
});
