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
        const preview = <HTMLTableElement>document.getElementById('preview')
        const random = Globals.randomBetween({
            min: 0,
            max: this.field - 1
        })

        if (random < this.toGenerate) {
            const ball = preview.rows[0].cells[3 - this.toGenerate]
            td.className = ball.className
            td.innerText = ball.innerText
            this.generatePreview(preview.rows[0].cells[3 - this.toGenerate])

            this.toGenerate--
        }

        this.field--
    }

    protected generatePreview(td: HTMLTableCellElement): void {
        const ball = new Ball(td)
        ball.create()
    }
}
