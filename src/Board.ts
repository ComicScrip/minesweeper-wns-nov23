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
  // Remplis la grille avec des bombes placées aléatoirement
  // Il doit toujours y avoir au moins une bombe.
  // Le ratio est toujours entre 0 et 1.
  // exemple : avec un ratio de 0.2 et une grille de 5x5, il y aura 25x0.2 == 25/5 == 5 bombes
  // exemple : avec un ratio de 0.27 et une grille de 5x5, il y aura 25x0.27 == 7.25 (on arrondit à l'entier supérieur) donc 8 bombes.
};

export function getNeighbors(board: Board, cell: Cell): Cell[] {
  const res: Cell[] = [];

  if (cell.x < board.length - 1) res.push(board[cell.y][cell.x + 1]); // right
  if (cell.x < board.length - 1 && cell.y < board.length - 1)
    res.push(board[cell.y + 1][cell.x + 1]); // right-down

  // Prendre en compte les autres directions possibles...

  return res;
}

export function populateWithBombsCount(board: Board) {
  // Pour chaque cellule ne contenant pas de bombe
  // ajoute le nombre de bombes dans les cases voisines de la cellule
  // (le nombre de nombes doit etre assigné à la propriété "val" de la cellule)
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
