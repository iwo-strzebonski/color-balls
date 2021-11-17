import HTMLFactory from './components/HTMLFactory'
import Globals from './components/Globals'
import './style/style.css'
import './style/colors.css'
import './style/grayscale.css'
import './style/rainbow.css'

/**
 * Yes, I even decided to add JSDocs for this constant.
 * @constant {HTMLFactory}
 */
const htmlFactory = new HTMLFactory(
    Globals.width, Globals.height, Globals.startingBalls
)

htmlFactory.render()
