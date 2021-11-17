import { ligma } from '../@types/ballz'
import IBallSpecials from '../api/IBallSpecials'
import RandomBetween from '../api/IRandomBetween'


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

    readonly grayscale = false
    readonly animatable = true

    /** 
     * Generate a random number in range (inclusive).
     * @param {number} min - lower range
     * @param {number} max - higher range
     * @returns {number} Pseudo-random integer.
     */
    static randomBetween(nums: RandomBetween): number {
        return Math.floor(Math.random() * (nums.max - nums.min + 1) + nums.min)
    }
}
