class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
    }

    printBoard() {
        console.log(`
         ${this.board[0] || '1'} | ${this.board[1] || '2'} | ${this.board[2] || '3'}
        -----------
         ${this.board[3] || '4'} | ${this.board[4] || '5'} | ${this.board[5] || '6'}
        -----------
         ${this.board[6] || '7'} | ${this.board[7] || '8'} | ${this.board[8] || '9'}
        `);
    }

    makeMove(pos) {
        if (this.isValidMove(pos)) {
            this.board[pos] = this.currentPlayer;
            if (this.checkWinner()) {
                this.printBoard();
                console.log(`Player ${this.currentPlayer} wins!`);
                return true;
            }
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        } else {
            console.log("Invalid move. Try again.");
        }
        return false;
    }

    isValidMove(pos) {
        return this.board[pos] === null;
    }

    checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winConditions.some(condition => 
            condition.every(index => this.board[index] === this.currentPlayer)
        );
    }
}

// Game play simulation
const game = new TicTacToe();
game.printBoard();

// Example moves
game.makeMove(0); // Player X
game.printBoard();
game.makeMove(1); // Player O
game.printBoard();
// Continue with further moves
