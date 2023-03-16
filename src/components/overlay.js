import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';
import * as eva from 'eva-icons';
import { arrayDefaults } from '../utilities/index.js';


/**
 * Overlay Component
 *
 * @param {*} [{
 * 	classPrefix = 'overlay',
 * 	status = 'open',
 * 	closeButton = false,
 * 	type = 'landing',
 * 	contents,
 * 	events,
 * }={}]
 */
const overlay = ({
	classPrefix = 'overlay',
	status = 'open',
	closeButton = false,
	type = 'landing',
	contents,
	events,
} = {}) => {
	let root_component = $('.' + classPrefix);

	/**
	 * Set the State of the OVerlay
	 *
	 * @param {*} [{ status = 'close' }={}]
	 */
	let setOverlayStatus = ({ status = 'close' } = {}) => {
		switch (status) {
			case 'open':
				$('.' + classPrefix).addClass('open');
				$('.' + classPrefix).removeClass('close');
				break;
			case 'close':
				$('.' + classPrefix).removeClass('open');
				$('.' + classPrefix).addClass('close');
				$('.' + classPrefix).html();
				break;
			default:
				$('.' + classPrefix).removeClass('open');
				$('.' + classPrefix).removeClass('close');
				$('.' + classPrefix).html();
				break;
		}
	};
	/**
	 * Set the content of the OVerlay
	 *
	 * @param {*} [{
	 * 		data = {
	 * 			title: 'Title',
	 * 			body: 'Body',
	 * 			list: [],
	 * 			footer: 'Footer',
	 * 		},
	 * 	}={}]
	 */
	let setContent = ({
		data = {
			title: 'Title',
			body: 'Body',
			list: [],
			footer: 'Footer',
		},
	} = {}) => {
		const template = {};
		for (let key of Object.keys(data)) {
			let val = Array.isArray(data[key]) ? data[key].join(' ') : data[key];
			if (typeof val === 'string') {
				template[key] = `<span class="${classPrefix}-${key}">${val}</span>`;
			}
			if (!['title', 'body', 'footer'].includes(key)) delete template[key];
		}
		$('.' + classPrefix).html();
		switch (type) {
			case 'landing':
				template.title = [
					template.title,
					...arrayDefaults(!!data?.subtitle, [
						`<span class="${classPrefix}-subtitle">${data.subtitle}</span>`,
					]),
				].join('\n');
				delete template.body;
				template.footer = `<a class='overlay-footer-button'>${data.footer}</a>`;
				break;
			case 'instructions':
				template.body = [
					data.body,
					`<ol class='list-menu'>${data.list
						.map((val) => `<li class='list-item'>${val}</li>`)
						.join('\n')}</ol>`,
				].join('\n');
				template.footer = `<a class='overlay-footer-button'>${data.footer}</a>`;
				break;
			case 'help':
				template.body = [
					data.body,
					`<ul class='list-menu'>${data.list
						.map((val) => `<li class='list-item'>${val}</li>`)
						.join('\n')}</ul>`,
				].join('\n');
				delete template.footer;
				break;
			case 'credits':
				template.body = [
					data.body,
					`<ul class='list-menu'>${data.list
						.map((val) => `<li class='list-item'>${val}</li>`)
						.join('\n')}</ul>`,
				].join('\n');
				delete template.footer;
				break;
			case 'details':
				delete template.footer;
				break;
			default:
				delete template.footer;
				break;
		}
		let result_component = [
			...arrayDefaults(
				closeButton,
				`<div class="${classPrefix}-close-button"><i data-eva="close-outline"></i></div>`
			),
			`<div class="${classPrefix}-container">
					${[
						...arrayDefaults(
							template.title,
							`<div class="${classPrefix}-header">${template.title}</div>`
						),
						...arrayDefaults(
							template.body,
							`<div class="overlay-body">${template.body}</div>`
						),
						...arrayDefaults(
							template.footer,
							`<div class="overlay-footer">${template.footer}</div>`
						),
					].join('\n')}</div>`,
		].join('\n');
		$('.' + classPrefix).html(result_component);
		eva.replace({
			height: '48px',
			width: '48px',
			animation: {
				type: 'pulse',
			},
		});
	};

	/**
	 * Set the Event Functionalities of the Overlay
	 *
	 * @param {*} {
	 * 		eventHandlers = {
	 * 			onClose: ($el) => {
	 * 				setOverlayStatus({ status: 'close' });
	 * 			},
	 * 			onClick: ($el) => {},
	 * 		},
	 * 	}
	 */
	let setFunctionality = ({
		eventHandlers = {
			onClose: ($el) => {
				setOverlayStatus({ status: 'close' });
			},
			onClick: ($el) => {},
		},
	}) => {
		switch (type) {
			case 'landing':
				$(`.${classPrefix}-footer-button`).on('click', ($el) => {
					setOverlayStatus({ status: 'close' });
					eventHandlers?.onClose($el)
				});
				break;
			case 'instructions':
				$(`.${classPrefix}-footer-button`).on('click', ($el) => {
					setOverlayStatus({ status: 'close' });
					eventHandlers?.onClose($el)
				});
				break;
			case 'help':
				break;
			case 'credits':
				break;
			case 'details':
				break;
			default:
				break;
		}
		$(`.${classPrefix}-close-button`).on('click', eventHandlers?.onClose);
	};

	/**
	 * Renders the Overlay Component 
	 *
	 */
	let run = () => {
		$(function () {
			setOverlayStatus({ status });
			setContent({ data: contents });
			setFunctionality({ eventHandlers: events });
		});
	};

	$(function () {
		setOverlayStatus({ status });
		setContent({ data: contents });
		setFunctionality({ eventHandlers: events });
	});
	root_component = $(classPrefix);
};

export default overlay;
