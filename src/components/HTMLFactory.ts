import Globals from './Globals'
import { ligma, arrOfArrs, deez } from '../@types/ballz'
import BallGenerator from './BallGenerator'


/**
 * Used to render the map and the balls
 * @extends {BallGenerator} - class used to generate balls
 */
export default class HTMLFactory extends BallGenerator {
    private w: number
    private h: number

    constructor(width: number, height: number, startingBalls: number) {
        super()
        this.w = width
        this.h = height
        this.field = width * height
        this.toGenerate = startingBalls
    }

    /**
     * What should happen on table cell click.
     * @param {Event} e - onPress event
     */
    private tdPressed(e: Event): void {
        const table = <HTMLTableElement>document.getElementById('table')
        let td: HTMLTableCellElement = <HTMLTableCellElement>e.target
        let tr: HTMLTableRowElement = <HTMLTableRowElement>td.parentElement

        for (const cell of document.getElementsByTagName('td')) {
            if (cell.className === 'path') {
                cell.className = ''
            }
        }

        if (!Globals.pressed && td.innerText === '') {
            td.innerText = 'w'
            td.className = 'wall'
        } else if (!Globals.pressed && td.innerText === 'w') {
            td.innerText = ''
            td.className = ''
        } else if (!Globals.pressed && td.innerText === 'c') {
            Globals.source.x = td.cellIndex
            Globals.source.y = tr.rowIndex
            Globals.pressed++
        } else if (Globals.pressed === 1) {
            if (!td.innerText) {
                Globals.target.x = td.cellIndex
                Globals.target.y = tr.rowIndex
                Globals.pressed++
            } else if (td.innerText === 'c') {
                Globals.source.x = td.cellIndex
                Globals.source.y = tr.rowIndex
            }
        }

        if (Globals.pressed === 2) {
            let src: ligma = Globals.source
            let trg: ligma = Globals.target

            let tabA: arrOfArrs = []

            for (let y = 0; y < this.h; y++) { tabA.push([]) }
            for (let y = 0; y < this.h; y++) { for (let x = 0; x < this.w; x++) { tabA[x].push('') } }

            for (const row of table.rows) {
                for (const cell of row.cells) {
                    const contains: 
                    | string
                    | number =
                        !table.rows[row.rowIndex].cells[cell.cellIndex].innerText
                            ? 0
                            : table.rows[row.rowIndex].cells[cell.cellIndex].innerText

                    tabA[row.rowIndex][cell.cellIndex] = contains
                }
            }

            tabA[src.y!][src.x!] = 's'
            tabA[trg.y!][trg.x!] = 'm'

            let posList: ligma[] = [
                {x: src.x, y: src.y! - 1},
                {x: src.x, y: src.y! + 1},
                {x: src.x! - 1, y: src.y},
                {x: src.x! + 1, y: src.y}
            ]

            for (const pos of posList) {
                if (
                    table.rows[pos.y!] && table.rows[pos.y!].cells[pos.x!] &&
                    !table.rows[pos.y!].cells[pos.x!].innerText
                ) {
                    tabA[pos.y!][pos.x!] = 1
                }
            }

            let c = 1
            let flag: Boolean = true
            let found: Boolean = false

            while (flag) {
                let list: string[] = []

                for (let y = 0; y < this.h; y++) {
                    for (let x = 0; x < this.w; x++) {
                        if (tabA[y][x] === c) {
                            if (
                                (y - 1 >= 0 && y - 1 < this.h) &&
                                (x >= 0 && x < this.w) &&
                                !list.some(a => a == (y - 1) + '_' + x)
                            ) { list.push((y - 1) + '_' + x) }
                            if (
                                (y + 1 >= 0 && y + 1 < this.h) &&
                                (x >= 0 && x < this.w) &&
                                !list.some(a => a == (y + 1) + '_' + x)
                            ) { list.push((y + 1) + '_' + x) }
                            if (
                                (y >= 0 && y < this.h) &&
                                (x - 1 >= 0 && x - 1 < this.w) &&
                                !list.some(a => a == y + '_' + (x - 1))
                            ) { list.push(y + '_' + (x - 1)) }
                            if (
                                (y >= 0 && y < this.h) &&
                                (x + 1 >= 0 && x + 1 < this.w) &&
                                !list.some(a => a == y + '_' + (x + 1))
                            ) { list.push(y + '_' + (x + 1)) }
                        }
                    }
                }

                if (c > 81) {
                    flag = false
                    break
                }

                list.forEach(pos => {
                    if (parseInt(pos.split('_')[0]) >= 0 && parseInt(pos.split('_')[1]) >= 0) {
                        const y: number = parseInt(pos.split('_')[0])
                        const x: number = parseInt(pos.split('_')[1])
                        if ((tabA[y][x] === 'm')) {
                            flag = false
                            found = true
                        } else if (!tabA[y][x]) {
                            tabA[y][x] = c + 1
                        }
                    }
                })

                list = []
                c++
            }

            tabA.forEach((tab, y) => {
                tab.forEach((el, x) => {
                    if (!table.rows[y].cells[x].innerText) {
                        table.rows[y].cells[x].innerText = el.toString()
                    }
                })
            })

            let point: ligma = trg

            c = 0
            while (found) {
                c++
                const arr: deez[] = []
                let x: number = point.x!
                let y: number = point.y!

                y--

                if (
                    table.rows[y] && table.rows[y].cells[x] &&
                    table.rows[y].cells[x].innerText.match('[0-9]') &&
                    (y >= 0 && y - 1 < this.h) &&
                    (x >= 0 && x < this.w)
                ) {
                    arr.push({
                        y: y,
                        x: x,
                        num: parseInt(table.rows[y].cells[x].innerText)
                    })
                }

                y += 2

                if (
                    table.rows[y] && table.rows[y].cells[x] &&
                    table.rows[y].cells[x].innerText.match('[0-9]') &&
                    (y >= 0 && y - 1 < this.h) &&
                    (x >= 0 && x < this.w)
                ) {
                    arr.push({
                        y: y,
                        x: x,
                        num: parseInt(table.rows[y].cells[x].innerText)
                    })
                }

                x--
                y--

                if (
                    table.rows[y] && table.rows[y].cells[x] &&
                    table.rows[y].cells[x].innerText.match('[0-9]') &&
                    (y >= 0 && y - 1 < this.h) &&
                    (x >= 0 && x < this.w)
                ) {
                    arr.push({
                        y: y,
                        x: x,
                        num: parseInt(table.rows[y].cells[x].innerText)
                    })
                }

                x += 2

                if (
                    table.rows[y] && table.rows[y].cells[x] &&
                    table.rows[y].cells[x].innerText.match('[0-9]') &&
                    (y >= 0 && y - 1 < this.h) &&
                    (x >= 0 && x < this.w)
                ) {
                    arr.push({
                        y: y,
                        x: x,
                        num: parseInt(table.rows[y].cells[x].innerText)
                    })
                }

                let min: deez = { x: 0, y: 0, num: 50 }

                for (const pos of arr) {
                    if (pos.num > 0) {
                        min = (min.num < pos.num) ? min : pos
                    }
                }

                table.rows[min.y!].cells[min.x!].className = 'path'

                point = min
                if (min.num == 1 || c > 50) { break }
            }

            if (found) {
                const sourceCell = table.rows[Globals.source.y!].cells[Globals.source.x!]
                const targetCell = table.rows[Globals.target.y!].cells[Globals.target.x!]

                targetCell.innerText = 'c'
                targetCell.className = sourceCell.className
                sourceCell.innerText = ''
                sourceCell.className = 'path'
            }

            for (const row of table.rows) {
                for (const cell of row.cells) {
                    if (
                        cell.innerText.match('[0-9]') ||
                        cell.innerText === 'm'
                    ) { cell.innerText = '' }
                }
            }

            Globals.source.x = null
            Globals.source.y = null
            Globals.target.x = null
            Globals.target.y = null

            Globals.pressed = 0
        }
    }

    /**
     * Creates a table cell element.
     * @returns {HTMLTableCellElement} Created table cell element.
     */
    private createElementTD(): HTMLTableCellElement {
        let td: HTMLTableCellElement = document.createElement('td')

        td.addEventListener('click', this.tdPressed.bind(this))

        this.generateBalls(td)

        return td
    }

    /**
     * Creates a table row element.
     * @returns {HTMLTableRowElement} Created table row element.
     */
    private createElementTR(yParam: number): HTMLTableRowElement {
        let tr: HTMLTableRowElement = document.createElement('tr')

        for (let x = 0; x < this.w; x++) {
            let td: HTMLTableCellElement = this.createElementTD()
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
        let table: HTMLTableElement = document.createElement('table')
        table.id = 'table'

        for (let y = 0; y < this.h; y++) {
            table.append(this.createElementTR(y))
        }

        return table
    }

    /**
     * Renders the table.
     */
    public render(): void {
        document.body.appendChild(this.createElementTable())
    }
}
