import React, {useContext} from 'react';
import AuthContext from '../contexts/auth';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import LoadingComponent from '../components/Loading';

const Routes = () => {
    const {signed, loading} = useContext(AuthContext);

    return loading ? (
        <LoadingComponent />
    ) : signed ? (
        <AppRoutes />
    ) : (
        <AuthRoutes />
    );
};

export default Routes;