import React, { memo } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../../components/toolbar/CustomToolbar';
import Header from '../../components/header/Header';
import { tokens } from '../../Themes';
import { mockDataInvoices } from '../../Data/Mockdata';

const Invoices = () => {
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

		{ field: 'phone', headerName: 'Phone Number', flex: 1 },
		{ field: 'email', headerName: 'Email', flex: 1 },
		{
			field: 'cost',
			headerName: 'Cost',
			cellClassName: 'cost-column--cell',
		},
		{
			field: 'date',
			headerName: 'Date',
			flex: 1,
		},
	];

	return (
		<Box className="m-3">
			<Header title="Invoices" subtitle="The List of Invoice Balances" />
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
					'& .cost-column--cell': {
						color: colors.greenAccent[500],
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
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`,
					},
				}}
			>
				<Box className="m-auto h-[70vh] w-[95%] rounded-lg shadow-xl">
					<DataGrid
						checkboxSelection
						disableRowSelectionOnClick
						rows={mockDataInvoices}
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

export default memo(Invoices);
