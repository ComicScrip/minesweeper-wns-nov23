export type nbNeighbors = number;
export type bomb = "💣";
export type gameStatus = "won" | "lost" | "inProgress";

export interface Cell {
  val: bomb | nbNeighbors;
  revealed: boolean;
  x: number;
  y: number;
}

export type Board = Cell[][];

export function createEmptyBoard(size: number): Board {
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    const row: Cell[] = [];
    for (let x = 0; x < size; x += 1) {
      const cell = { val: 0, x, y, revealed: false };
      row.push(cell);
    }
    rows.push(row);
  }
  return rows;
}

export function generateBoard(size: number, bombRatio = 0.2): Board {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  populateWithBombsCount(b);
  return b;
}

export const populateWithBombs = (board: Board, bombRatio = 0.2) => {
  const allCells = board.flat();
  const nbBombs = Math.ceil(bombRatio * allCells.length);
  const indexes: number[] = [];
  while (indexes.length < nbBombs) {
    const randomIdx = Math.floor(Math.random() * allCells.length);
    if (!indexes.includes(randomIdx)) {
      allCells[randomIdx].val = "💣";
      indexes.push(randomIdx);
    }
  }
};

export function getNeighbors(board: Board, cell: Cell): Cell[] {
  const res: Cell[] = [];

  if (cell.x < board.length - 1) res.push(board[cell.y][cell.x + 1]); // right
  if (cell.x < board.length - 1 && cell.y < board.length - 1)
    res.push(board[cell.y + 1][cell.x + 1]); // right-down
  if (cell.y < board.length - 1) res.push(board[cell.y + 1][cell.x]); // down
  if (cell.x > 0 && cell.y < board.length - 1)
    res.push(board[cell.y + 1][cell.x - 1]); // left-down
  if (cell.x > 0) res.push(board[cell.y][cell.x - 1]); // left
  if (cell.x > 0 && cell.y > 0) res.push(board[cell.y - 1][cell.x - 1]); // left-up
  if (cell.y > 0) res.push(board[cell.y - 1][cell.x]); // up
  if (cell.y > 0 && cell.x < board.length - 1)
    res.push(board[cell.y - 1][cell.x + 1]); // right up

  return res;
}

export function populateWithBombsCount(board: Board) {
  board
    .flat()
    .filter((cell) => cell.val !== "💣")
    .forEach((cell) => {
      cell.val = "🤭" as any;
    });
}

export function revealCell(cell: Cell) {
  // Marque la cellule comme étant découverte.
}

export function getGameStatus(board: Board): gameStatus {
  // On a gagné lorsque toutes les cases qui ne contiennet pas de bombe sont découvertes.
  // On a perdu si une des cases contenant une bombe est découverte.
  // Sinon, le jeu continue.

  return "inProgress";
}
