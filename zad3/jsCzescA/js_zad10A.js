function censorSentence(forbiddenWords, sentence) {
    let words = sentence.split(" ");

    let censoredSentence = words.map(word => {
        if (forbiddenWords.includes(word)) {
            return "*";
        }
        return word;
    }).join(" ");

    return censoredSentence;
}

const forbiddenWords = ["zły", "brzydki", "niegrzeczny"];
const sentence1 = "To jest bardzo zły i brzydki przykład zdania.";
const sentence2 = "To jest bardzo zły brzydki i niegrzeczny przykład zdania.";
console.log(censorSentence(forbiddenWords, sentence1));
console.log(censorSentence(forbiddenWords, sentence2));
