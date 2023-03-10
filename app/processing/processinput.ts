import { getServerData, setServerData } from "../app";

export const wordArray = [] //Game words get stored here

export async function pushServerToClient() {
	try {
		var serverData = await getServerData()
		
	} catch (err) {
		console.log(err)
		return
	}
	
	for (let i = 0; i < serverData.length; ++i) {
		wordArray[i] = serverData[i].name
	}
	wordArray.sort()
}

//Filter isn't working so I'm just going to leave this for now :(
export function filterWord(word) {
	let lword = word.toUpperCase().trimStart().trimEnd()
	if (lword == "") return false && console.log("This is blank.");
	if (lword.length > 45) return false && console.log("This word is too long!") //Longest realistic to be used word in the world is 45 letters.
	for (let i = 0; i < wordArray.length - 1; ++i) {
		if (lword == wordArray[i]) return false && console.log("This word already exists")	
	}
	return lword
} //Testing this stuff