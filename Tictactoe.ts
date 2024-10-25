class TicTacToe {
    private board: string[] = Array(9).fill(null);
    private currentPlayer: string = 'X';
    private winner: string | null = null;

    // Winning combinations (index triples representing rows, columns, and diagonals)
    private winningCombinations: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Print the current board state
    printBoard(): void {
        console.log(
            `${this.board[0] || '1'} | ${this.board[1] || '2'} | ${this.board[2] || '3'}\n` +
            `---------\n` +
            `${this.board[3] || '4'} | ${this.board[4] || '5'} | ${this.board[5] || '6'}\n` +
            `---------\n` +
            `${this.board[6] || '7'} | ${this.board[7] || '8'} | ${this.board[8] || '9'}\n`
        );
    }

    // Check if a move is valid
    private isValidMove(position: number): boolean {
        return position >= 0 && position < 9 && !this.board[position];
    }

    // Make a move at the specified position
    makeMove(position: number): boolean {
        if (!this.isValidMove(position) || this.winner) {
            console.log("Invalid move.");
            return false;
        }

        this.board[position] = this.currentPlayer;
        if (this.checkWinner()) {
            this.winner = this.currentPlayer;
            console.log(`Player ${this.currentPlayer} wins!`);
        } else if (this.board.every(cell => cell)) {
            console.log("It's a draw!");
            this.winner = 'Draw';
        } else {
            this.switchPlayer();
        }
        return true;
    }

    // Check if the current player has won
    private checkWinner(): boolean {
        return this.winningCombinations.some(([a, b, c]) => 
            this.board[a] === this.currentPlayer && 
            this.board[a] === this.board[b] && 
            this.board[b] === this.board[c]
        );
    }

    // Switch to the other player
    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    // Get the current game status
    getStatus(): string {
        return this.winner ? 
            (this.winner === 'Draw' ? "It's a draw!" : `Player ${this.winner} wins!`) : 
            `Player ${this.currentPlayer}'s turn.`;
    }
}

// Game simulation
const game = new TicTacToe();
game.printBoard();
game.makeMove(0);  // Player X
game.printBoard();
game.makeMove(1);  // Player O
game.printBoard();
game.makeMove(4);  // Player X
game.printBoard();
game.makeMove(8);  // Player O
game.printBoard();
game.makeMove(7);  // Player X (winning move)
game.printBoard();
console.log(game.getStatus());
