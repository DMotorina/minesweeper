import './NumberDisplay.style.sass'

import React from 'react'

export const NumberDisplay: React.FC<{value: number}> = ({value}) => {
    
    return (
        <div className="numberDisplay classic--numberDisplay classic--numberDisplay">
            <span className="classic--numberDisplay__numbers">
                {value.toString().padStart(3, '0')}
            </span>
        </div>
    );
};