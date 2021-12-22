import Globals from './Globals'

import BallGenerator from './BallGenerator'
import toggleTd from '../functions/toggleTd'
import initTds from '../functions/initTds'

import PathFinder from '../core/PathFinder'

/**
 * Used to render the map and the balls
 * @extends {BallGenerator} - class used to generate balls
 */
export default class HTMLFactory extends BallGenerator {
    private w: number
    private h: number
    private pathFinder: PathFinder

    constructor(width: number, height: number, startingBalls: number) {
        super()
        this.w = width
        this.h = height
        this.field = width * height
        this.toGenerate = startingBalls

        this.pathFinder = new PathFinder(width, height)
    }

    private tdHover(e: Event): void {
        const table = <HTMLTableElement>document.getElementById('table')
        const td = <HTMLTableCellElement>e.target
        const tr = <HTMLTableRowElement>td.parentElement

        if (Globals.pressed === 1) {
            initTds()
            toggleTd(tr, td, false)

            if (td.innerText) {
                return
            }

            td.classList.add('path')

            this.pathFinder.main(table)
        }
    }

    /**
     * What should happen on table cell click.
     * @param {Event} e - onPress event
     */
    private tdPressed(e: Event): void {
        const table = <HTMLTableElement>document.getElementById('table')
        const td = <HTMLTableCellElement>e.target
        const tr = <HTMLTableRowElement>td.parentElement

        initTds()
        toggleTd(tr, td, true)

        if (Globals.pressed === 2) {
            this.pathFinder.main(table)

            if (Globals.shouldGenerateNew) {
                this.field = this.w * this.h
                this.toGenerate = 3

                if (
                    document.getElementsByClassName('circle').length >=
                    this.field - this.toGenerate
                ) {
                    alert(`You lost!\nScore${Globals.score}`)
                    location.reload()
                    return
                }

                for (const row of table.rows) {
                    for (const cell of row.cells) {
                        if (!cell.innerText) {
                            this.generateBalls(cell)
                        } else {
                            this.field--
                        }
                    }
                }

                Globals.shouldGenerateNew = false
            }
        }
    }

    /**
     * Creates a table cell element.
     * @returns {HTMLTableCellElement} Created table cell element.
     */
    private createElementTD(): HTMLTableCellElement {
        const td: HTMLTableCellElement = document.createElement('td')

        td.addEventListener('click', this.tdPressed.bind(this))
        td.addEventListener('mouseover', this.tdHover.bind(this))

        this.generateBalls(td)

        return td
    }

    /**
     * Creates a table row element.
     * @returns {HTMLTableRowElement} Created table row element.
     */
    private createElementTR(yParam: number): HTMLTableRowElement {
        const tr: HTMLTableRowElement = document.createElement('tr')

        for (let x = 0; x < this.w; x++) {
            const td: HTMLTableCellElement = this.createElementTD()
            td.id = yParam + '_' + x
            tr.appendChild(td)
        }

        return tr
    }

    /**
     * Creates a table element.
     * @returns {HTMLTableElement} Created table element.
     */
    private createElementTable(): HTMLTableElement {
        const table: HTMLTableElement = document.createElement('table')
        table.id = 'table'

        for (let y = 0; y < this.h; y++) {
            table.append(this.createElementTR(y))
        }

        return table
    }

    private createPreviewTable(): HTMLTableElement {
        const preview: HTMLTableElement = document.createElement('table')
        const tr: HTMLTableRowElement = document.createElement('tr')

        for (let b = 0; b < 3; b++) {
            const td: HTMLTableCellElement = document.createElement('td')
            td.id = `ball_${b}`
            this.generatePreview(td)
            tr.append(td)
        }

        preview.id = 'preview'
        preview.append(tr)

        return preview
    }

    /**
     * Renders the table.
     */
    public render(): void {
        document.body.appendChild(this.createPreviewTable())
        document.body.appendChild(this.createElementTable())
    }
}
