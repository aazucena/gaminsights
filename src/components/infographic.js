import $ from 'jquery'
import anime from 'animejs/lib/anime.es.js'
import * as eva from 'eva-icons'
import { arrayDefaults } from '../utilities/index.js'


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
        } else {
            $('.'+defaultClass).hide()
        }
    })
}

export default infographic