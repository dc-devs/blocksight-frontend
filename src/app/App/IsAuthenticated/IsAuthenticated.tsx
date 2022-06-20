import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Status } from '../../../redux';
import { useSelector } from 'react-redux';
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
	const authentication = useSelector(selectAuthentication);
	const authenticationStatus = useSelector(selectAuthenticationStatus);

	useEffect(() => {
		if (authentication && authenticationStatus === Status.IDLE) {
			appDispatch(fetchAuthentication());
		}

		if (
			authenticationStatus === Status.SUCCEEDED &&
			!authentication.isAuthenticated
		) {
			navigate('/', { replace: true });
		}
	}, [authenticationStatus, authentication, appDispatch, navigate]);

	if (authenticationStatus === Status.LOADING) {
		return <></>;
	}

	return children;
};

export default IsAuthenticated;
