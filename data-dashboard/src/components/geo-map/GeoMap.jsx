import { memo, useMemo } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { useTheme, Box, Typography } from '@mui/material';
import { tokens } from '../../Themes';
import { geoFeatures } from '../../Data/mockGeoFeatures';

const GeoMap = ({ data = [], isDashboard = false }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// Normalize geoFeatures array regardless of export type
	const featuresList =
		geoFeatures?.features ||
		(Array.isArray(geoFeatures) ? geoFeatures : []);

	const nivoTheme = useMemo(
		() => ({
			axis: {
				domain: { line: { stroke: colors.grey[100] } },
				ticks: { text: { fill: colors.grey[100] } },
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

	// If data or features are missing, show visual feedback instead of a blank screen
	if (!featuresList || featuresList.length === 0) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100%"
			>
				<Typography color={colors.redAccent[500]}>
					Error: mockGeoFeatures file is empty or improperly imported.
				</Typography>
			</Box>
		);
	}

	return (
		<Box className="h-[80vh] w-full">
			<ResponsiveChoropleth
				data={data}
				theme={nivoTheme}
				features={featuresList}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				colors="nivo"
				domain={[0, 1000000]}
				unknownColor={colors.grey[700]}
				label="properties.name"
				valueFormat=".2s"
				projectionType="mercator"
				projectionScale={isDashboard ? 40 : 150}
				projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
				projectionRotation={[0, 0, 0]}
				borderWidth={0.5}
				borderColor={colors.grey[900]}
				legends={
					isDashboard
						? []
						: [
								{
									anchor: 'bottom-left',
									direction: 'column',
									justify: true,
									translateX: 20,
									translateY: -50,
									itemsSpacing: 0,
									itemWidth: 94,
									itemHeight: 18,
									itemDirection: 'left-to-right',
									itemTextColor: colors.grey[100],
									itemOpacity: 0.85,
									symbolSize: 18,
								},
							]
				}
			/>
		</Box>
	);
};

export default memo(GeoMap);
