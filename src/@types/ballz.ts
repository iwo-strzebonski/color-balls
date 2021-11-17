/**
 * Point type
 */
export type ligma = { x: number | null, y: number | null }

/**
 * Cell data type used for pathfinding
 */
export type deez = ligma & { num: number }


/**
 * Array of string/number arrays
 */
export type arrOfArrs = (string | number)[][]