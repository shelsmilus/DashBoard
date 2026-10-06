import { memo, useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme, Box, Typography } from '@mui/material';
import { tokens } from '../../Themes';

const BarChart = ({ data = [], isDashboard = false }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const Theme = useMemo(
		() => ({
			axis: {
				domain: { line: { stroke: colors.grey[100] } },
				legend: { text: { fill: colors.grey[100], fontSize: 12 } },
				ticks: {
					line: { stroke: colors.grey[100], strokeWidth: 1 },
					text: { fill: colors.grey[100], fontSize: 11 },
				},
			},
			legends: { text: { fill: colors.grey[100] } },
			tooltip: {
				container: {
					background: colors.primary[400],
					color: colors.grey[100],
					borderRadius: '4px',
				},
			},
		}),
		[colors]
	);

	if (!data || data.length === 0) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="500px"
			>
				<Typography color={colors.grey[100]}>
					No data available
				</Typography>
			</Box>
		);
	}

	return (
		// Forcing a 500px height guarantees the chart will NOT collapse to 0px
		<Box style={{ height: '500px', width: '100%' }}>
			<ResponsiveBar
				data={data}
				keys={['hot dog', 'burger', 'kebab', 'donut']}
				indexBy="country"
				theme={Theme}
				// 2. Map the bar color dynamically to the *Color properties in mock data
				colors={({ id, data }) => String(data[`${id}Color`])}
				enableLabel={false}
				labelSkipWidth={6}
				labelSkipHeight={12}
				borderRadius={2}
				margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: isDashboard ? undefined : 'Country',
					legendPosition: 'middle',
					legendOffset: 32,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: isDashboard ? undefined : 'Sales',
					legendPosition: 'middle',
					legendOffset: -40,
				}}
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 120,
						translateY: 0,
						itemsSpacing: 2,
						itemWidth: 100,
						itemHeight: 20,
						itemDirection: 'left-to-right',
						itemOpacity: 0.85,
						symbolSize: 20,
						effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
					},
				]}
				role="application"
			/>
		</Box>
	);
};

export default memo(BarChart);
