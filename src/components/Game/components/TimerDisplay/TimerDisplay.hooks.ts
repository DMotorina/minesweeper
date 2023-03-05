import { useRef, useEffect } from 'react'

export const useInterval = <T>(callback: T, running: boolean) => {
    const savedCallback: any = useRef(null)
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (running) {
            let id = setInterval(tick, 1000)
            return () => clearInterval(id)
        }
    }, [running])
}