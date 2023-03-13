import $ from 'jquery'
import anime from 'animejs/lib/anime.es.js'
import randomColor from 'randomcolor'
import * as eva from 'eva-icons'

eva.replace({
	height: '48px',
	width: '48px',
	animation: {
    type: 'pulse', 
  }
})

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

let counter = 0

$(function() {
	let widthView = (screen.height < screen.width ?  screen.height : screen.width)* 2
	console.log("🚀 ~ file: app.js:38 ~ widthView:", widthView)
	let leftTimeout, rightTimeout
	$('.nav-item.nav-left').on('mousedown touchstart', (e) => {
		leftTimeout = setInterval(() => {
			let translateX = props.translateX
			let backgroundPosition = props.backgroundPosition
			if (transition.right === true) {
				transition.left = transition.right
			}
			if (transition.left === false) {
				if (current_section >= 0 && current_section < total_sections) {
					props.translateX = (translateX > 0 && translateX <= widthView) ? translateX - steps.translateX : 0
					transition.left = (current_section > 0 && translateX === 0)
				} 
				props.backgroundPosition = (current_section === 0) ? 0 : props.backgroundPosition
				transition.right = false
			} else {
	
					let currentBGPosition = (current_section)*maxBGPosition
					props.backgroundPosition = (Math.abs(backgroundPosition) >= 0) ? backgroundPosition + steps.backgroundPosition : currentBGPosition
					props.translateX = (translateX <= widthView) ? translateX + steps.translateX : 2160
					transition.left = translateX <= widthView
					transition.right = false
					current_section -= current_section >= 0 && transition.left && Math.abs(backgroundPosition) > 0 && maxBGPosition &&  Math.abs(backgroundPosition) % maxBGPosition === 0 ? 1 : 0
			}
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
		counter = counter - 1 > 0 ? counter - 1 : 0
		$('.nav-item.nav-indicator').html(`<span>${current_section+1}</span>`)
		console.log(current_section, counter)
		}, 25)
	}).bind('mouseup mouseleave touchend', (e) => {
		clearInterval(leftTimeout)
	})
	$('.nav-item.nav-right').on('mousedown touchstart', (e) => {
		rightTimeout = setInterval(() => {
			let translateX = props.translateX
			let backgroundPosition = props.backgroundPosition
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
		counter = counter + 1 <= 216 * (total_sections - 1) ? counter + 1 : 216 * (total_sections - 1)
		$('.nav-item.nav-indicator').html(`<span>${current_section+1}</span>`)
		console.log(current_section, counter)
	}, 25)
	}).bind('mouseup mouseleave touchend', (e) => {
		clearInterval(rightTimeout)
	})

	document.onkeydown = (e) => {
		let code = e.key
		let translateX = props.translateX
		let backgroundPosition = props.backgroundPosition

		
		switch(code) {
				case "ArrowLeft": // left
				case "a": // left
					if (transition.right === true) {
						transition.left = transition.right
					}
					if (transition.left === false) {
						if (current_section >= 0 && current_section < total_sections) {
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
					counter = counter - 1 >= 0 ? counter - 1 : 0
					console.log(current_section, counter)
					break

				case "ArrowRight": // right
				case "d": // right
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
					counter = counter + 1 < 216 * (total_sections - 1) ? counter + 1 : 216 * (total_sections - 1)
					console.log(current_section, counter)
					break

				default: 
					break
		}

		$('.nav-item.nav-indicator').html(`<span>${current_section+1}</span>`)
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
	$('.nav-item.nav-indicator').html(`<span>${current_section+1}</span>`)

})
