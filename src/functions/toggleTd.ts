/* eslint-disable require-jsdoc */
import Globals from '../components/Globals'

// eslint-disable-next-line complexity
export default function toggleTd(
    tr: HTMLTableRowElement,
    td: HTMLTableCellElement,
    increment: boolean
) {
    const table = <HTMLTableElement>document.getElementById('table')

    if (td.id.includes('ball')) {
        return
    }

    if (!Globals.pressed && td.innerText === 'c') {
        Globals.source.x = td.cellIndex
        Globals.source.y = tr.rowIndex
        Globals.pressed++

        if (Globals.animatable && increment) {
            td.classList.toggle('rainbow')
        }
    } else if (Globals.pressed === 1) {
        if (!td.innerText) {
            Globals.target.x = td.cellIndex
            Globals.target.y = tr.rowIndex

            if (increment) {
                Globals.pressed++
            } else if (Globals.animatable) {
                table.rows[Globals.source.y].cells[
                    Globals.source.x
                ].classList.toggle('rainbow')
            }
        } else if (td.innerText === 'c') {
            if (
                td.cellIndex === Globals.source.x &&
                tr.rowIndex === Globals.source.y &&
                increment
            ) {
                Globals.source.x = -1
                Globals.source.y = -1
                Globals.pressed = 0
            } else if (increment) {
                Globals.source.x = td.cellIndex
                Globals.source.y = tr.rowIndex
                if (Globals.animatable) {
                    td.classList.toggle('rainbow')
                }
            }
        }
    }
}
