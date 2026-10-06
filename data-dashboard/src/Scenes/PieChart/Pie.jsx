import { memo } from 'react';
import { Box } from '@mui/material';
import PieChart from '../../components/piechart/PieChart';
import { mockPieData } from '../../Data/Mockdata';
import Header from '../../components/header/Header';

const Pie = () => {
	return (
		<Box className="h-[71vh] m-2 ">
			<Header title="Pie Chart" />
			<Box className="h-[70vh]">
				<PieChart data={mockPieData} />
			</Box>
		</Box>
	);
};

export default memo(Pie);
