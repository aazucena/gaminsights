import controls from './components/controls.js'
import overlay from './components/overlay.js'
import navbar from './components/navbar.js'
import infographic from './components/infographic.js'
import * as eva from 'eva-icons'

eva.replace({
	height: '48px',
	width: '48px',
	animation: {
		type: 'pulse',
	},
})
infographic({ visible: false })
navbar({
	items: [
        {
            name: 'volume',
            url: null,
            icon: 'volume-up-outline',
            weight: 1,
        },
        {
            name: 'help',
            url: null,
            icon: 'question-mark-circle-outline',
            weight: 2,
        },
        {
            name: 'settings',
            url: null,
            icon: 'settings-2-outline',
            weight: 3,
        },

	]
})
controls()
overlay({ 
	type: 'landing', 
	status: 'open',
	contents: {
		'title': 'GamInsights',
		'subtitle': 'Historical Insights and Analytics of Video Games',
		'footer': 'Start',
	},
	events: {
		onClose: $el => {
			overlay({ 
				status: 'open',
				type: 'instructions', 
				contents: {
					'title': 'Instructions',
					'body': 'Here is how you navigate through infographic.',
					'list': [
						'On desktop, use either the left or right arrow keys or WA keys to navigate',
						'On mobile, use the arrow buttons below to navigate',
					],
					'footer': 'Play',
				},
				events: {
					onClose: $el => {
						setOverlayStatus({ status: 'close' })
						infographic({ visible: true })
					}
				}
			})
		}
	}
})
