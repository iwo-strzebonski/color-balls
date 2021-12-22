/* eslint-disable require-jsdoc */
import Globals from '../components/Globals'
import IArrOfArrs from '../interfaces/IArrOfArrs'

import { deez, ligma } from '../@types/ballz'
import ballRemover from '../functions/ballRemover'

export default class PathFinder {
    private readonly w: number
    private readonly h: number
    private found = false

    constructor(w: number, h: number) {
        this.w = w
        this.h = h
    }

    public main(table: HTMLTableElement): void {
        this.findPath(table)
        this.checkPath(table)

        this.purgePath(table)
    }

    private generatePath(
        h: number,
        w: number,
        c: number,
        arr: IArrOfArrs
    ): string[] {
        const list: string[] = []

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (arr[y][x] !== c) {
                    continue
                }
                if (this.posCheck(x, y - 1, h, w, list)) {
                    list.push(y - 1 + '_' + x)
                }
                if (this.posCheck(x, y + 1, h, w, list)) {
                    list.push(y + 1 + '_' + x)
                }
                if (this.posCheck(x - 1, y, w, h, list)) {
                    list.push(y + '_' + (x - 1))
                }
                if (this.posCheck(x + 1, y, w, h, list)) {
                    list.push(y + '_' + (x + 1))
                }
            }
        }

        return list
    }

    private findPath(table: HTMLTableElement): void {
        const arr: IArrOfArrs = this.createArr(table)

        let c = 1

        do {
            const list: string[] = this.generatePath(this.h, this.w, c, arr)

            list.forEach((pos) => {
                if (
                    parseInt(pos.split('_')[0]) >= 0 &&
                    parseInt(pos.split('_')[1]) >= 0 &&
                    parseInt(pos.split('_')[0]) < this.w &&
                    parseInt(pos.split('_')[1]) < this.h
                ) {
                    const y: number = parseInt(pos.split('_')[0])
                    const x: number = parseInt(pos.split('_')[1])

                    if (arr[y][x] === 'm') {
                        this.found = true
                    } else if (!arr[y][x]) {
                        arr[y][x] = c + 1
                    }
                }
            })
            c++
        } while (!this.found && c <= 81)

        arr.forEach((tab, y) => {
            tab.forEach((el, x) => {
                if (!table.rows[y].cells[x].innerText) {
                    table.rows[y].cells[x].innerText = el.toString()
                }
            })
        })
    }

    // eslint-disable-next-line complexity
    private checkPath(table: HTMLTableElement): void {
        let point: ligma = Globals.target
        let c = 0

        while (this.found) {
            c++
            const arr: deez[] = []
            let x: number = point.x
            let y: number = point.y

            y--

            if (
                table.rows[y] &&
                table.rows[y].cells[x] &&
                table.rows[y].cells[x].innerText.match('[0-9]') &&
                y >= 0 &&
                y - 1 < this.h &&
                x >= 0 &&
                x < this.w
            ) {
                arr.push({
                    y: y,
                    x: x,
                    num: parseInt(table.rows[y].cells[x].innerText)
                })
            }

            y += 2

            if (
                table.rows[y] &&
                table.rows[y].cells[x] &&
                table.rows[y].cells[x].innerText.match('[0-9]') &&
                y >= 0 &&
                y - 1 < this.h &&
                x >= 0 &&
                x < this.w
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
                table.rows[y] &&
                table.rows[y].cells[x] &&
                table.rows[y].cells[x].innerText.match('[0-9]') &&
                y >= 0 &&
                y - 1 < this.h &&
                x >= 0 &&
                x < this.w
            ) {
                arr.push({
                    y: y,
                    x: x,
                    num: parseInt(table.rows[y].cells[x].innerText)
                })
            }

            x += 2

            if (
                table.rows[y] &&
                table.rows[y].cells[x] &&
                table.rows[y].cells[x].innerText.match('[0-9]') &&
                y >= 0 &&
                y - 1 < this.h &&
                x >= 0 &&
                x < this.w
            ) {
                arr.push({
                    y: y,
                    x: x,
                    num: parseInt(table.rows[y].cells[x].innerText)
                })
            }

            let min: deez = { x: 0, y: 0, num: 50 }

            for (const pos of arr) {
                if (pos.num <= 0) {
                    continue
                }

                min = min.num < pos.num ? min : pos
            }

            table.rows[min.y].cells[min.x].className = 'path'

            point = min
            if (min.num == 1 || c > 50) {
                break
            }
        }

        if (this.found && Globals.pressed === 2) {
            Globals.shouldGenerateNew = true
            this.moveBall(table)
            ballRemover(table)
        }
    }

    private purgePath(table: HTMLTableElement): void {
        for (const row of table.rows) {
            for (const cell of row.cells) {
                if (cell.innerText.match('[0-9]') || cell.innerText === 'm') {
                    cell.innerText = ''
                }
            }
        }

        this.found = false

        if (Globals.pressed === 2) {
            Globals.pressed = 0
            Globals.source.x = -1
            Globals.source.y = -1
            Globals.target.x = -1
            Globals.target.y = -1
        }
    }

    private moveBall(table: HTMLTableElement): void {
        if (Globals.pressed === 2) {
            const src = table.rows[Globals.source.y].cells[Globals.source.x]
            const trg = table.rows[Globals.target.y].cells[Globals.target.x]

            trg.innerText = 'c'
            trg.className = src.className
            src.innerText = ''
            src.className = 'path'
        }
    }

    private posCheck(
        x: number,
        y: number,
        w: number,
        h: number,
        list: string[]
    ): boolean {
        return (
            y >= 0 &&
            y < h &&
            x >= 0 &&
            x < w &&
            !list.some((a) => a === y + '_' + x)
        )
    }

    private createArr(table: HTMLTableElement): IArrOfArrs {
        const arr: IArrOfArrs = []

        for (let y = 0; y < this.h; y++) {
            arr.push([])
        }

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                arr[x].push('')
            }
        }

        for (const row of table.rows) {
            for (const cell of row.cells) {
                const contains = !table.rows[row.rowIndex].cells[
                    cell.cellIndex
                ].innerText
                    ? 0
                    : table.rows[row.rowIndex].cells[cell.cellIndex].innerText

                arr[row.rowIndex][cell.cellIndex] = contains
            }
        }

        return this.initPos(table, arr)
    }

    private initPos(table: HTMLTableElement, arr: IArrOfArrs): IArrOfArrs {
        const out = arr

        const src: ligma = Globals.source
        const trg: ligma = Globals.target

        out[src.y][src.x] = 's'
        out[trg.y][trg.x] = 'm'

        const posList: ligma[] = [
            { x: src.x, y: src.y - 1 },
            { x: src.x, y: src.y + 1 },
            { x: src.x - 1, y: src.y },
            { x: src.x + 1, y: src.y }
        ]

        for (const pos of posList) {
            if (
                table.rows[pos.y] &&
                table.rows[pos.y].cells[pos.x] &&
                !table.rows[pos.y].cells[pos.x].innerText &&
                !out[pos.y][pos.x]
            ) {
                out[pos.y][pos.x] = 1
            }
        }

        return out
    }
}
