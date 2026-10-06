import React, { memo } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../../components/toolbar/CustomToolbar';
import Header from '../../components/header/Header';
import { tokens } from '../../Themes';
import { mockDataContacts } from '../../Data/Mockdata';

const Contacts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },
		{ field: 'registrarId', headerName: 'Registrar ID' },
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
		{ field: 'phone', headerName: 'Phone Number', flex: 1 },
		{ field: 'email', headerName: 'Email', flex: 1 },
		{ field: 'address', headerName: 'Address', flex: 1 },
		{ field: 'city', headerName: 'City', flex: 1 },
		{ field: 'zipCode', headerName: 'Zip Code', flex: 1 },
	];

	return (
		<Box className="m-3">
			<Header
				title="Contacts"
				subtitle="The List of Contacts For Future Reference"
			/>
			<Box
				className="m-auto h-[71vh]"
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
						backgroundColor: colors.blueAccent[500],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${colors.primary[400]} !important`,
					},
				}}
			>
				<Box className="m-auto h-[70vh] w-[95%] rounded-lg shadow-xl">
					<DataGrid
						rows={mockDataContacts}
						columns={columns}
						slots={{ toolbar: CustomToolbar }}
						// Enable global quick filter logic in DataGrid
						slotProps={{
							toolbar: {
								showQuickFilter: true,
							},
						}}
						showToolbar
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default memo(Contacts);
