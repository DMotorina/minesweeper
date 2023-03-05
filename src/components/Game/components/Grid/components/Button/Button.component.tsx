import './Button.style.sass'

import cx from 'classnames';
import React from 'react'

import { CellState, CellValue } from '@/types'

import flag from '../../../../../../../assets/img/flag.png'
import bomb from '../../../../../../../assets/img/bomb.png'
import question from '../../../../../../../assets/img/question.png'

interface ButtonProps {
    col: number
    row: number
    red?: boolean
    disabled?: boolean
    state: CellState
    value: CellValue
    onClick( rowParam: number, colParam: number ): (...args: any[]) => void
    onMouseDown: (...args: any[]) => void
    onMouseUp: (...args: any[]) => void
    onContext( rowParam: number, colParam: number ): (...args: any[]) => void
}

export const Button: React.FC<ButtonProps> = ({
    col,
    onClick,
    onContext,
    red,
    row,
    state,
    value,
    onMouseDown,
    onMouseUp,
    disabled,
}) => {
    const renderContent = (): React.ReactNode => {
        if (state === CellState.visible && value !== CellValue.bomb) {
            return value === CellValue.none ? null : value
        }

        if (state === CellState.visible) {
            return (
                <img src={bomb} alt="bomb" className='bomb' />
            )
        }

        if (state === CellState.flagged) {
            return (
                <img src={flag} alt="flag" className='flag' />
            )
        }

        if (state === CellState.question) {
            return (
                <img src={question} alt="question" className='question' />
            )
        }

        return null
    }

    const classes = cx(
        'classic--button',
        {'classic--button__visible': state === CellState.visible},
        `value-${value}`,
        {'classic--button__red': red}
    )

    return (
        <button
            aria-label={`BUTTON row: ${row}, column: ${col}`}
            className={classes}
            onClick={onClick(row, col)}
            onContextMenu={onContext(row, col)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            disabled={disabled}
        >
            {renderContent()}
        </button>
    )
}