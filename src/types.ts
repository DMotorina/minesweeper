export enum CellValue {
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb,
}
export enum CellState {
    open,
    visible,
    flagged,
    question
}
export type Cell = {
    value: CellValue;
    state: CellState;
    red?: boolean;
};

export enum Face {
    smile = "smile", 
    oh = 'oh',
    lost = 'lost',
    won = 'won',
}

export enum ActionType {
    hasWon = 'HAS_WON',
    hasLost = 'HAS_LOST',
    cells = 'CELLS',
    newGame = 'NEWGAME',
    live = 'LIVE',
    face = 'FACE',
}