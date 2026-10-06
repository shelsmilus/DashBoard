import { memo } from 'react';
import { Box } from '@mui/material';
import BarChart from '../../components/barchart/BarChart';
import { mockBarData } from '../../Data/Mockdata';
import Header from '../../components/header/Header';

const Bar = () => {
	return (
		<Box className="h-[70vh] m-2">
			<Header title="Bar Chart" />
			<BarChart data={mockBarData} />
		</Box>
	);
};

export default memo(Bar);
