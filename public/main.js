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
let pageCount = 12;
for (let i = 0; i < pageCount; i++) {
  book.innerHTML += pageTemplate(i + 1);
}
const pageData = [];
pageData.push("<img src='1.jpg' />");
pageData.push("<img src='2.jpg' />");
pageData.push("<img src='3.jpg' />");
pageData.push("<img src='4.jpg' />");
pageData.push("<img src='5.jpg' />");
pageData.push("<img src='1.jpg' />");
const pageOrder = [];
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
      document.getElementById(pageOrder[i]).innerHTML = "";
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
  prevBtn.style.transform = "translateX(-60px)";
  nextBtn.style.transform = "translateX(60px)";
}

function closeBook(isAtBeginning) {
  if (isAtBeginning) {
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
