/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let chains = {};
    for (let word of this.words) {
  
      // create the object with keys for each word
      chains[word] = [];
    }

    // iterate of the object keys to find the follower words
    for (let key in chains) {
      for (let i = 0; i < this.words.length; i++) {

        if (this.words[i] == key) {
          chains[key].push(this.words[i + 1] || null);
        }
      }
    }

    this.chains = chains;
  }


  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = MarkovMachine.choice(keys);
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key)
      key = MarkovMachine.choice(this.chains[key]);
    }

    return output.join(' ');
  }
}


module.exports = {
  MarkovMachine
}