import { memo } from 'react';
import { Box } from '@mui/material';
import LineChart from '../../components/linechart/LineChart';
import { mockLineData } from '../../Data/Mockdata';
import Header from '../../components/header/Header';

const Line = () => {
	return (
		<Box className="h-[71vh] m-2 ">
			<Header title="Line Chart" />
			<Box className="h-[70vh]">
				<LineChart data={mockLineData} />
			</Box>
		</Box>
	);
};

export default memo(Line);
