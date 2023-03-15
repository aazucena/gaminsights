import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';
import * as eva from 'eva-icons';
import { arrayDefaults, getResource } from '../utilities/index.js';
import data from '/src/data/data.json';

const report = ({ classPrefix = 'report', item = data[0] }) => {
	let className = '.' + classPrefix;
	$('.info-body').html();
	$(function () {
		console.log(item);

		let low_title = item.title.toLowerCase();

		if (item.reports.length > 0 || low_title === 'future') {
			let contents = item.contents
				.map((content) => {
					let sub_title = content.title.toLowerCase().replace(/\s+/gim, '_');
					return `<div class="${classPrefix}-list-item" id="${sub_title}">
							<div class="${classPrefix}-list-title">${content.title}</div>
						</div>`;
				})
				.join('\n');
			contents = `<div class="${classPrefix}-section-list">${contents}</div>`;

			let sections = [
				`<div class="${classPrefix}-section" id="${low_title}-description">
					<div class="${classPrefix}-section-content">${contents}</div>
				</div>`,
			].join('\n');

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description">${item.description}</div>`,
				`<div class="${classPrefix}-content">${sections}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			$(`.${classPrefix}-list-content`).hide();
		} else if (low_title === 'credits') {

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description">${item.description}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			$(`.${classPrefix}-list-content`).hide();

		} else if (low_title === 'play again?') {

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			$(`.${classPrefix}-list-content`).hide();

		} else {
			let contents = item.contents
				.map((content) => {
					let sub_title = content.title.toLowerCase().replace(/\s+/gim, '_');
					return `<div class="${classPrefix}-list-item" id="${sub_title}">
							<div class="${classPrefix}-list-title">${content.title}</div>
							<div class="${classPrefix}-list-content">${content.content}</div>
						</div>`;
				})
				.join('\n');
			contents = `<div class="${classPrefix}-section-list">${contents}</div>`;

			let sections = [
				`<div class="${classPrefix}-section" id="${low_title}-description">
					<div class="${classPrefix}-section-content">${contents}</div>
				</div>`,
			].join('\n');

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description">${item.description}</div>`,
				`<div class="${classPrefix}-content">${sections}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			// $(`.${classPrefix}-list-content`).hide()
		}
	});
};

export default report;
