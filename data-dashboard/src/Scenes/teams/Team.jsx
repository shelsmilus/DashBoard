import { memo } from 'react';
import Header from '../../components/header/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../Themes';
import { mockDataTeam } from '../../Data/Mockdata';
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedicons from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedicons from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedicons from '@mui/icons-material/SecurityOutlined';

const Team = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			cellClassName: 'name-column--cell',
		},
		{
			field: 'age',
			headerName: 'Age',
			type: 'number',
			headerAlign: 'left',
			align: 'left',
		},
		{
			field: 'phone',
			headerName: 'Phone Number',
			flex: 1,
		},
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		{
			field: 'access',
			headerName: 'Access Level',
			flex: 1,
			// FIX 1: Change "rows" to "row"
			renderCell: ({ row: { access } }) => {
				return (
					<Box
						className={`w-[100px] m-auto p-2 flex mt-2 items-center
                    justify-center 
                    ${access === 'admin' ? 'bg-green-400' : 'bg-green-800'}
                    rounded-lg shadow-xl`}
					>
						{access === 'admin' && (
							<AdminPanelSettingsOutlinedicons />
						)}
						{access === 'manager' && <SecurityOutlinedicons />}
						{access === 'user' && <LockOpenOutlinedicons />}
						<Typography variant="h5" color={colors.grey[100]}>
							{access}
						</Typography>
					</Box>
				);
			},
		},
	];
	return (
		<Box className=" m-3">
			<Header title="Team" subtitle="Manage your team members" />
			<Box
				className="m-[40px 0 0 0] h-[71vh]"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .name-column--cell': {
						color: colors.greenAccent[300],
					},
					'& .MuiDataGrid-columnHeader': {
						backgroundColor: colors.blueAccent[600],
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
				}}
			>
				<Box className="m-auto h-[70vh] w-[95%] rounded-lg shadow-xl">
					<DataGrid rows={mockDataTeam} columns={columns} />
				</Box>
			</Box>
		</Box>
	);
};

export default memo(Team);
