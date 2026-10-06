import { ColorModeContext, useMode } from './Themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './Scenes/global/Topbar';
import CustomSidebar from './Scenes/global/Sidebar';

import Dashboard from './Scenes/dashboard/Dashboard';
import Team from './Scenes/teams/Team';
import Contacts from './Scenes/contacts/Contacts';

import Invoices from './Scenes/invoices/Invoices';
import Bar from './Scenes/bar/Bar';
import Form from './Scenes/form/Form';
import Line from './Scenes/line/Line';
import Pie from './Scenes/PieChart/Pie';
import FAQ from './Scenes/faq/FAQ';
import Geography from './Scenes/geo/Geography';
import Calendar from './Scenes/calendars/Calendar';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className={`app ${'flex h-screen overflow-hidden'}`}>
					<CustomSidebar />
					<main
						className={`content ${'flex-grow h-full overflow-y-auto overflow-x-hidden'}`}
					>
						<Topbar />
						<Routes>
							<Route path="/" element={<Dashboard />} />

							<Route path="/team" element={<Team />} />

							<Route path="/contacts" element={<Contacts />} />
							<Route path="/invoices" element={<Invoices />} />
							<Route path="/form" element={<Form />} />
							<Route path="/bar" element={<Bar />} />
							<Route path="/pie" element={<Pie />} />
							<Route path="/line" element={<Line />} />
							<Route path="/faq" element={<FAQ />} />
							<Route path="/geography" element={<Geography />} />
							<Route path="/calendar" element={<Calendar />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
