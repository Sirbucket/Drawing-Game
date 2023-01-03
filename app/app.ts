import { Utils } from './util';
import { caps, colors, connections } from './drawing';
import { Img, wordArray } from './processing/processinput';

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

function returnToMainPage(element, canvas, wordList, dbuttonList) {
	element.removeChild(canvas.element);
	for (let i = wordList.length; i >= 0; --i) {
		element.removeChild(wordList[i].element);
	}

	setupMainPage();

	for (let i = dbuttonList.length; i >= 0; --i) {
		element.removeChild(dbuttonList[i].cloneContent);
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
		let json = await fetch(`./.netlify/functions/getImages`) //Ensures we see the data (print will go later)
		console.log(json);
		return json
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

function mainPageButtons(element) {
	utils.newButton("Draw", buttonList).onClick(() => {
		for (let i = containerList.length; i >= 0; --i) {
			element.removeChild(containerList[i].cloneContent);
		}

		const canvas = makeNewDrawingCanvas("1280", "720", "black", "lightsteelblue");
		const ctx = canvas.ctx;

		setupDrawingButtons(canvas, ctx, app);
		element.appendChild(canvas.element);
	});

	utils.newButton("Guess", buttonList).onClick(async () => {
		console.log('Clicked button, go fetch...');

		try {
			var response = await testSendData("datatest", 0)
		} catch (err) {
			console.log(`${err}`);
			return;
		}
		return response
	});
	utils.newContainer(buttonList, containerList);
}

mainPageButtons(app);
setupMainPage();