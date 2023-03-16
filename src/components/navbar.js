import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';
import * as eva from 'eva-icons';
import { arrayDefaults } from '../utilities/index.js';

/**
 * Navbar Component
 *
 * @param {*} {
 * 	items = [
 * 		{
 * 			name: 'settings',
 * 			url: null,
 * 			icon: 'settings-2-outline',
 * 			weight: 1,
 * 		},
 * 	],
 * }
 */
const navbar = ({
	items = [
		{
			name: 'settings',
			url: null,
			icon: 'settings-2-outline',
			weight: 1,
		},
	],
}) => {
	$(function () {
		$('.info-main').html();

		let nav_items = [];

		for (let item of items.sort((a, b) => a.weight - b.weight)) {
			nav_items.push(
				`<div class="nav-item" id="${item.name}"><i data-eva="${item.icon}"></i></div>`
			);
		}

		let template = `
    <div class="navbar">
      <div class="nav-menu">
        ${nav_items.join('\n')}
      </div>
    </div>`;

		$('.info-main').html(template);
		eva.replace({
			height: '48px',
			width: '48px',
			animation: {
				type: 'pulse',
			},
		});
		for (let item of items.sort((a, b) => a.weight - b.weight)) {
			$('#' + item.name).on('click', ($el) => {
				switch (item.name) {
					case 'volume':
						let state_icon = $(`#${item.name} > i > svg`)
							.attr('class')
							.split(' ')[1]
							.replace('eva-', '');
						console.log(
							'🚀 ~ file: navbar.js:46 ~ $ ~ state_icon:',
							state_icon
						);
						if (state_icon === 'volume-up-outline') {
							$('#' + item.name).html();
							$('#' + item.name).html(`<i data-eva="volume-off"></i>`);
						} else {
							$('#' + item.name).html();
							$('#' + item.name).html(`<i data-eva="volume-up-outline"></i>`);
						}
						eva.replace({
							height: '48px',
							width: '48px',
							animation: {
								type: 'pulse',
							},
						});
						break;
					default:
						break;
				}
			});
		}
	});
};

export default navbar;
