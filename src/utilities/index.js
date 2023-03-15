const arrayDefaults = (bool = false, value) => (bool ? [value] : []);

const getResource = {
	images: (file_name, { path = '/src/assets/images' }) =>
		new URL(`${path}/${file_name}`, import.meta.url),
	svg: (file_name, { path = '/src/assets/svg' }) =>
		new URL(`${path}/${file_name}`, import.meta.url),
	audio: (file_name, { path = '/src/assets/audio' }) =>
		new URL(`${path}/${file_name}`, import.meta.url),
};

/**
 * Get the least value of prime numbers
 * @references https://stackoverflow.com/a/53643340
 *
 * @param {*} value
 * @return {*}
 */
const getSourcePrimeNumber = (
	value,
	{ type = 'min', condition = (n) => n }
) => {
	if (!isNaN(value)) {
		let factors = [];
		let divisor = 2;
		while (value >= 2) {
			if (value % divisor == 0) {
				factors.push(divisor);
				value = value / divisor;
			} else {
				divisor++;
			}
		}
		factors = factors.filter(condition);
		return type === 'max' ? Math.max(...factors) : Math.min(...factors);
	} else {
		return 0;
	}
};

export { arrayDefaults, getResource, getSourcePrimeNumber };
