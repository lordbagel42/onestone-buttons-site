import { sequence } from '@sveltejs/kit/hooks';
import { handleErrorWithSentry, sentryHandle, initCloudflareSentryHandle } from '@sentry/sveltekit';
// import * as Sentry from '@sentry/sveltekit';

// Sentry.init({
// 	dsn: 'https://adaab9d987e3c19d3a2fd60849fc8744@o4507139426156544.ingest.us.sentry.io/4509359414247424',

// 	tracesSampleRate: 1.0

// 	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
// 	// spotlight: import.meta.env.DEV,
// });

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(
	initCloudflareSentryHandle({
		dsn: 'https://d46651ffea8e03dbf97198467979d024@o4507139426156544.ingest.us.sentry.io/4509347019227136',
		tracesSampleRate: 1.0
	}),
	sentryHandle()
);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
