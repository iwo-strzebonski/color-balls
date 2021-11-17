import HTMLFactory from './components/HTMLFactory'
import Globals from './components/Globals'
import './style.css'

/**
 * Yes, I even decided to add JSDocs for this constant.
 * @constant {HTMLFactory}
 */
const htmlFactory = new HTMLFactory(
    Globals.width, Globals.height, Globals.startingBalls
)

htmlFactory.render()
