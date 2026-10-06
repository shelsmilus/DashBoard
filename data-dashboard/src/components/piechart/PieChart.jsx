import { memo, useMemo } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTheme, Box, Typography } from '@mui/material';
import { tokens } from '../../Themes';

const Pie = ({
	data = [],
	isDashboard = false,
	// A prop to customize this from the parent
	centerLabel = 'Total Volume',
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const total = useMemo(() => {
		return data.reduce((acc, current) => acc + current.value, 0);
	}, [data]);

	const Theme = useMemo(
		() => ({
			axis: {
				domain: { line: { stroke: colors.grey[100] } },
				legend: { text: { fill: colors.grey[100] } },
				ticks: {
					line: { stroke: colors.grey[100], strokeWidth: 1 },
					text: { fill: colors.grey[100] },
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

	//  custom layer with a group <g> and a second <text> element
	const CenteredMetric = ({ centerX, centerY }) => {
		return (
			<g>
				<text
					x={centerX}
					y={centerY - 10} // Shifted up slightly
					textAnchor="middle"
					dominantBaseline="central"
					style={{
						fontSize: '28px',
						fontWeight: '600',
						fill: colors.grey[100],
					}}
				>
					{total}
				</text>
				<text
					x={centerX}
					y={centerY + 20} // Shifted down below the number
					textAnchor="middle"
					dominantBaseline="central"
					style={{
						fontSize: '14px',
						fontWeight: '400',
						fill: colors.grey[100],
						opacity: 0.7, // Dimmed slightly for visual hierarchy
					}}
				>
					{centerLabel}
				</text>
			</g>
		);
	};

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
		<Box style={{ height: '500px', width: '100%' }}>
			<ResponsivePie
				data={data}
				theme={Theme}
				colors={{ datum: 'data.color' }}
				margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor={colors.grey[100]}
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from: 'color',
					modifiers: [['darker', 2]],
				}}
				layers={[
					'arcs',
					'arcLabels',
					'arcLinkLabels',
					'legends',
					CenteredMetric,
				]}
				legends={
					isDashboard
						? []
						: [
								{
									anchor: 'bottom',
									direction: 'row',
									justify: false,
									translateX: 0,
									translateY: 56,
									itemsSpacing: 0,
									itemWidth: 100,
									itemHeight: 18,
									itemTextColor: colors.grey[100],
									itemDirection: 'left-to-right',
									itemOpacity: 1,
									symbolSize: 18,
									symbolShape: 'circle',
									effects: [
										{
											on: 'hover',
											style: {
												itemTextColor:
													colors.primary[100] ||
													'#fff',
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

export default memo(Pie);
