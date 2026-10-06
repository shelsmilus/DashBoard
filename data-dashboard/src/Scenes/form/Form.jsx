import { memo } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/header/Header';

const validationSchema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
			'Password must include uppercase, lowercase, a number, and a special character'
		)
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	phone: yup
		.string()
		.matches(
			/^\+?(?:\d{1,4})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
			'Please enter a valid phone number'
		)
		.required('Phone number is required'),
	Address1: yup.string().required('Enter Address'),
	Address2: yup.string(),
});

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	phone: '',
	Address1: '',
	Address2: '',
};

const Form = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleSubmit = (values) => {
		console.log('Form submitted:', values);
	};

	return (
		<Box className="m-auto">
			<Header
				title="Create User"
				subtitle="Fill in the details to create a new user"
			/>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
							<Box
								className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-[75%] gap-4 items-center justify-center m-auto"
								sx={{
									'& > div': {
										gridColumn: isNonMobile
											? undefined
											: 'span 2',
									},
									// Custom border styles for inputs
									'& .MuiOutlinedInput-root': {
										borderRadius: '8px',
										transition: 'all 0.2s ease-in-out',
										// Hover border
										'&:hover fieldset': {
											borderColor: '#2563eb',
										},
										// Focus border when clicked
										'&.Mui-focused:not(.Mui-error)': {
											boxShadow:
												'0 0 0 3px rgba(37, 99, 235, 0.2)', // Focus glow
											'& fieldset': {
												borderColor: '#2563eb', // Focus border color
												borderWidth: '2px', // Thicker border on focus
											},
										},
									},
								}}
							>
								<TextField
									label="First Name"
									name="firstName"
									value={values.firstName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.firstName &&
										Boolean(errors.firstName)
									}
									helperText={
										touched.firstName && errors.firstName
									}
								/>
								<TextField
									label="Last Name"
									name="lastName"
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.lastName &&
										Boolean(errors.lastName)
									}
									helperText={
										touched.lastName && errors.lastName
									}
								/>
								<TextField
									label="Email"
									name="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.email && Boolean(errors.email)
									}
									helperText={touched.email && errors.email}
								/>
								<TextField
									label="Phone"
									name="phone"
									value={values.phone}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.phone && Boolean(errors.phone)
									}
									helperText={touched.phone && errors.phone}
								/>
								<TextField
									label="Password"
									name="password"
									type="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.password &&
										Boolean(errors.password)
									}
									helperText={
										touched.password && errors.password
									}
								/>
								<TextField
									label="Confirm Password"
									name="confirmPassword"
									type="password"
									value={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.confirmPassword &&
										Boolean(errors.confirmPassword)
									}
									helperText={
										touched.confirmPassword &&
										errors.confirmPassword
									}
								/>
								<TextField
									label="Address 1"
									name="Address1"
									value={values.Address1}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.Address1 &&
										Boolean(errors.Address1)
									}
									helperText={
										touched.Address1 && errors.Address1
									}
								/>
								<TextField
									label="Address 2"
									name="Address2"
									value={values.Address2}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.Address2 &&
										Boolean(errors.Address2)
									}
									helperText={
										touched.Address2 && errors.Address2
									}
								/>

								<Box
									sx={{
										gridColumn: '1 / -1',
										display: 'flex',
										justifyContent: 'flex-end',
										mt: 2,
									}}
								>
									<Button
										type="submit"
										variant="contained"
										color="secondary"
									>
										Submit
									</Button>
								</Box>
							</Box>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default memo(Form);
