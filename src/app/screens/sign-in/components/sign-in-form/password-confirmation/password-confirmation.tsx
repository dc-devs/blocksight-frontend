import TextField from '@mui/material/TextField';

interface Props {
	watch: any;
	errors: any;
	register: any;
	errorContainerClass: string;
}

const SignInOptions = ({
	errors,
	register,
	watch,
	errorContainerClass,
}: Props) => {
	return (
		<>
			<TextField
				fullWidth
				autoComplete="off"
				type="password"
				id="password-confirmation"
				label="password confirmation"
				name="passwordConfirmation"
				error={!!errors.passwordConfirmation}
				{...register('passwordConfirmation', {
					required: true,
					minLength: 8,
					validate: (value: string) => value === watch('password'),
				})}
			/>
			{errors.passwordConfirmation &&
				errors.passwordConfirmation.type === 'required' && (
					<div className={errorContainerClass}>
						Password Confirmation is required
					</div>
				)}
			{errors.passwordConfirmation &&
				errors.passwordConfirmation.type === 'minLength' && (
					<div className={errorContainerClass}>
						Must be minmum 8 characters
					</div>
				)}
			{errors.passwordConfirmation &&
				errors.passwordConfirmation.type === 'validate' && (
					<div className={errorContainerClass}>
						Password and password confirmation do not match
					</div>
				)}
		</>
	);
};

export default SignInOptions;
