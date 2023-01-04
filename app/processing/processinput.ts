export const wordArray = ["I am here to keep this from breaking"] //Game words get stored here
export const filteredWords = ["|", "@", "%", "^", "&", "*", "+", "_", "=", "[", "{", "}", "]", "<", ">", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] //Add hard swears after school lmao.
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
		if (lword.search(`${filteredWords[i]}`) == true) {
			return false && console.log("This word was not added to the list. It was filtered out.");
		}
	}

	return true && lword.toUpperCase()
} //Testing this stuff