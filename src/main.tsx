import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.ts'
import './shared/styles/variables/color.css'

Sentry.init({
	dsn: 'https://YOUR_DSN_KEY.ingest.sentry.io/PROJECT_ID',

	integrations: [
		Sentry.browserTracingIntegration(), // замість BrowserTracing
		Sentry.replayIntegration(), // опційно: запис сесій користувачів
	],

	// 100% запитів для дебага — на проді ставлять 0.1 або 0.2
	tracesSampleRate: 1.0,

	replaysSessionSampleRate: 0.1, // 10% сесій
	replaysOnErrorSampleRate: 1.0, // 100% коли сталася помилка
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			{/* <ErrorBoundary> */}
			<App />
			{/* </ErrorBoundary> */}
		</Provider>
	</StrictMode>
)
