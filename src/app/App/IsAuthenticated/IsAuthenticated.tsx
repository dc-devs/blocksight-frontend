import { useEffect } from 'react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
	selectAuthentication,
	selectAuthenticationStatus,
} from '../../../redux/slices/authenticationSlice';

interface IProps {
	children: ReactElement;
}

const IsAuthenticated = ({ children }: IProps) => {
	const selectedAuthentication = useSelector(selectAuthentication);
	const selectedAuthenticationStatus = useSelector(
		selectAuthenticationStatus
	);

	useEffect(() => {
		console.log(
			'[IsAuthenticated] IsAuthenticated',
			selectedAuthentication
		);
		console.log('[IsAuthenticated] - Status', selectedAuthenticationStatus);
	}, [selectedAuthentication, selectedAuthenticationStatus]);

	if (selectedAuthenticationStatus === 'loading') {
		return <></>;
	} else if (selectedAuthentication.isAuthenticated) {
		return children;
	} else {
		return <Navigate to="/sign-in" replace />;
	}
};

export default IsAuthenticated;
