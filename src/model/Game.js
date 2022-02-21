import Square from "./Square"

function Game(word){
    this.word = word

    this.wordList = [
        "ΑΘΗΕΝΟΥ",
        "ΑΧΝΑ",
        "ΛΕΥΚΩΣΙΑ",
        "ΚΙΤΙ",
        "ΝΑΤΑ",
        "ΚΟΡΝΟΣ",
        "ΛΥΣΗ",
        "ΑΣΙΑ",
        "ΠΕΓΕΙΑ",
        "ΠΑΦΟΣ"
    ]

    this.board = []

    for(let row = 0 ; row < 5 ; row++){
        this.board[row] = []
        for(let square = 0 ; square < word.length ; square++){
            this.board[row][square] = new Square("", "")
        }
    }

    this.cursor = {
        row: 0,
        square: 0
    }

    this.addLetter = (letter) => {

        if(this.cursor.square >= this.word.length){
            throw "Cursor at end of row"
        }

        this.board[this.cursor.row][this.cursor.square].letter = letter

        this.cursor.square++
    }

    this.checkWord = () => {
        
        if(this.cursor.square !== this.word.length){
            throw "Cursor not at end of row"
        }

        let inputCharacters = this.board[this.cursor.row].map((square) => square.letter)
        let input = inputCharacters.join("")

        if(!this.wordList.includes(input)){
            throw "Word not in word list"
        }

        let results = this.getResultForCurrentRow()

        this.board[this.cursor.row] = results.map((result, index) => new Square(inputCharacters[index], results[index]))

        if(results.filter((result => result === "CORRECT")).length === results.length){
            return {
                correctWord: true
            }
        }
        else{
            this.cursor.row++
            this.cursor.square = 0
            return {
                correctWord: false
            }
        }

    }

    this.getResultForCurrentRow = () => {
        let results = Array(this.word.length).fill("")

        let inputCharacters = this.board[this.cursor.row].map((square) => square.letter)
        let gameWordCharacters = this.word.split("")

        inputCharacters.forEach((character, index) => {
            if(!gameWordCharacters.includes(character)){
                results[index] = "WRONG"
            }
            else if(character === gameWordCharacters[index]){
                results[index] = "CORRECT"
            }
            else if(gameWordCharacters.includes(character)){
                let i = inputCharacters.indexOf(character)
                if(results[i] === ""){
                    results[i] = "WRONGPOSITION"
                }
            }
        })

        results.forEach((result, index) => {
            if(result === ""){
                results[index] = "WRONG"
            }
        })

        return results
    }
}

export default Game