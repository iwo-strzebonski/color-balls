import { ligma } from '../@types/ballz'
import IBallSpecials from '../api/IBallSpecials'

/**
 * Everything which should be available in every context.
 * NOTE: Yes, that interface is useless, but it has to be there.
 * @implements {IBallSpecials}
 */
export default class Globals implements IBallSpecials {
    static pressed = 0
    static source: ligma = { x: -1, y: -1 }
    static target: ligma = { x: -1, y: -1 }

    static readonly width = 9
    static readonly height = 9
    static readonly startingBalls = 3

    grayscale = false
    animatable = false

    /** 
     * Generate a random number in range (inclusive).
     * @param {number} min - lower range
     * @param {number} max - higher range
     * @returns {number} Pseudo-random integer.
     */
    static randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
