// References to DOM Elements
const pageData = [];
pageData.push("<img src='1.jpg' />");
pageData.push("<img src='2.jpg' />");
pageData.push("<img src='3.jpg' />");
pageData.push("<img src='4.jpg' />");
pageData.push("<img src='5.jpg' />");
pageData.push("<img src='6.jpg' />");
const pageOrder = [];
pageOrder.push("f1", "b1", "f2", "b2", "f3", "b3");
if (isMobile()) {
  for (let i in pageOrder) {
    if (i % 2 == 1) {
      document.getElementById(pageOrder[i]).innerHTML = "";
    } else {
      document.getElementById(pageOrder[i]).innerHTML = pageData.shift();
    }
  }
}
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook() {
  if (!isMobile()) book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-180px)";
  nextBtn.style.transform = "translateX(180px)";
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
    switch (currentLocation) {
      case 1:
        openBook();
        paper1.classList.add("flipped");

        break;
      case 2:
        paper2.classList.add("flipped");
        paper1.style.zIndex = 1;
        paper2.style.zIndex = 2;
        break;
      case 3:
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
        closeBook(false);
        break;
      default:
        throw new Error("unkown state");
    }
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    switch (currentLocation) {
      case 2:
        closeBook(true);
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 3;
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 2;
        paper3.style.zIndex = 1;
        break;
      case 4:
        openBook();
        paper3.classList.remove("flipped");

        paper3.style.zIndex = 3;
        break;
      default:
        throw new Error("unkown state");
    }

    currentLocation--;
  }
}
