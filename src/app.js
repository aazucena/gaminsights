import $ from 'jquery';
import * as eva from 'eva-icons';

import controls from './components/controls.js';
import overlay from './components/overlay.js';
import infographic from './components/infographic.js';
import reports from './components/reports.js';

/// Initialize EVA Icons Component 
eva.replace({
	height: '48px',
	width: '48px',
	animation: {
		type: 'pulse',
	},
});

/// Initialize the Infographic COmponent
infographic({ visible: false });

/// Initialize the Controls COmponent
controls({});

/// Initialize the Reports COmponent
reports({});

/// Initialize the Overlay COmponent
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
			infographic({ visible: true });
		},
	},
});
