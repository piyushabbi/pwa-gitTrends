/**
 * staticFileGlobs takes an array of file patterns which we want to cache.
 * Simpler because we don't have to list all the files, but the patterns.
 */

const name = 'PWA-Demo-v1';

module.exports = {
	staticFileGlobs: [
		'./index.html',
		'./images/*.{png,svg,gif,jpg}',
		'./fonts/**/*.{woff,woff2}',
		'./js/*.js',
		'./css/*.css',
		'https://fonts.googleapis.com/icon?family=Material+Icons'
	],
	stripPrefix: '.',
	// Run time cache
	runtimeCaching: [
		{
			urlPattern: /https:\/\/api\.github\.com\/search\/repositories/,
			handler: 'networkFirst',
			options: {
				cache: {
					name: name
				}
			}
		}
	]
};
