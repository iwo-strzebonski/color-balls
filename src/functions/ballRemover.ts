/* eslint-disable require-jsdoc */
import Globals from '../components/Globals'

// eslint-disable-next-line complexity
export default function ballRemover(table: HTMLTableElement): void {
    const movedBall = table.rows[Globals.target.y].cells[Globals.target.x]
    const className = movedBall.className
    let removedBalls: HTMLTableCellElement[] = []

    const nutDeleter = (index1: number, index2: number): void => {
        let balls = 1

        for (let i = 0; i < removedBalls.length - 1; i++) {
            if (
                parseInt(removedBalls[i].id[index1]) + 1 ===
                    parseInt(removedBalls[i + 1].id[index1]) &&
                parseInt(removedBalls[i].id[index2]) + 1 ===
                    parseInt(removedBalls[i + 1].id[index2])
            ) {
                balls++
            } else {
                balls = 0
                removedBalls = []
                break
            }
        }

        if (balls === Globals.count) {
            Globals.shouldGenerateNew = false
            Globals.score += balls * 100

            for (const i in removedBalls) {
                removedBalls[i].className = ''
                removedBalls[i].id = ''
                removedBalls[i].innerText = ''
            }
        }

        removedBalls = []
    }

    for (const row of table.rows) {
        for (const cell of row.cells) {
            if (
                cell.cellIndex > movedBall.cellIndex - Globals.count &&
                cell.cellIndex < movedBall.cellIndex + Globals.count &&
                cell.className === className
            ) {
                removedBalls.push(cell)
            }
        }
    }

    nutDeleter(0, 0)

    // movedBall.className = className

    for (const row of table.rows) {
        for (const cell of row.cells) {
            if (
                (<HTMLTableRowElement>cell.parentElement).rowIndex >
                    (<HTMLTableRowElement>movedBall.parentElement).rowIndex -
                        Globals.count &&
                (<HTMLTableRowElement>cell.parentElement).rowIndex <
                    (<HTMLTableRowElement>movedBall.parentElement).rowIndex +
                        Globals.count &&
                cell.className === className
            ) {
                removedBalls.push(cell)
            }
        }
    }

    nutDeleter(2, 2)

    // movedBall.className = ''

    const score = <HTMLSpanElement>document.getElementById('score')
    score.innerText = Globals.score.toString()
}
