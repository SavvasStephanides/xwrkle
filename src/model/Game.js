import Square from "./Square"

function Game(word){
    this.word = word

    this.wordList = require("./wordlist.json")

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
            throw new Error("Cursor at end of row")
        }

        this.board[this.cursor.row][this.cursor.square].letter = letter

        this.cursor.square++
    }

    this.removeLetterBeforeCursor = () => {
        if(this.cursor.square === 0){
            throw new Error("No more letters to erase")
        }
            
        this.board[this.cursor.row][this.cursor.square-1].letter = ""

        this.cursor.square--
    }

    this.checkWord = () => {
        
        if(this.cursor.square !== this.word.length){
            throw new Error("Cursor not at end of row")
        }

        let inputCharacters = this.board[this.cursor.row].map((square) => square.letter)
        let input = inputCharacters.join("")

        if(!this.wordList.map(word => word.word).includes(input)){
            throw new Error("Word not in word list")
        }

        let results = this.getResultForCurrentRow()

        this.board[this.cursor.row] = results.map((result, index) => new Square(inputCharacters[index], results[index]))
        
        if(results.filter((result => result === "CORRECT")).length === results.length){
        }
        else{
            this.cursor.row++
            this.cursor.square = 0
        }
    }

    this.getResultForCurrentRow = () => {
        let results = Array(this.word.length).fill("")

        let input = this.board[this.cursor.row].map((square) => square.letter)
        let correctWord = this.word.split("")

        for(let i = 0 ; i < input.length ; i++){
            if(input[i] === correctWord[i]){
                results[i] = "CORRECT"
                correctWord[i] = ""
            }
        }

        for(let i = 0 ; i < input.length ; i++){
            for(let w = 0 ; w < correctWord.length ; w++){
                if(results[i] === "" && correctWord[w] === input[i]){
                    results[i] = "WRONGPOSITION"
                    correctWord[w] = ""
                }
            }
        }

        for(let i = 0 ; i < results.length ; i++){
            if(results[i] === ""){
                results[i] = "WRONG"
            }
        }

        return results


    }

    this.gameIsOver = () => {
        if(this.cursor.row === this.board.length){
            return true
        }

        let rowResults = this.board[this.cursor.row].map((square) => square.result)
        if(rowResults.filter((result) => result === "CORRECT").length === rowResults.length){
            return true
        }
        
        return false
    }

    this.getBoardAsSquares = () => {
        let heading = `Χωρκle 1 ${this.cursor.row+1}/5`
        
        let filledRows = this.board.slice(0, this.cursor.row + 1)

        let rowFlags = filledRows.map((row) => {
            let flags = {
                "CORRECT": "🟩",
                "WRONGPOSITION": "🟨",
                "WRONG": "⬛️"
            }
            return row.map((square) => flags[square.result])
        })

        let rowString = rowFlags.map((row) => row.join("")).join("\n")

        let boardAsString = `${heading}\n\n${rowString}`
        
        return boardAsString
    }
}

export default Game