import Ball from './Ball'
import Globals from './Globals'

/**
 * Used to generate balls in table cells.
 * NOTE: It's here because the `protected` keyword is required in this project.
 */
export default class BallGenerator {
    protected toGenerate = 0
    field = 0

    /**
     * Tries to generate a ball in a table cell.
     * @param td {HTMLTableCellElement} - table cell to modify
     */
    protected generateBalls(td: HTMLTableCellElement): void {
        const random = Globals.randomBetween({
            min: 0, max: this.field - 1
        })

        if (random < this.toGenerate) {
            const ball = new Ball(td)
            ball.create()

            this.toGenerate--
        }

        this.field--
    }
}
