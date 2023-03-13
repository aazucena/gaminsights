import $ from 'jquery'

import anime from 'animejs/lib/anime.es.js'
let total_sections = 8
let current_section = 0
let maxBGPosition = 216
let extra_bounds = 1000
let transition = {
	left: false,
	right: false,
}
let steps = {
	translateX: 10,
	backgroundPosition: 1,
}
let props = {
    translateX: 0,
		backgroundPosition: 0,
}

$(function() {
    document.onkeydown = (e) => {
			let code = e.keyCode || e.which
			let translateX = props.translateX
			let backgroundPosition = props.backgroundPosition
			switch(code) {
					case 37: // left
					if (transition.right === true) {
						transition.left = transition.right
					}
					if (transition.left === false) {
						if (current_section > 0 && current_section < total_sections) {
							props.translateX = (translateX > 0 && translateX <= 2160) ? translateX - steps.translateX : 0
							transition.left = (current_section > 0 && translateX === 0)
						} 
						props.backgroundPosition = (current_section === 0) ? 0 : props.backgroundPosition
						transition.right = false
					} else {

							let currentBGPosition = (current_section)*maxBGPosition
							props.backgroundPosition = (Math.abs(backgroundPosition) >= 0) ? backgroundPosition + steps.backgroundPosition : currentBGPosition
							props.translateX = (translateX <= 2160) ? translateX + steps.translateX : 2160
							transition.left = translateX <= 2160
							transition.right = false
							current_section -= current_section >= 0 && transition.left && Math.abs(backgroundPosition) > 0 && maxBGPosition &&  Math.abs(backgroundPosition) % maxBGPosition === 0 ? 1 : 0
					}
						break
	
					case 39: // right
					if (transition.right === false) {
						if (current_section >= 0 && current_section < total_sections) {
							props.translateX = (translateX >= 0 && translateX <= 2160) ? translateX + steps.translateX : 2160
							transition.right = translateX === 2160 && current_section+1 < total_sections
						} 
						transition.left = false
						props.backgroundPosition = (current_section+1 % total_sections === 0) ? (current_section + 1)*maxBGPosition : props.backgroundPosition
					} else {
							let lookahead_section = current_section + 1
							let currentBGPosition = lookahead_section === total_sections ? lookahead_section*maxBGPosition : lookahead_section*maxBGPosition
							props.backgroundPosition = (backgroundPosition < currentBGPosition) ? backgroundPosition - steps.backgroundPosition : 0
							props.translateX = (translateX >= 0) ? translateX - steps.translateX : 0
							transition.right = translateX >= 0
							transition.left = current_section+1 < total_sections ? !transition.right : false
							current_section += current_section+1 < total_sections && transition.right && Math.abs(backgroundPosition) > 0 && Math.abs(backgroundPosition) % maxBGPosition === 0 ? 1 : 0
					}
						break
	
					default: 
						break
			}
			console.log(props, current_section, transition)
			anime({
					targets: '.space-invader',
					translateX: props.translateX,
					easing: 'linear',
					duration: 150,
					delay: 0,
			})
			anime({
					targets: '#app',
					backgroundPositionX: backgroundPosition,
					easing: 'linear',
					duration: 150,
					delay: 0,
			})
    }
})
