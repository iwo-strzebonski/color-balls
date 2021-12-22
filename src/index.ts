import HTMLFactory from './components/HTMLFactory'
import Globals from './components/Globals'
import '/public/style/style.css'
import '/public/style/colors.css'
import '/public/style/grayscale.css'
import '/public/style/rainbow.css'

/**
 * Yes, I decided to add JSDocs even for this constant.
 * @constant {HTMLFactory}
 */
const htmlFactory = new HTMLFactory(
    Globals.width,
    Globals.height,
    Globals.startingBalls
)

htmlFactory.render()
