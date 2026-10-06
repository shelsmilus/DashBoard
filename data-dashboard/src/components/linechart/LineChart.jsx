import { memo, useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme, Box, Typography } from '@mui/material';
import { tokens } from '../../Themes';

const LineChart = ({
	data = [],
	isDashboard = false,
	xLabel = 'Transportation',
	yLabel = 'Count',
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// 1. Theme Configuration: Ensures grid lines, axes, tooltips, and crosshairs match light/dark mode
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
			grid: {
				line: {
					stroke: colors.primary[300] || '#333',
					strokeWidth: 1,
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
			crosshair: {
				line: {
					stroke: colors.grey[100],
					strokeWidth: 1,
					strokeDasharray: '6 6',
				},
			},
		}),
		[colors]
	);

	// 2. Defensive Programming: Gracefully handle missing or loading data
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
		// 3. Layout  Setting an explicit height prevents Nivo SVG from collapsing to 0px
		<Box style={{ height: '500px', width: '100%' }}>
			<ResponsiveLine
				data={data}
				theme={Theme}
				// 4.  Uses the custom color from data if available, else falls back to nivo scheme
				colors={
					data[0]?.color ? { datum: 'color' } : { scheme: 'nivo' }
				}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				yScale={{
					type: 'linear',
					min: 'auto',
					max: 'auto',
					stacked: true,
					reverse: false,
				}}
				curve="catmullRom"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: isDashboard ? undefined : xLabel,
					legendPosition: 'middle',
					legendOffset: 36,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: isDashboard ? undefined : yLabel,
					legendPosition: 'middle',
					legendOffset: -40,
				}}
				enableGridX={false}
				enableGridY={true}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'seriesColor' }}
				pointLabelYOffset={-12}
				enableTouchCrosshair={true}
				useMesh={true}
				legends={
					isDashboard
						? []
						: [
								{
									anchor: 'bottom-right',
									direction: 'column',
									justify: false,
									translateX: 100,
									translateY: 0,
									itemsSpacing: 0,
									itemDirection: 'left-to-right',
									itemWidth: 80,
									itemHeight: 20,
									itemOpacity: 0.75,
									symbolSize: 12,
									symbolShape: 'circle',
									symbolBorderColor: 'rgba(0, 0, 0, .5)',
									itemTextColor: colors.grey[100],
									effects: [
										{
											on: 'hover',
											style: {
												itemBackground:
													'rgba(0, 0, 0, .03)',
												itemOpacity: 1,
											},
										},
									],
								},
							]
				}
			/>
		</Box>
	);
};

export default memo(LineChart);
