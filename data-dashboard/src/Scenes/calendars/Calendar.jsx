import { memo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
} from '@mui/material';
import Header from '../../components/header/Header';
import { tokens } from '../../Themes';

const Calendar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// Core State
	const [currentEvents, setCurrentEvents] = useState([]);

	// Dialog States
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [newEventTitle, setNewEventTitle] = useState('');
	const [selectedDateInfo, setSelectedDateInfo] = useState(null);
	const [selectedEventInfo, setSelectedEventInfo] = useState(null);

	// Load initial events from local storage once on mount
	const [initialEvents] = useState(() => {
		const savedEvents = localStorage.getItem('calendarEvents');
		return savedEvents ? JSON.parse(savedEvents) : [];
	});

	// --- Handlers for Adding Events ---
	const handleDateClick = (selected) => {
		setSelectedDateInfo(selected);
		setIsAddDialogOpen(true);
	};

	const handleCloseAddDialog = () => {
		setIsAddDialogOpen(false);
		setNewEventTitle('');
		setSelectedDateInfo(null);
	};

	const handleAddEventSubmit = () => {
		if (newEventTitle && selectedDateInfo) {
			const calendarApi = selectedDateInfo.view.calendar;
			calendarApi.unselect(); // clear date selection visually

			calendarApi.addEvent({
				id: `${selectedDateInfo.dateStr}-${newEventTitle}-${Date.now()}`,
				title: newEventTitle,
				start: selectedDateInfo.startStr,
				end: selectedDateInfo.endStr,
				allDay: selectedDateInfo.allDay,
			});
		}
		handleCloseAddDialog();
	};

	// --- Handlers for Deleting Events ---
	const handleEventClick = (selected) => {
		setSelectedEventInfo(selected);
		setIsDeleteDialogOpen(true);
	};

	const handleCloseDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
		setSelectedEventInfo(null);
	};

	const handleDeleteEventConfirm = () => {
		if (selectedEventInfo) {
			selectedEventInfo.event.remove();
		}
		handleCloseDeleteDialog();
	};

	// --- Global Event Sync (Persistence) ---
	const handleEventsSet = (events) => {
		setCurrentEvents(events);

		// Serialize events specifically for localStorage
		const serializableEvents = events.map((event) => ({
			id: event.id,
			title: event.title,
			start: event.startStr,
			end: event.endStr,
			allDay: event.allDay,
		}));

		localStorage.setItem(
			'calendarEvents',
			JSON.stringify(serializableEvents)
		);
	};

	return (
		<Box className="m-auto" p="20px">
			<Header
				title="Calendar"
				subtitle="Full Calendar Interactive Page"
			/>

			<Box className="flex justify-around gap-1 m-auto">
				{/* Calendar Sidebar */}
				<Box
					flex="1 1 20%"
					sx={{
						backgroundColor: colors.primary[400],
						p: '15px',
						borderRadius: '4px',
						width: '230px',
					}}
				>
					<Typography variant="h5">
						Events ({currentEvents.length})
					</Typography>
					<List>
						{currentEvents.map((event) => (
							<ListItem
								key={event.id}
								sx={{
									backgroundColor: colors.greenAccent[500],
									margin: '10px 0',
									borderRadius: '2px',
								}}
							>
								<ListItemText
									primary={event.title}
									secondary={
										<Typography>
											{formatDate(event.start, {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
											})}
										</Typography>
									}
								/>
							</ListItem>
						))}
					</List>
				</Box>

				{/* Calendar Component */}
				<Box flex="1 1 100%">
					<FullCalendar
						height="71vh"
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							interactionPlugin,
							listPlugin,
						]}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
						}}
						initialView="dayGridMonth"
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						initialEvents={initialEvents} // Loads from local storage
						select={handleDateClick}
						eventClick={handleEventClick}
						eventsSet={handleEventsSet} // Syncs to local storage automatically
					/>
				</Box>
			</Box>

			{/* MUI Add Event Dialog */}
			<Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
				<DialogTitle>Add New Event</DialogTitle>
				<DialogContent sx={{ minWidth: '300px' }}>
					<TextField
						autoFocus
						margin="dense"
						label="Event Title"
						type="text"
						fullWidth
						variant="outlined"
						value={newEventTitle}
						onChange={(e) => setNewEventTitle(e.target.value)}
						onKeyDown={(e) =>
							e.key === 'Enter' && handleAddEventSubmit()
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseAddDialog} color="error">
						Cancel
					</Button>
					<Button
						onClick={handleAddEventSubmit}
						color="primary"
						variant="contained"
						disabled={!newEventTitle.trim()}
					>
						Add Event
					</Button>
				</DialogActions>
			</Dialog>

			{/* MUI Delete Event Dialog */}
			<Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete the event:
						<strong> {selectedEventInfo?.event?.title}</strong>?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog} color="primary">
						Cancel
					</Button>
					<Button
						onClick={handleDeleteEventConfirm}
						color="error"
						variant="contained"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default memo(Calendar);
