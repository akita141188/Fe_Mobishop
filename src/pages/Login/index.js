import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../../services/Api";
import { loginSuccess } from "../../redux-setup/reducers/authReducer";



const Login = () => {
    const [inputCustomer, setInputCustomer] = useState({})
    const [errorLogin, setErrorLogin] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeInputCustomer = (e) => {
        const { name, value } = e.target;
        return setInputCustomer({ ...inputCustomer, [name]: value })
    }
    const clickLogin = (e)=>{
        e.preventDefault();
        loginCustomer(inputCustomer)
        .then(({data})=>{
            dispatch(loginSuccess({...data, identifier : inputCustomer.identifier}))
            return navigate("/Cart")
        })
        .catch(({response})=>{
            if(response.data === "Email not valid")
            setErrorLogin("Email không đúng")
            if(response.data === "password not valid")
            setErrorLogin("Mật khẩu không đúng")
        })
    }

    return (
        <div id="customer">
            {
                errorLogin && (
                    <div className="alert alert-danger text-center">{errorLogin}</div>
                )
            }            <h3 className="text-center">Đăng nhập</h3>
            <form method="post">
                <div className="row">
                    <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                        <input
                            onChange={changeInputCustomer}
                            placeholder="Email hoặc số điện thoại (bắt buộc)"
                            type="text" name="identifier"
                            className="form-control"
                            value={inputCustomer.identifier || ""}
                            required />
                    </div>
                    <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                        <input
                            onChange={changeInputCustomer}
                            placeholder="Mật khẩu (bắt buộc)"
                            type="password"
                            name="password"
                            className="form-control"
                            value={inputCustomer.password || ""}
                            required />
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link to="#" onClick={clickLogin}>
                        <b>Đăng nhập ngay</b>
                    </Link> 
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link to="#">
                        <b>Quay về trang chủ</b>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;