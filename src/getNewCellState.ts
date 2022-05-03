export function getNewCellState(
  currentCellState: number,
  numOfAliveNeighbours: number
) {
  if (
    (numOfAliveNeighbours === 2 && currentCellState === 1) ||
    numOfAliveNeighbours === 3
  ) {
    return 1;
  }
  return 0;
}
