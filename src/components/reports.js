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

		if (item.reports.length > 0) {
			console.log(item.reports);

			let reports = item.reports
				.map(({ game }) => {
					let title = game.name.toLowerCase().replace(/\s+/gim, '_');
					return `<div class="${classPrefix}-card" id="${title}">
						<div class="${classPrefix}-card-title">${game.name}</div>
					</div>`;
				})
				.join('\n');
			console.log('🚀 ~ file: reports.js:27 ~ reports ~ reports:', reports);
			reports = `<div class="${classPrefix}-section-cards">
				<div class="${classPrefix}-section-cards-title">Games</div>
				<div class="${classPrefix}-cards-container">
				${reports}
				</div>
			</div>`;

			let contents = item.contents
				.map((content) => {
					let sub_title = content.title.toLowerCase().replace(/\s+/gim, '_');
					return `<div class="${classPrefix}-list-item" id="${sub_title}">
							<div class="${classPrefix}-list-value">${content.title}</div>
						</div>`;
				})
				.join('\n');
			contents = `<div class="${classPrefix}-section-list">
				<div class="${classPrefix}-section-list-title">Events</div>
				${contents}
			</div>`;

			let sections = [
				`<div class="${classPrefix}-section" id="${low_title}-description">
					<div class="${classPrefix}-section-content">${contents}</div>
				</div>`,
				`<div class="${classPrefix}-section" id="${low_title}-games">
				<div class="${classPrefix}-section-content">${reports}</div>
				</div>`,
			].join('\n');

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description"><span>${item.description}</span></div>`,
				`<div class="${classPrefix}-content">${sections}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			$(`.${classPrefix}-list-content`).hide();
		} else if (low_title === 'future') {
			let contents = item.contents
				.map((content) => {
					let sub_title = content.title.toLowerCase().replace(/\s+/gim, '_');
					return `<div class="${classPrefix}-list-item" id="${sub_title}">
							<div class="${classPrefix}-list-value">${content.title}</div>
						</div>`;
				})
				.join('\n');
			contents = `<div class="${classPrefix}-section-list">
				<div class="${classPrefix}-section-list-title">Events</div>
				${contents}
			</div>`;

			let sections = [
				`<div class="${classPrefix}-section" id="${low_title}-description">
					<div class="${classPrefix}-section-content">${contents}</div>
				</div>`,
			].join('\n');

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description"><span>${item.description}</span></div>`,
				`<div class="${classPrefix}-content">${sections}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			$(`.${classPrefix}-list-content`).hide();
		} else if (low_title === 'credits') {
			let references = item.references
				.map((reference) => {
					let sub_title = reference.title.toLowerCase().replace(/\s+/gim, '_');
					return `<div class="${classPrefix}-list-item" id="${sub_title}">
							<a class="${classPrefix}-list-value" href="${reference.url}">${reference.title}</a>
						</div>`;
				})
				.join('\n');
				references = `<div class="${classPrefix}-section-list">
				${references}
			</div>`;

			let sections = [
				`<div class="${classPrefix}-section" id="${low_title}-description">
					<div class="${classPrefix}-section-content">${references}</div>
				</div>`,
			].join('\n');

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description"><span>${item.description}</span></div>`,
				`<div class="${classPrefix}-content">${sections}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
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
			contents = `<div class="${classPrefix}-section-list">
				<div class="${classPrefix}-section-list-title">Events</div>
				${contents}
			</div>`;

			let sections = [
				`<div class="${classPrefix}-section" id="${low_title}-description">
					<div class="${classPrefix}-section-content">${contents}</div>
				</div>`,
			].join('\n');

			let template = [
				`<div class="${classPrefix}-title">${item.title}</div>`,
				`<div class="${classPrefix}-divider"><hr></div>`,
				`<div class="${classPrefix}-description"><span>${item.description}</span></div>`,
				`<div class="${classPrefix}-content">${sections}</div>`,
			].join('\n');
			template = `<div class="${classPrefix}">${template}</div>`;
			$('.info-body').html(template);
			// $(`.${classPrefix}-list-content`).hide()
		}
	});
};

export default report;
