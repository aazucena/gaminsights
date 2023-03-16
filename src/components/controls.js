import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';
import { getSourcePrimeNumber } from '../utilities/index.js';
import * as eva from 'eva-icons';
import reports from './reports.js';
import data from '/src/data/data.json';

/**
 * Function that set the offset value based on viewport size
 *
 * @param {*} width
 * @param {number} [value=1]
 * @return {*} 
 */
let setOffset = (width, value) => {
	switch (true) {
		case width <= 768:
			return 0;
		case width > 768 && width <= 1024:
			return 0;
		case width > 1024:
			return 0;
		default:
			return value;
	}
};
/**
 * Function that set the BackgroundPosition  Increment value based on viewport size
 *
 * @param {*} width
 * @param {number} [value=1]
 * @return {*} 
 */
let setBackgroundIncrement = (width, value = 1) => {
	switch (true) {
		case width <= 768:
			return 25;
		case width > 768 && width <= 1024:
			return 10;
		case width > 1024:
			return 1;
		default:
			return value;
	}
};

/**
 * Controls Component
 *
 * @param {*} [{
 * 	width = $(window).width(),
 * 	offset = 0,
 * }={}]
 */
const controls = ({
	width = $(window).width(),
	offset = 0,
} = {}) => {
	let total_sections = data.length;
	let current_section = 0;
	let offsetVal = setOffset(width);
	let widthView = width - offsetVal;
	let prevWidth = width;
	let factor = 10;
	let maxBGPosition = widthView / factor;
	let extra_bounds = 1000;

	let transition = {
		left: false,
		right: false,
	};
	let steps = {
		translateX: factor,
		backgroundPosition: setBackgroundIncrement(widthView),
	};
	let props = {
		translateX: 0,
		backgroundPosition: 0,
	};

	let counter = 0;
	/**
	 * Updates the values when moving left
	 *
	 */
	let moveLeft = () => {
		let translateX = props.translateX;
		let backgroundPosition = props.backgroundPosition;
		if (transition.right === true) {
			transition.left = transition.right;
		}
		if (transition.left === false) {
			if (current_section >= 0 && current_section < total_sections) {
				props.translateX =
					translateX > 0 && translateX <= widthView
						? translateX - steps.translateX
						: 0;
				transition.left = current_section > 0 && translateX === 0;
			}
			props.backgroundPosition =
				current_section === 0 ? 0 : props.backgroundPosition;
			transition.right = false;
		} else {
			let currentBGPosition = current_section * maxBGPosition;
			props.backgroundPosition =
				Math.abs(backgroundPosition) >= 0
					? backgroundPosition + steps.backgroundPosition
					: currentBGPosition;
			props.translateX =
				translateX <= widthView ? translateX + steps.translateX : widthView;
			transition.left = translateX <= widthView;
			transition.right = false;
			let sectionBoolean =
				current_section >= 0 &&
				transition.left &&
				Math.abs(backgroundPosition) > 0 &&
				maxBGPosition &&
				Math.abs(backgroundPosition) % maxBGPosition === 0;
			if (sectionBoolean) {
				current_section -= 1;
				reports({ item: data[current_section] });
			}
		}
		$('.nav-item.nav-rewind').show()
		$('.nav-item.nav-forward').show()
		
		if (current_section === 0) {
			$('.nav-item.nav-rewind').hide()
		}
		if (current_section === total_sections - 1) {
			$('.nav-item.nav-forward').hide()
		}
        console.log("🚀 ~ file: controls.js:162 ~ $ ~ props.translateX:", props.translateX, widthView)
		counter = counter - 1 > 0 ? counter - 1 : 0;
	};

	/**
	 * Updates the values when moving right
	 *
	 */
	let moveRight = () => {
		let translateX = props.translateX;
		let backgroundPosition = props.backgroundPosition;
		if (transition.right === false) {
			if (current_section >= 0 && current_section < total_sections) {
				props.translateX =
					translateX >= 0 && translateX <= widthView
						? translateX + steps.translateX
						: widthView;
				transition.right =
					translateX === widthView && current_section + 1 < total_sections;
			}
			transition.left = false;
			props.backgroundPosition =
				current_section + (1 % total_sections) === 0
					? (current_section + 1) * maxBGPosition
					: props.backgroundPosition;
		} else {
			let lookahead_section = current_section + 1;
			let currentBGPosition =
				lookahead_section === total_sections
					? lookahead_section * maxBGPosition
					: lookahead_section * maxBGPosition;
			props.backgroundPosition =
				backgroundPosition < currentBGPosition
					? backgroundPosition - steps.backgroundPosition
					: 0;
			props.translateX = translateX >= 0 ? translateX - steps.translateX : 0;
			transition.right = translateX >= 0;
			transition.left =
				current_section + 1 < total_sections ? !transition.right : false;
			let sectionBoolean =
				current_section + 1 < total_sections &&
				transition.right &&
				Math.abs(backgroundPosition) > 0 &&
				Math.abs(backgroundPosition) % maxBGPosition === 0;
			if (sectionBoolean) {
				current_section += 1;
				reports({ item: data[current_section] });
			}
		}
		$('.nav-item.nav-rewind').show()
		$('.nav-item.nav-forward').show()
		
		if (current_section === 0) {
			$('.nav-item.nav-rewind').hide()
		}
		if (current_section === total_sections - 1) {
			$('.nav-item.nav-forward').hide()
		}
        console.log("🚀 ~ file: controls.js:162 ~ $ ~ props.translateX:", props.translateX, widthView)
		counter =
			counter + 1 <= maxBGPosition * (total_sections - 1)
				? counter + 1
				: maxBGPosition * (total_sections - 1);
	};

	$(function () {
		$(window).resize(() => {
			width = $(window).width();
			offsetVal = setOffset(width);
			prevWidth = widthView;
			widthView = width - offsetVal;
			factor = 10;
			maxBGPosition = widthView / factor;
			steps = {
				translateX: factor,
				backgroundPosition: setBackgroundIncrement(widthView),
			};
			counter = Math.round(counter * (widthView / prevWidth));
			props.translateX = Math.round(props.translateX * (widthView / prevWidth));
		});
		let leftTimeout, rightTimeout;
		$('.nav-item.nav-left')
			.on('mousedown touchstart', (e) => {
				leftTimeout = setInterval(() => {
					moveLeft();
					anime({
						targets: '.space-invader',
						translateX: props.translateX,
						easing: 'linear',
						duration: 150,
						delay: 0,
					});
					anime({
						targets: '#app',
						backgroundPositionX: props.backgroundPosition,
						easing: 'linear',
						duration: 150,
						delay: 0,
					});
					$('.nav-item.nav-indicator').html(
						`<span>${data[current_section].title}</span>`
					);
				}, 5);
			})
			.bind('mouseup mouseleave touchend', (e) => {
				clearInterval(leftTimeout);
			});

		$('.nav-item.nav-right')
			.on('mousedown touchstart', (e) => {
				rightTimeout = setInterval(() => {
					moveRight();
					anime({
						targets: '.space-invader',
						translateX: props.translateX,
						easing: 'linear',
						duration: 150,
						delay: 0,
					});
					anime({
						targets: '#app',
						backgroundPositionX: props.backgroundPosition,
						easing: 'linear',
						duration: 150,
						delay: 0,
					});
					$('.nav-item.nav-indicator').html(
						`<span>${data[current_section].title}</span>`
					);
				}, 5);
			})
			.bind('mouseup mouseleave touchend', (e) => {
				clearInterval(rightTimeout);
			});

		$('.nav-item.nav-rewind').on('click', () => {
			current_section -= current_section - 1 >= 0 ? 1 : 0;
            transition = {
                left: false,
                right: false,
            }
			anime({
				targets: '.space-invader',
				translateX: 0,
				easing: 'linear',
				duration: 150,
				delay: 0,
			});
			$('.nav-item.nav-indicator').html(
				`<span>${data[current_section].title}</span>`
			);
            reports({ item: data[current_section] });

			$('.nav-item.nav-rewind').show()
			$('.nav-item.nav-forward').show()
			
			if (current_section === 0) {
				$('.nav-item.nav-rewind').hide()
			}
			if (current_section === total_sections - 1) {
				$('.nav-item.nav-forward').hide()
			}

		});
		$('.nav-item.nav-forward').on('click', () => {
			current_section += current_section + 1 < total_sections ? 1 : 0;
            transition = {
                left: false,
                right: false,
            }
			anime({
				targets: '.space-invader',
				translateX: 0,
				easing: 'linear',
				duration: 150,
				delay: 0,
			});
			$('.nav-item.nav-indicator').html(
				`<span>${data[current_section].title}</span>`
			);
            reports({ item: data[current_section] });
			$('.nav-item.nav-rewind').show()
			$('.nav-item.nav-forward').show()
			

			if (current_section === 0) {
				$('.nav-item.nav-rewind').hide()
			}
			if (current_section === total_sections - 1) {
				$('.nav-item.nav-forward').hide()
			}
		});
		document.onkeydown = (e) => {
			let code = e.key;
			switch (code) {
				case 'ArrowLeft': // left
				case 'a': // left
					moveLeft();
					break;

				case 'ArrowRight': // right
				case 'd': // right
					moveRight();
					break;

				default:
					break;
			}

			$('.nav-item.nav-indicator').html(
				`<span>${data[current_section].title}</span>`
			);
			anime({
				targets: '.space-invader',
				translateX: props.translateX,
				easing: 'linear',
				duration: 150,
				delay: 0,
			});
			anime({
				targets: '#app',
				backgroundPositionX: props.backgroundPosition,
				easing: 'linear',
				duration: 150,
				delay: 0,
			});
		};

		$('.nav-item.nav-indicator').html(
			`<span class="nav-indicator-text">${data[current_section].title}</span>`
		);
	});
};

export default controls;
