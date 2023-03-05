import React, { ReactFragment } from "react"
import smile from './smile.png'

export const test = {
    smile: './smile.png'
}

export const Smile: React.FC = () => {
    return <img src={smile} className='smile'/>
}