export const wordArray = ["I am here to keep this from breaking"] //Game words get stored here
export const filteredWords = [/n[ie][gb][gbaer]/gi, /sh[iea][t]/gi, /b[i][t]ch/gi, /wh[o][r][e]/gi, /c[u][n][t]/gi, /di[ck][ck]/gi, /fa[g][gio][tio][t]/gi, /fu[ck][ck]/gi, /ch[in][nkc][kc]/gi, /g[ou][ou][kc]/gi, /a[s][s][h][ol][le][e]/gi, /c[u][m]/] //Add hard swears after school lmao.
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