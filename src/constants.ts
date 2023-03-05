import { Face } from "./types"

import smile from '../assets/img/smile.png'
import oh from '../assets/img/oh.png'
import lost from '../assets/img/lost.png'
import won from '../assets/img/won.png'

export const MAX_ROWS = 16;
export const MAX_COLS = 16;
export const NO_OF_BOMBS = 40;

export const faceMap = {
    [Face.smile]: smile,
    [Face.oh]: oh,
    [Face.lost]: lost,
    [Face.won]: won,
}