import { memo, useState } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../../components/header/Header';
import { tokens } from '../../Themes';

// 1. Extract data into an array
const faqData = [
	{
		id: 'panel1',
		question: 'Important Questions',
		answer: 'All rights reserved. No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photo copying, recording, or by any information storage and retrieval system, without the written consent of the publisher, except where permitted by law.',
	},
	{
		id: 'panel2',
		question: 'Another Important Questions',
		answer: 'All rights reserved. No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photo copying, recording, or by any information storage and retrieval system, without the written consent of the publisher, except where permitted by law.',
	},
	{
		id: 'panel3',
		question: 'Your Favourite Questions',
		answer: 'All rights reserved. No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photo copying, recording, or by any information storage and retrieval system, without the written consent of the publisher, except where permitted by law.',
	},
	{
		id: 'panel4',
		question: 'Most Asked Questions',
		answer: 'All rights reserved. No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photo copying, recording, or by any information storage and retrieval system, without the written consent of the publisher, except where permitted by law.',
	},
	{
		id: 'panel5',
		question: 'Random Questions',
		answer: 'All rights reserved. No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photo copying, recording, or by any information storage and retrieval system, without the written consent of the publisher, except where permitted by law.',
	},
];

const FAQ = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// 2. Add state to control which accordion is currently open
	// Defaulting to 'panel1' so the first one is open on mount
	const [expanded, setExpanded] = useState('panel1');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Box className="m-auto p-2">
			<Header title="FAQ" subtitle="Frequently Asked Questions Page" />

			{/* 3. Container with exact 70vh height and scroll capability */}
			<Box
				sx={{
					height: '70vh',
					overflowY: 'auto',
					pr: 1, // slight right padding for the scrollbar
					// Custom scrollbar styling
					'&::-webkit-scrollbar': { width: '8px' },
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: colors.primary[400],
						borderRadius: '4px',
					},
				}}
			>
				{/* 4. Map through the data array */}
				{faqData.map((faq) => (
					<Accordion
						key={faq.id}
						expanded={expanded === faq.id}
						onChange={handleChange(faq.id)}
						sx={{
							backgroundColor: colors.primary[400],
							mb: '10px !important', // Space between accordions
							borderRadius: '4px !important', // Rounded corners
							'&:before': {
								display: 'none', // Removes the default MUI top border line
							},
						}}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography
								variant="h5"
								sx={{ color: colors.greenAccent[500] }}
							>
								{faq.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography sx={{ lineHeight: 1.6, opacity: 0.9 }}>
								{faq.answer}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Box>
	);
};

export default memo(FAQ);
