import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from '../../Themes';
import ProgressCircle from '../progresscircle/ProgressCircle';

import { memo } from 'react';

const StartBox = ({ title, subtitle, icon, progress, increase }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box className="w-[100%] m-[0,30px]">
			<Box className="flex justify-between">
				<Box>
					{icon}
					<Typography
						variant="h4"
						fontWeight="bold"
						sx={{
							color: colors.grey[100],
						}}
					>
						{title}
					</Typography>
				</Box>
				<Box>
					<ProgressCircle progress={progress} />
				</Box>
				<Box className="flex justify-between">
					<Box>
						<Typography
							variant="h5"
							sx={{
								color: colors.greenAccent[500],
							}}
						>
							{subtitle}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="h5"
							fontStyle="italic"
							sx={{
								color: colors.greenAccent[600],
							}}
						>
							{increase}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default memo(StartBox);
