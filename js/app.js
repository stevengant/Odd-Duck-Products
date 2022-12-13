'use strict';

console.log('hello world!');

// Globals
let prodArr = [];
let votingRnds = 25;

// DOM Windows
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('view-results-btn');
// let resultsList = document.getElementById('results-container');

// Canvas element
let canvasElem = document.getElementById('chart');

// Constructor function
function Duck(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// Helper functions
function randomIndex() {
  return Math.floor(Math.random() * prodArr.length);
}

let indexArray = [];

function renderImg() {


 // Ensure displayed images are all unique
  // while(imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex) {
  //   imgOneIndex = randomIndex();
  //   imgTwoIndex = randomIndex();
  // }

  while(indexArray.length < 6) {
    let randomNum = randomIndex();
    if(!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
  }

  indexArray.splice(0, 3);

  // Display three unique images
  let imgOneIndex = indexArray[0];
  let imgTwoIndex = indexArray[1];
  let imgThreeIndex = indexArray[2];

  imgOne.src = prodArr[imgOneIndex].img;
  imgTwo.src = prodArr[imgTwoIndex].img;
  imgThree.src = prodArr[imgThreeIndex].img;

  imgOne.title = prodArr[imgOneIndex].name;
  imgTwo.title = prodArr[imgTwoIndex].name;
  imgThree.title = prodArr[imgThreeIndex].name;

  imgOne.alt = `this is an image of ${prodArr[imgOneIndex].name}`;
  imgTwo.alt = `this is an image of ${prodArr[imgTwoIndex].name}`;
  imgThree.alt = `this is an image of ${prodArr[imgThreeIndex].name}`;

  // Increase number of views of images that have rendered
  prodArr[imgOneIndex].views++;
  prodArr[imgTwoIndex].views++;
  prodArr[imgThreeIndex].views++;
}

// Render chart
function renderChart() {
  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for(let i = 0; i < prodArr.length; i++) {
    prodNames.push(prodArr[i].name);
    prodVotes.push(prodArr[i].votes);
    prodViews.push(prodArr[i].views);
  }
  
  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: 'Number of Votes',
        data: prodVotes,
        borderWidth: 1,
        backgroundColor: 'aqua'
      },
      {
        label: 'Number of Views',
        data: prodViews,
        borderWidth: 1,
        backgroundColor: 'white'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Pass in canvas element
  new Chart(canvasElem, chartObj);
}

// Event handlers
function handleClick(event) {
  // ID which image was clicked
  let imgClicked = event.target.title;

  console.log(imgClicked);

  // Increase number of votes for image that is clicked
  for(let i = 0; i < prodArr.length; i++) {
    if(imgClicked === prodArr[i].name) {
      prodArr[i].votes++;
    }
  }

  // decrement voting rounds
  votingRnds--;

  // Render three new images
  renderImg();

  // Once voting rounds have ended, do not allow any more clicks
  if(votingRnds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    alert('Max votes reached!');
  }
}

function handleShowResults() {
  // Display results once voting rounds have reached zero
  if(votingRnds === 0) {

    renderChart();
    // for(let i = 0; i < prodArr.length; i++) {
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${prodArr[i].name} had ${prodArr[i].votes} votes, and was seen ${prodArr[i].views} times`;

    //   resultsList.appendChild(liElem);
    // }

    // resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// Executable code
let bag = new Duck('bag');
let banana = new Duck('banana');
let bathroom = new Duck('bathroom');
let boots = new Duck('boots');
let breakfast = new Duck('breakfast');
let bubblegum = new Duck('bubblegum');
let chair = new Duck('chair');
let cthulhu = new Duck('cthulhu');
let dogDuck = new Duck('dog-duck');
let dragon = new Duck('dragon');
let pen = new Duck('pen');
let petSweep = new Duck('pet-sweep');
let scissors = new Duck('scissors');
let shark = new Duck('shark');
let sweep = new Duck('sweep', 'png');
let tauntaun = new Duck('tauntaun');
let unicorn = new Duck('unicorn');
let waterCan = new Duck('water-can');
let wineGlass = new Duck('wine-glass');

prodArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);