import { memo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../Themes';

const Header = ({ title, subtitle }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box className="p-2">
			<Box>
				<Typography
					variant="h2"
					color={colors.grey[300]}
					className="text-3xl font-bold"
				>
					{title}
				</Typography>
			</Box>
			<Box>
				<Typography
					variant="h6"
					colors={colors.grey[300]}
					className="text-sm font-medium"
				>
					{subtitle}
				</Typography>
			</Box>
		</Box>
	);
};

export default memo(Header);
