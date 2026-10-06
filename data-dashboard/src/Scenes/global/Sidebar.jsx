import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../Themes';

// Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

import profileLogo from '../../assets/sidebar-Img/profile image.jfif';

// Reusable navigation item component
const NavItem = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={selected === title}
			style={{ color: colors.grey[100] }}
			onClick={() => setSelected(title)}
			icon={icon}
			component={<Link to={to} />}
		>
			<Typography>{title}</Typography>
		</MenuItem>
	);
};

const CustomSidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState('Dashboard'); // Capitalized to match your NavItem titles

	// Styling configuration for react-pro-sidebar (v1+)
	const menuItemStyles = {
		button: {
			color: `${colors.grey[100]} !important`,
			padding: '5px 35px 5px 20px !important',
			backgroundColor: 'transparent',
			'&:hover': {
				color: '#858df0 !important',
				backgroundColor: 'transparent !important', // Prevents ugly gray box on hover
			},
			// Targets the active class natively
			'&.ps-active': {
				color: '#6870fa !important',
			},
		},
		icon: {
			backgroundColor: 'transparent !important',
		},
	};

	return (
		<Box
			sx={{
				// CRITICAL FIXES FOR DASHBOARD LAYOUT:
				// 1. Forces the sidebar to span the exact height of the user's screen
				height: '100vh',
				// 2. Makes it "stick" to the left while the right-side dashboard scrolls
				position: 'sticky',
				top: 0,
				// 3. Removes default borders from pro-sidebar
				'& .ps-sidebar-container': {
					backgroundColor: 'transparent !important',
				},
				'& .ps-sidebar-root': {
					border: 'none',
				},
			}}
		>
			<Sidebar
				collapsed={isCollapsed}
				// Let react-pro-sidebar control its own widths to preserve collapse animations
				backgroundColor={colors.primary[400]}
				style={{ height: '100%' }}
			>
				<Menu closeOnClick menuItemStyles={menuItemStyles}>
					{/* HEADER / LOGO TOGGLE */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box className="flex items-center justify-between">
								<Typography
									variant="h5"
									color={colors.grey[100]}
									fontWeight="bold"
								>
									OSbibi-Data
								</Typography>
								<IconButton
									onClick={() => setIsCollapsed(!isCollapsed)}
								>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{/* USER PROFILE SECTION */}
					{!isCollapsed && (
						<Box className="mb-6 flex flex-col items-center justify-center">
							<Box className="flex items-center justify-center">
								<Avatar
									alt="Profile"
									src={profileLogo}
									sx={{
										width: 85,
										height: 85,
										border: `2px solid ${colors.grey[700]}`,
									}}
								/>
							</Box>

							<Box className="flex flex-col items-center justify-center mt-3 text-center">
								<Typography
									variant="h3"
									color={colors.grey[100]}
									fontWeight="bold"
								>
									Real ~ Osbibi
								</Typography>
								<Typography
									variant="body2" // Fixed: MUI doesn't have an "h7" variant
									className="text-green-700 px-2 py-1 mt-1 rounded-md bg-green-100 font-bold text-xs"
								>
									VP Admin
								</Typography>
							</Box>
						</Box>
					)}

					{/* MENU ITEMS */}
					<Box paddingLeft={isCollapsed ? undefined : '10%'}>
						<NavItem
							title="Dashboard"
							to="/"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant="body2"
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Data
						</Typography>
						<NavItem
							title="Manage Team"
							to="/team"
							icon={<PeopleOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="Contacts Information"
							to="/contacts"
							icon={<ContactsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="Invoices Balances"
							to="/invoices"
							icon={<ReceiptOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant="body2"
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Pages
						</Typography>
						<NavItem
							title="Profile Form"
							to="/form"
							icon={<PersonOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="Calendar"
							to="/calendar"
							icon={<CalendarTodayOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="FAQ Page"
							to="/faq"
							icon={<HelpOutlineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant="body2"
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Charts
						</Typography>
						<NavItem
							title="Bar Chart"
							to="/bar"
							icon={<BarChartOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="Pie Chart"
							to="/pie"
							icon={<PieChartOutlineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="Line Chart"
							to="/line"
							icon={<TimelineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<NavItem
							title="Geography Chart"
							to="/geography"
							icon={<MapOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</Sidebar>
		</Box>
	);
};

export default CustomSidebar;
