import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './components/Home'
import EditableTable from './components/Table'

function AppRoutes() {
	const location = useLocation()

	return (
		<ErrorBoundary key={location.pathname}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/table' element={<EditableTable />} />
			</Routes>
		</ErrorBoundary>
	)
}

function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}

export default App
