import './Game.style.sass'

import React, { useState, useReducer } from 'react'

import { MAX_COLS, MAX_ROWS, faceMap } from '@/constants'
import { Cell, CellState, CellValue, Face, ActionType } from '@/types'
import { generateCells, openMultipleCells } from '@/utils'

import { NumberDisplay } from './components/NumberDisplay/NumberDisplay.component'
import { TimerDisplay } from './components/TimerDisplay/TimerDisplay.component'
import { Grid } from './components/Grid/Grid.component'

import { reducer, IState } from './Game.reducer'

interface IAction {
    type: ActionType
    payload?: boolean | number | Cell[][] | Face
}

const initialState: IState = {
    live: false,
    newGame: true,
    hasWon: false,
    hasLost: false,
    face: Face.smile,
    timer: false,
};

export const Game: React.FC = () => {
    const [bombCounter, setBombCounter] = useState<number>(40)
    const [cells, setCells] = useState<Cell[][]>(generateCells())

    const [state, dispatch] = useReducer<
        React.Reducer<IState, IAction>
    >(reducer, initialState)

    const handleCellClick = (
        rowParam: number,
        colParam: number,
    ) => (): void => {
        let newCells = cells.slice();
        if (!state.live) {
            let isABomb =
                newCells[rowParam][colParam].value === CellValue.bomb;
            while (isABomb) {
                newCells = generateCells();
                if (
                    newCells[rowParam][colParam].value !==
                    CellValue.bomb
                ) {
                    isABomb = false;
                    break;
                }
            }
            dispatch({ type: ActionType.live, payload: true });
        }

        const currentCell = newCells[rowParam][colParam];

        if ([CellState.question, CellState.flagged, CellState.visible].includes(currentCell.state)) {
            return;
        }

        if (currentCell.value === CellValue.bomb) {
            newCells[rowParam][colParam].red = true;
            newCells = showAllBombs();

            setCells(newCells)
            dispatch({ type: ActionType.hasLost });
            return;
        } else if (currentCell.value === CellValue.none) {
            newCells = openMultipleCells(
                newCells,
                rowParam,
                colParam,
            );
        } else {
            newCells[rowParam][colParam].state = CellState.visible;
        }

        // Check to see if you have won
        let safeOpenCellsExists = false;
        for (let row = 0; row < MAX_ROWS; row++) {
            for (let col = 0; col < MAX_COLS; col++) {
                const currentCell = newCells[row][col];

                if (
                    currentCell.value !== CellValue.bomb &&
                    currentCell.state === CellState.open
                ) {
                    safeOpenCellsExists = true;
                    break;
                }
            }
        }

        if (!safeOpenCellsExists) {
            newCells = newCells.map(row =>
                row.map(cell => {
                    if (cell.value === CellValue.bomb) {
                        return {
                            ...cell,
                            state: CellState.flagged,
                        };
                    }
                    return cell;
                }),
            );
            dispatch({ type: ActionType.hasWon });
        }


        setCells(newCells)

    };

    const handleCellContext = (
        rowParam: number,
        colParam: number,
    ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (state.hasLost || state.hasWon) return;

        const currentCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        switch (currentCell.state) {
            case CellState.visible: {
                return
            }
            case CellState.open: {
                currentCells[rowParam][colParam].state = CellState.flagged;
                setCells(currentCells)
                setBombCounter(bombCounter - 1);
                break;
            }
            case CellState.flagged: {
                currentCells[rowParam][colParam].state = CellState.question;
                setCells(currentCells)
                dispatch({type: ActionType.cells});
                setBombCounter(bombCounter + 1);
                break;
            }
            case CellState.question: {
                currentCells[rowParam][colParam].state = CellState.open;
                setCells(currentCells)
                dispatch({type: ActionType.cells});
                break;
            }
        }
    };

    const handleFaceClick = (): void => {
        setCells(generateCells())
        dispatch({
            type: ActionType.newGame
        });
    };

    // handle mouse event
    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => dispatch({ type: ActionType.face, payload: Face.oh });

    const handleMouseUp = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => dispatch({ type: ActionType.face, payload: Face.smile });

    const showAllBombs = (): Cell[][] => {
        const currentCells = cells.slice();
        return currentCells.map(row =>
            row.map(cell => {
                if (cell.value === CellValue.bomb) {
                    return {
                        ...cell,
                        state: CellState.visible,
                    };
                }

                return cell;
            }),
        );
    };

    return (
        <div className="game classic">
            <div className="classic--header">
                <NumberDisplay value={bombCounter} />
                <button
                    className="classic--face"
                    aria-label="start/reset"
                    onClick={handleFaceClick}
                >
                    <img src={faceMap[state.face]} alt="face" className="face" />
                </button>
                <TimerDisplay live={state.live} timer={state.timer} />
            </div>
            <div className="classic--body">
                <Grid
                    disabled={state.hasLost}
                    state={cells}
                    onClick={state.hasLost || state.hasWon ? () => {} : handleCellClick}
                    onContext={handleCellContext}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            </div>
        </div>
    );
}