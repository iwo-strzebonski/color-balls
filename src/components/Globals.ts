import { ligma } from '../@types/ballz'
import RandomBetween from '../interfaces/IRandomBetween'

/**
 * Everything which should be available in every context.
 * NOTE: Yes, that interface is useless, but it has to be there.
 * @implements {IBallSpecials}
 */
export default class Globals {
    static score = 0
    static shouldGenerateNew = false
    static pressed = 0
    static source: ligma = { x: -1, y: -1 }
    static target: ligma = { x: -1, y: -1 }

    static readonly count = 3
    static readonly width = 9
    static readonly height = 9
    static readonly startingBalls = 3

    static readonly grayscale = true
    static readonly animatable = true

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
