export const wordArray = ["I am here to keep this from breaking"] //Game words get stored here
export class Img {
    reports
    name

    constructor(name, reports) {
        this.name = name;
        if (reports) {
            this.reports = reports;
        }
    }
}

//Filter isn't working so I'm just going to leave this for now :(
export function filterWord(word) {
	let lword = word.toLowerCase().trimStart().trimEnd()
	if (lword == "") return false && console.log("This is blank.");
	if (lword.length > 45) return false && console.log("This word is too long!") //Longest realistic to be used word in the world is 45 letters.

	return true && lword.toUpperCase()
} //Testing this stuff