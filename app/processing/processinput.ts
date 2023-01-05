export const wordArray = ["I am here to keep this from breaking"] //Game words get stored here
export const filteredWords = [/\bn[ie][gb][gbaer]\b/gi, /\bsh[iea][t]\b/gi, /\bb[i][t]ch\b/gi, /\bwh[o][r][e]\b/gi, /\bc[u][n][t]\b/gi, /\bdi[ck][ck]\b/gi, /\bfa[g][gio][tio][t]\b/gi, /\bfu[ck][ck]\b/gi, /\b[ch][in][nkc][kc]\b/gi, /\bg[ou][ou][kc]\b/gi, /\ba[s][s][h][ol][le][e]\b/gi, /\bc[u][m]\b/] //Add hard swears after school lmao.
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
		if (lword.match(`${filteredWords[i]}`)) {
			return false && console.log("This word was not added to the list. It was filtered out.");
		}
	}

	return true && lword.toUpperCase()
} //Testing this stuff