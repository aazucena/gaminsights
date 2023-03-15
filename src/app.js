import $ from 'jquery';
import * as eva from 'eva-icons';

import controls from './components/controls.js';
import overlay from './components/overlay.js';
import navbar from './components/navbar.js';
import infographic from './components/infographic.js';
import reports from './components/reports.js';

eva.replace({
	height: '48px',
	width: '48px',
	animation: {
		type: 'pulse',
	},
});
infographic({ visible: false });
// navbar({
// 	items: [
// 		{
// 			name: 'help',
// 			url: null,
// 			icon: 'question-mark-circle-outline',
// 			weight: 1,
// 		},
// 	],
// });
controls({});
reports({});
overlay({
	type: 'landing',
	status: 'open',
	contents: {
		title: 'GamInsights',
		subtitle: 'Historical Insights and Analytics of Video Games',
		footer: 'Start',
	},
	events: {
		onClose: ($el) => {
			setOverlayStatus({ status: 'close' });
			infographic({ visible: true });
		},
	},
});
