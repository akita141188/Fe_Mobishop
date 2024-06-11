import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const checkLogin = (OriginComponent) => {
    const ExtendsComponent = () => {
        const login = useSelector(({ Auth }) => Auth.login.logged);
        return login ? <OriginComponent /> : <Navigate to={"/"} />
    }
    return ExtendsComponent;
}

export default checkLogin;