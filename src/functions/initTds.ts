/* eslint-disable require-jsdoc */
import Globals from '../components/Globals'

export default function initTds() {
    for (const cell of document.getElementsByTagName('td')) {
        if (cell.className === 'path') {
            cell.className = ''
        }

        if (
            Globals.animatable &&
            cell.innerText === 'c' &&
            cell.className.includes('rainbow')
        ) {
            cell.classList.toggle('rainbow')
        }
    }
}
