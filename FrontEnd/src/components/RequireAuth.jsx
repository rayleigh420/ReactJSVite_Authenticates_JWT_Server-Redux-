import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ admin }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(admin, auth.admin)

    if (auth) {
        auth.admin = Boolean(auth.admin)
    }

    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        //     ? <Outlet />
        //     : auth?.user
        //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //         : <Navigate to="/login" state={{ from: location }} replace />
        auth?.admin == admin
            ? <Outlet />
            : auth?.userName
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth;