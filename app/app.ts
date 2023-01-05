import { Utils } from './util';
import { caps, colors, connections } from './drawing';
import { Img, wordArray, filterWord } from './processing/processinput';

const buttonList = [];
const containerList = [];

const app = document.querySelector("#app");
let fm = false;
const utils = new Utils();

function setupMainPage() {
	for (let i = 0; i < containerList.length; ++i) {
		app.appendChild(containerList[i].cloneContent);
	}
}

function returnToMainPage(element, canvas?, wordList?, dbuttonList?) {
	if (canvas) element.removeChild(canvas.element);
	if (wordList) {
		for (let i = 0; i < wordList.length; ++i) {
			element.removeChild(wordList[i].element);
		}
	}
	
	setupMainPage();

	if (dbuttonList) {
		for (let i = 0; i < dbuttonList.length; ++i) {
			element.removeChild(dbuttonList[i].cloneContent);
		}
	}
}

//Make canvas for drawing on.
function makeNewDrawingCanvas(w, h, color, bgcolor) {
	let canvas = utils.newCanvas(w, h);
	canvas.canvas.style.backgroundColor = bgcolor;
	canvas.canvas.style.justifyContent = "auto";
	canvas.ctx.strokeStyle = color;

	canvas.onMouseDown((event) => {
		canvas.ctx.beginPath();
		canvas.ctx.moveTo(event.offsetX, event.offsetY);
	});

	canvas.onMouseMove((event) => {
		if (event.buttons != 1) return canvas;
		canvas.ctx.lineTo(event.offsetX, event.offsetY);
		canvas.ctx.stroke();
	});

	canvas.onMouseUp((event) => {
		if (fm === true) {
			canvas.ctx.fill();
			return canvas;
		}
		canvas.ctx.stroke();
	});

	return canvas;
}

async function setServerData(name, reports) {
	try {
		var response = await fetch(`./.netlify/functions/setImages?name=${name}&reports=${reports}`)
	} catch (err) {
		console.log(`${err}`);
		return;
	}
	if (response) {
		let json = await fetch(`./.netlify/functions/getImages`)
		console.log(json);
	} else {
		console.log("Blank");
	}
}

async function testSendData(name, reports) {
	let send = await setServerData(name, reports)
	return send
}
//Sets up the drawing section of the code.
function setupDrawingButtons(canvas, ctx, element) {
	const capButtons = [];
	const colorButtons = [];
	const connectButtons = [];
	const extraButtons = [];
	const wordList = [];
	const dbuttonList = [];

	for (let i = 0; i < caps.length; ++i) {
		utils.newButton(caps[i], capButtons).onClick(() => ctx.lineCap = caps[i]);
	}

	for (let i = 0; i < colors.length; ++i) {
		utils.newButton(colors[i], colorButtons).onClick(() => {
			ctx.strokeStyle = colors[i];
			ctx.fillStyle = colors[i];
		});
	}

	for (let i = 0; i < connections.length; ++i) {
		utils.newButton(connections[i], connectButtons).onClick(() => ctx.lineJoin = connections[i]);
	}

	utils.newButton("Back", extraButtons).onClick(() => {
		returnToMainPage(element, canvas, wordList, dbuttonList)
	});

	utils.newButton("Line", extraButtons).onClick(() => {
		fm = false;
	})

	utils.newButton("Fill", extraButtons).onClick(() => {
		fm = true;
	});

	utils.newButton("Clear", extraButtons).onClick(() => {
		ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
	});

	let word = wordArray[~~(Math.random() * wordArray.length)]

	utils.newButton("Save", extraButtons).onClick(() => {
		const image = canvas.canvas.toDataURL("image/png")

		let link = document.getElementById("link");
		link.removeAttribute("download");
		link.removeAttribute("href")
		link.setAttribute("download", "CanvasImage.png");
		link.setAttribute("href", image.replace("image/png", "image/octet-stream")); //saves it to local PC.
		link.click();

		returnToMainPage(element, canvas, wordList, dbuttonList)
	});

	utils.newContainer(capButtons, dbuttonList);
	utils.newContainer(colorButtons, dbuttonList);
	utils.newContainer(connectButtons, dbuttonList);
	utils.newContainer(extraButtons, dbuttonList);

	utils.newElement("namedisplay", word, wordList);

	for (let i = 0; i < wordList.length; ++i) {
		element.appendChild(wordList[i].element);
	}

	for (let i = 0; i < dbuttonList.length; ++i) {
		element.appendChild(dbuttonList[i].cloneContent);
	}
}

function createGuessingGame(element) {
	const extraButtons = [];
	const typeBoxes = [];
	const dbuttonList = [];

	for (let i = 0; i < containerList.length; ++i) {
		element.removeChild(containerList[i].cloneContent);
	}

	utils.newButton("Back", extraButtons).onClick(() => {
		returnToMainPage(element, false, false, dbuttonList)
	});
	utils.newButton("Test Get", extraButtons).onClick(async () => {
		let response = await fetch(`./netlify/functions/getImages`)	
		console.log(response)
	});
	
	
	let filteredInput
	utils.newTypebox("Word", typeBoxes).onInput(async (string) => {
		filteredInput = filterWord(string)
		if (!filteredInput) filteredInput = null
	});
	utils.newButton("Set", extraButtons).onClick(async () => {
		if (!filteredInput) return console.log("This is a bad word");
		let response = await testSendData(filteredInput, 0)
		console.log(response)
	});
	utils.newContainer(extraButtons, dbuttonList);
	for (let i = 0; i < dbuttonList.length; ++i) {
		element.appendChild(dbuttonList[i].cloneContent);
	}
	for (let i = 0; i < typeBoxes.length; ++i) {
		element.appendChild(typeBoxes[i].element)
	}
}

function mainPageButtons(element) {
	utils.newButton("Test", buttonList).onClick(async () => {
		let response = await testSendData("Name", 0)
		console.log(response)
	});
	utils.newButton("Draw", buttonList).onClick(() => {
		for (let i = 0; i < containerList.length; ++i) {
			element.removeChild(containerList[i].cloneContent);
		}

		const canvas = makeNewDrawingCanvas("1280", "720", "black", "lightsteelblue");
		const ctx = canvas.ctx;

		setupDrawingButtons(canvas, ctx, app);
		element.appendChild(canvas.element);
	});

	utils.newButton("Guess", buttonList).onClick(() => {
		createGuessingGame(element)
	});
	utils.newContainer(buttonList, containerList);
}

mainPageButtons(app);
setupMainPage();