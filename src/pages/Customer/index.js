import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCutomer } from "../../services/Api";
import { updateSuccess } from "../../redux-setup/reducers/authReducer";

const Customer = () => {
    const customer = useSelector(({ Auth }) => Auth.login.currentCustomer)
    const [inputsCustomer, setInputsCustomer] = useState(customer);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertClass, setAlertClass] = useState("");
    const dispatch = useDispatch();

    const changeInputsCustomer = (e) => {
        const { name, value } = e.target;
        return setInputsCustomer({ ...inputsCustomer, [name]: value })
    }

    const clickUpdate = (e) => {
        e.preventDefault();
        updateCutomer(inputsCustomer)
            .then(({ data }) => {
                dispatch(updateSuccess(inputsCustomer));
                setAlertUpdate("Cập nhật thông tin thành công")
                setAlertClass("success")
            })
            .catch(({ response }) => {
                if (response.data === "Phone Number exits")
                    setAlertUpdate("Số điện thoại đã tồn tại")
                setAlertClass("danger")
            })
    }

    return (
        <div id="customer">
            {
                alertUpdate &&
                (
                    <div className={`alert alert-${alertClass} text-center`} >{alertUpdate}</div>
                )
            }
            <h3 className="text-center">Thông tin chi tiết</h3>
            {
                customer.email === customer.identifier ? (
                    <form method="post">
                        <div className="row">
                            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    onChange={changeInputsCustomer}
                                    placeholder="Họ và tên (bắt buộc)"
                                    type="text"
                                    name="full_name"
                                    className="form-control"
                                    value={inputsCustomer.full_name || ""}
                                    required />
                            </div>
                            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    placeholder="Mật khẩu (bắt buộc)"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={"123456"}
                                    disabled
                                    required />
                            </div>
                            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    placeholder="Email (bắt buộc)"
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={inputsCustomer.email || ""}
                                    disabled
                                    required />
                            </div>
                            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    onChange={changeInputsCustomer}
                                    placeholder="Số điện thoại (bắt buộc)"
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={inputsCustomer.phone || ""}
                                    required />
                            </div>
                            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                <input
                                    onChange={changeInputsCustomer}
                                    placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={inputsCustomer.address || ""}
                                    required />
                            </div>
                        </div>
                    </form>
                ) :
                    (
                        <form method="post">
                            <div className="row">
                                <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                                    <input
                                        onChange={changeInputsCustomer}
                                        placeholder="Họ và tên (bắt buộc)"
                                        type="text"
                                        name="full_name"
                                        className="form-control"
                                        value={inputsCustomer.full_name || ""}
                                        required />
                                </div>
                                <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                                    <input
                                        placeholder="Mật khẩu (bắt buộc)"
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={"123456"}
                                        disabled
                                        required />
                                </div>
                                <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                                    <input
                                        onChange={changeInputsCustomer}
                                        placeholder="Email (bắt buộc)"
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        value={inputsCustomer.email || ""}
                                        required />
                                </div>
                                <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                                    <input
                                        onChange={changeInputsCustomer}
                                        placeholder="Số điện thoại (bắt buộc)"
                                        type="text"
                                        name="phone"
                                        disabled
                                        className="form-control"
                                        value={inputsCustomer.phone || ""}
                                        required />
                                </div>
                                <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                    <input
                                        onChange={changeInputsCustomer}
                                        placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={inputsCustomer.address || ""}
                                        required />
                                </div>
                            </div>
                        </form>
                    )
            }
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link onClick={clickUpdate} to="#">
                        <b>Cập nhật ngay</b>
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


export default Customer;