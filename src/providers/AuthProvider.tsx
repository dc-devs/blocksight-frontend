import { ReactNode } from 'react';
import { useAuth } from '../hooks';
import { AuthContext } from '../contexts';

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const auth = useAuth();

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
