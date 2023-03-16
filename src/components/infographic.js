import $ from 'jquery'
import anime from 'animejs/lib/anime.es.js'
import * as eva from 'eva-icons'
import { arrayDefaults, getResource } from '../utilities/index.js'

/**
 * Infographic Component
 *
 * @param {*} { 
 *         classPrefix = 'info',
 *         defaultClass = 'infographic',
 *         visible = false,
 *     }
 */
const infographic = (
    { 
        classPrefix = 'info',
        defaultClass = 'infographic',
        visible = false,
    }
) => {
    
    $(function() {
        if (visible === true) {
            $('.'+defaultClass).show()
            anime({
                targets: '#app',
                backgroundColor : 'black',
                background: [
                    'black',
                    'linear-gradient(to top, rgba(0, 0, 0, 87.5%) 75%, rgba(0, 0, 0, 98.5%) 100%), url(https://www.nasa.gov/images/content/627360main_potw1209a.jpg)',
                ],
                backgroundSize: 'fit',
                backgroundBlendMode: 'multiply',
                easing: 'easeInCubic',
            })
            $('#app').css({ 'background' : '' })
        } else {
            $('.'+defaultClass).hide()
            $('#app').css({ 
                background : 'black',
            })
        }
    })
}

export default infographic