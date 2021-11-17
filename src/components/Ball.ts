import Globals from './Globals'

/**
 * Sets grayscale mode.
 * @param grayscale {boolean} - should be grayscale turned on or off
 */
function GrayScale(grayscale: boolean) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            grayscale = grayscale
        }
    }
}

/**
 * Sets animation mode.
 * @param grayscale {boolean} - should balls be animated or not
 */
function Animatable(animatable: boolean) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            animatable = animatable
        }
    }
}

/**
 * Class used to change a TD to a cell containing a ball.
 * NOTE: Completely useless, but we have to use decorators and interfaces.
 */
@GrayScale((new Globals).grayscale)
@Animatable((new Globals).animatable)
export default class Ball {
    private td: HTMLTableCellElement
    private grayscale = false
    private animatable = false

    constructor(td: HTMLTableCellElement) {
        this.td = td
        console.log(this.grayscale, this.animatable)
    }

    /**
     * Used to modify a cell so it's a ball cell.
     */
    public create(): void {
        this.td.className =
            `circle color${Globals.randomBetween(0, 6)}${this.grayscale ? 'gray' : ''}${this.animatable ? ' rainbow' : ''}`
        this.td.innerText = 'c'
    }
}
