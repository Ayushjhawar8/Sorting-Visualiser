"use strict";
let sortingInProgress = false; // Track sorting state
let algorithm; // To allow stopping the algorithm
async function toggleChat() {
  const chatButton = document.getElementById("chatButton");
  const userInput = document.getElementById('chatInput').value;
  if(userInput == "") return;
  if (sortingInProgress) {
    // If sorting is in progress, stop it
    stopSorting();
    chatButton.innerText = "Send";
  } else {
    // Process new chat input
    await processChat();
    chatButton.innerText = "Stop";
  }
}


async function processChat() {
  const userInput = document.getElementById('chatInput').value;
  if(userInput == "") return;
  // Call the AI model API here
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <groq-api-key>'
    },
    body: JSON.stringify({
      model:"llama3-groq-70b-8192-tool-use-preview",
      messages: [{
        role: "user",
        content: `Analyze this prompt for a sorting visualizer: "${userInput}". Return JSON format: { algoValue: 1-5, arraySize: number}. You only JSON reponse strictly. No explaination. Return only JSON format like { algoValue: 1-5, arraySize: number}`,
      }],
      response_format: { type: "json_object" }
    })
  });

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  // Set algoValue and array size based on the response
  document.querySelector(".algo-menu").value = result.algoValue;
  document.querySelector(".size-menu").value = result.arraySize;

  // Render the updated visualizer
  await RenderScreen();
  start()
}

// Function to stop sorting and reset the visualizer
const stopSorting = async () => {
  if (sortingInProgress) {
    // Assuming sortAlgorithms class has a method to halt execution
    algorithm.stop(); // Custom stop method within sortAlgorithms
    sortingInProgress = false;
    await clearScreen();
  }
};


const start = async () => {
  sortingInProgress = true;
  document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden";
  let now = new Date();
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
  let now1 = new Date();
  document.getElementById('Ttime').innerHTML = (now1 - now) / 1000;
  sortingInProgress = false;
  document.getElementById("chatButton").innerText = "Send";
  // document.querySelector(".footer > p:nth-child(2)").style.visibility = "visible";
};
var i=0;
let input;

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderInput = async () => {
  input = String(document.querySelector(".input").value);
  console.log(input);
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  // if(i>0){
  //   input = prompt("Do you want to manually input the array? Answer - Y/N");
  // }
  // i++;
  await clearScreen();
  //await RenderInput();


  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;


  if (input == "Y") {
    for (let counter = 0; counter < Length; ++counter) {
      let randomNumber = prompt("Enter the no.");
      list.push(parseInt(randomNumber));
    }
  }
  else{
    for (let counter = 0; counter < Length; ++counter) {
      let randomNumber = Math.floor(
        Math.random() * (upperBound - lowerBound + 1) + lowerBound
      );
      list.push(parseInt(randomNumber));
    }
  }

  // for (let counter = 0; counter < Length; ++counter) {
  //   let randomNumber = Math.floor(
  //     Math.random() * (upperBound - lowerBound + 1) + lowerBound
  //   );
  //   list.push(parseInt(randomNumber));
  // }


  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderList);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
document.querySelector(".input").addEventListener("change", RenderInput);
window.onload = RenderScreen;