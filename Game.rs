use std::io;

struct Board {
    cells: [char; 9],
}

impl Board {
    fn new() -> Self {
        Board {
            cells: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        }
    }

    fn print(&self) {
        println!(" {} | {} | {}", self.cells[0], self.cells[1], self.cells[2]);
        println!("-----------");
        println!(" {} | {} | {}", self.cells[3], self.cells[4], self.cells[5]);
        println!("-----------");
        println!(" {} | {} | {}", self.cells[6], self.cells[7], self.cells[8]);
    }

    fn is_valid_move(&self, pos: usize) -> bool {
        pos < 10 && self.cells[pos - 1] != 'X' && self.cells[pos - 1] != 'O'
    }

    fn make_move(&mut self, pos: usize, symbol: char) {
        self.cells[pos - 1] = symbol;
    }

    fn check_winner(&self) -> Option<char> {
        let lines = [
            (0, 1, 2),
            (3, 4, 5),
            (6, 7, 8),
            (0, 3, 6),
            (1, 4, 7),
            (2, 5, 8),
            (0, 4, 8),
            (2, 4, 6),
        ];

        for (a, b, c) in lines {
            if self.cells[a] == self.cells[b] && self.cells[b] == self.cells[c] {
                return Some(self.cells[a]);
            }
        }

        None
    }
}

fn main() {
    let mut board = Board::new();
    let mut current_player = 'X';

    loop {
        board.print();
        println!("Player {}, enter your move (1-9):", current_player);

        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");

        let pos: usize = input.trim().parse().expect("Invalid input");

        if !board.is_valid_move(pos) {
            println!("Invalid move, try again.");
            continue;
        }

        board.make_move(pos, current_player);

        match board.check_winner() {
            Some(winner) => {
                board.print();
                println!("Player {} wins!", winner);
                break;
            }
            None => {
                if board.cells.iter().all(|&c| c == 'X' || c == 'O') {
                    board.print();
                    println!("It's a draw!");
                    break;
                }
                current_player = if current_player == 'X' { 'O' } else { 'X' };
            }
        }
    }
}
