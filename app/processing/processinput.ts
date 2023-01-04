export const wordArray = ["I am here to keep this from breaking"] //Game words get stored here
export const filteredWords = [/\bn[ie][gb][gber]\b/gi, /\bsh[iea][t]\b/gi,] //Add hard swears after school lmao.
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

export function filterWord(word) {
	let lword = word.toLowerCase().trimStart().trimEnd()
	if (lword == "") return console.log("This is blank.");
	if (lword.length > 45) return false && console.log("This word is too long!") //Longest realistic to be used word in the world is 45 letters.

	for (let i = 0; i < filteredWords.length; ++i) {
		if (lword.match(`${filteredWords[i]}`) == true) {
			return false && console.log("This word was not added to the list. It was filtered out.");
		}
	}

	return true && lword.toUpperCase()
} //Testing this stuff