import React, { useEffect, useState } from "react"

import { NumberDisplay } from '../NumberDisplay/NumberDisplay.component'
import { useInterval } from "./TimerDisplay.hooks"


export const TimerDisplay: React.FC<{live: boolean, timer: boolean}> = ({live , timer}) => {
    const [time, setTime] = useState<number>(0);

    useInterval(() => {
        if (live && time < 999) {
            setTime(time + 1)
        }
    }, live);

    useEffect(() => {
        setTime(0);
    }, [timer])

    return <NumberDisplay value={time} />
}