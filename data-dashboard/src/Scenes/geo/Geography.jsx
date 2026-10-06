import { Box, useTheme } from '@mui/material';
import GeoMap from '../../components/geo-map/GeoMap';
import Header from '../../components/header/Header';
import { mockGeographyData } from '../../Data/Mockdata';
import { tokens } from '../../Themes';

const Geography = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px">
			<Header title="GEOGRAPHY" />

			{/* FIX: Parent Box MUST have an explicit height like 75vh or 500px */}
			<Box
				height="75vh"
				border={`1px solid ${colors.grey[100]}`}
				borderRadius="4px"
			>
				<GeoMap data={mockGeographyData} />
			</Box>
		</Box>
	);
};

export default Geography;
