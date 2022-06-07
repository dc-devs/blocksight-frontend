import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Status } from '../../../redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import {
	fetchAuthentication,
	selectAuthentication,
	selectAuthenticationStatus,
} from '../../../redux/slices/authenticationSlice';

interface IProps {
	children: ReactElement;
}

const IsAuthenticated = ({ children }: IProps) => {
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const selectedAuthentication = useSelector(selectAuthentication);
	const selectedAuthenticationStatus = useSelector(
		selectAuthenticationStatus
	);

	useEffect(() => {
		if (
			selectedAuthentication &&
			selectedAuthenticationStatus === Status.IDLE
		) {
			appDispatch(fetchAuthentication());
		}

		if (
			selectedAuthenticationStatus === Status.SUCCEEDED &&
			!selectedAuthentication.isAuthenticated
		) {
			navigate('/sign-in', { replace: true });
		}
	}, [
		selectedAuthenticationStatus,
		selectedAuthentication,
		appDispatch,
		navigate,
	]);

	if (selectedAuthenticationStatus === Status.LOADING) {
		return <></>;
	}

	return children;
};

export default IsAuthenticated;
