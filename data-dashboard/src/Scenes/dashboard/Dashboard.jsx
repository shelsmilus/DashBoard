import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../Themes';
import Header from '../../components/header/Header';
import StartBox from '../../components/startbox/StartBox';

// Chart & Data Imports
import { mockTransactions } from '../../Data/Mockdata';
import { mockBarData } from '../../Data/Mockdata';
import { mockLineData } from '../../Data/Mockdata';
import { mockPieData } from '../../Data/Mockdata';
import { mockGeographyData } from '../../Data/Mockdata';
import BarChart from '../../components/barchart/BarChart';
import LineChart from '../../components/linechart/LineChart';
import PieChart from '../../components/piechart/PieChart';
import GeoMap from '../../components/geo-map/GeoMap';
import ProgressCircle from '../../components/progresscircle/ProgressCircle';

// Icons
import DownloadOutlineIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const handleDownload = () => {
		console.log('Downloading reports...');
	};

	const statMetrics = [
		{
			title: '12,361',
			subtitle: 'Emails Sent',
			progress: '0.75',
			increase: '+14%',
			icon: (
				<EmailIcon
					sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
				/>
			),
		},
		{
			title: '431,225',
			subtitle: 'Sales Obtained',
			progress: '0.50',
			increase: '+21%',
			icon: (
				<PointOfSaleIcon
					sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
				/>
			),
		},
		{
			title: '32,441',
			subtitle: 'New Clients',
			progress: '0.30',
			increase: '+5%',
			icon: (
				<PersonAddIcon
					sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
				/>
			),
		},
		{
			title: '1,325,134',
			subtitle: 'Traffic Received',
			progress: '0.80',
			increase: '+43%',
			icon: (
				<TrafficIcon
					sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
				/>
			),
		},
	];

	return (
		<Box className="m-5 pb-10">
			{/* HEADER ROW */}
			<Box className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
				<Header title="DASHBOARD" subtitle="Welcome To The Dashboard" />
				<Button
					onClick={handleDownload}
					startIcon={<DownloadOutlineIcon />}
					sx={{
						backgroundColor: colors.blueAccent[700],
						color: colors.grey[100],
						fontSize: '14px',
						fontWeight: 'bold',
						padding: '10px 20px',
						transition: 'all 0.2s ease',
						'&:hover': { backgroundColor: colors.blueAccent[800] },
					}}
				>
					Download Reports
				</Button>
			</Box>

			<Box className="grid grid-cols-12 gap-5">
				{statMetrics.map((stat, index) => (
					<Box
						key={index}
						className="col-span-12 sm:col-span-6 lg:col-span-3 flex items-center justify-center py-6 rounded-md shadow-sm"
						sx={{ backgroundColor: colors.primary[400] }}
					>
						<StartBox
							title={stat.title}
							subtitle={stat.subtitle}
							progress={stat.progress}
							increase={stat.increase}
							icon={stat.icon}
						/>
					</Box>
				))}

				{/* Line Chart */}
				<Box
					className="col-span-12 lg:col-span-8 p-6 mx-3 rounded-md shadow-sm"
					sx={{ backgroundColor: colors.primary[400] }}
				>
					<Box className="flex justify-between items-center mb-4">
						<Box>
							<Typography
								variant="h5"
								fontWeight="600"
								color={colors.grey[100]}
							>
								Revenue Generated
							</Typography>
							<Typography
								variant="h3"
								fontWeight="bold"
								color={colors.greenAccent[500]}
							>
								$59,342.32
							</Typography>
						</Box>
						<IconButton>
							<DownloadOutlineIcon
								sx={{
									fontSize: '26px',
									color: colors.greenAccent[500],
								}}
							/>
						</IconButton>
					</Box>
					<Box height="250px" mt="-20px">
						<LineChart data={mockLineData} isDashboard={true} />
					</Box>
				</Box>

				{/* Transactions List */}
				<Box
					className="col-span-12 lg:col-span-4 mx-3 rounded-md shadow-sm overflow-hidden flex flex-col"
					sx={{
						backgroundColor: colors.primary[400],
						height: '400px',
					}}
				>
					<Box
						className="p-4 border-b"
						sx={{ borderColor: colors.primary[500] }}
					>
						<Typography
							variant="h5"
							fontWeight="600"
							color={colors.grey[100]}
						>
							Recent Transactions
						</Typography>
					</Box>

					{/* Scrollable Container */}
					<Box className="overflow-y-auto flex-grow">
						{mockTransactions.map((transaction, i) => (
							<Box
								key={`${transaction.txId}-${i}`}
								className="flex justify-between items-center p-4 border-b"
								sx={{ borderColor: colors.primary[500] }}
							>
								<Box>
									<Typography
										color={colors.greenAccent[500]}
										variant="h6"
										fontWeight="600"
									>
										{transaction.txId}
									</Typography>
									<Typography color={colors.grey[100]}>
										{transaction.user}
									</Typography>
								</Box>
								<Box color={colors.grey[100]}>
									{transaction.date}
								</Box>
								<Box
									className="p-1 px-3 rounded"
									sx={{
										backgroundColor:
											colors.greenAccent[500],
									}}
								>
									${transaction.cost}
								</Box>
							</Box>
						))}
					</Box>
				</Box>

				{/* Progress Circle (Campaign) */}
				<Box
					className="col-span-12 sm:col-span-6 lg:col-span-2 p-6 rounded-md shadow-sm flex flex-col md:mx-0 mx-4 flex items-center justify-center"
					sx={{
						backgroundColor: colors.primary[400],
						height: '340px',
					}}
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ mb: '10px' }}
					>
						Campaign
					</Typography>
					<Box
						className="flex flex-col items-center justify-center "
						flexGrow={1}
					>
						<ProgressCircle size="125" />
						<Typography
							variant="h5"
							color={colors.greenAccent[500]}
							sx={{ mt: '15px' }}
							textAlign="center"
						>
							$48,352 revenue generated
						</Typography>
						<Typography variant="body2" textAlign="center">
							Includes extra misc expenditures and costs
						</Typography>
					</Box>
				</Box>

				{/* Bar Chart */}
				<Box
					className="col-span-12 sm:col-span-10 lg:col-span-6 p-3 rounded-md shadow-sm flex flex-col mx-2"
					sx={{ backgroundColor: colors.primary[400] }}
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ mb: '15px' }}
					>
						Sales Quantity
					</Typography>
					<Box height="200px" flexGrow="1">
						<BarChart data={mockBarData} isDashboard={true} />
					</Box>
				</Box>

				{/* Pie Chart */}
				<Box
					height="75vh"
					border={`1px solid ${colors.grey[100]}`}
					borderRadius="4px"
					className="col-span-12 sm:col-span-8 lg:col-span-4 p-3 mx-1 rounded-md shadow-sm flex flex-col"
					sx={{ backgroundColor: colors.primary[400] }}
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ mb: '15px' }}
					>
						Market Share
					</Typography>
					<Box height="200px" flexGrow="1">
						<PieChart data={mockPieData} isDashboard={true} />
					</Box>
				</Box>

				{/* Geography map */}
				<Box
					height="75vh"
					border={`1px solid ${colors.grey[100]}`}
					borderRadius="4px"
					className="col-span-12 p-6 rounded-md shadow-sm flex flex-col"
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ mb: '10px' }}
					>
						Geography Traffic
					</Typography>
					<Box>
						<GeoMap data={mockGeographyData} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
