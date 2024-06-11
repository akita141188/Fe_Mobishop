import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { order } from "../../services/Api";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, deleteItemCart, clearCart } from "../../redux-setup/reducers/cart";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import { Link } from "react-router-dom";
const Cart = () => {
  // const [inputsOrder, setInputsOrder] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(({ Cart }) => Cart.items);
  const customer = useSelector(({ Auth }) => Auth.login.currentCustomer)
  console.log(customer);
  const logged = useSelector(({ Auth }) => Auth.login.logged)
  const newItems = items.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));
  const clickOrder = (e) => {
    e.preventDefault();
    if (!customer) {
      alert("Bạn cần đăng nhập để mua hàng!");
      return;
    }
    order({
      ...customer,
      items: newItems,
    }).then(({ data }) => {
      if (data.status === "success") {
        dispatch(clearCart());
        return navigate("/Success");
      }
    });
  }
  console.log(order);
  const changeQty = (e, id) => {
    const { value } = e.target;
    if (value <= 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng hay không?");
      return isConfirm
        ? dispatch(deleteItemCart({ _id: id }))
        : false;
    }
    return dispatch(updateCart({
      _id: id,
      qty: value,
    }));
  }
  const delItemCart = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Ban co muon xoa san pham khoi gio hang hay ko ?")
    return isConfirm ? dispatch(deleteItemCart({ _id: id })) : false
  }

  return (
    <div>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Tùy chọn
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {
            items?.map((item) =>
              <div className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item.thumbnails)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    onChange={(e) => changeQty(e, item._id)}
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    value={item.qty}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{formatPrice(item.qty * item.price)}</b>
                  <Link onClick={(e) => delItemCart(e, item._id)} to="#">Xóa</Link>
                </div>
              </div>
            )
          }
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <button
                id="update-cart"
                className="btn btn-success"
                type="submit"
                name="sbm"
              >
                Cập nhật giỏ hàng
              </button>
            </div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{formatPrice(items.reduce((total, item) => total + item.qty * item.price, 0))}</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        {/* <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
              <input
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="full_name"
                className="form-control"
                value={customer?.full_name || ""}
                readOnly
              />
            </div>
            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
              <input
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={customer?.phone || ""}
                readOnly
              />
            </div>
            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
              <input
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={customer?.email || ""}
                readOnly

              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                value={customer?.address || ""}
                readOnly

              />
            </div>
          </div>
        </form> */}
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            {
              logged ? (
                <a onClick={clickOrder} href="#">
                  <b>Mua ngay</b>
                  <span>Giao hàng tận nơi siêu tốc</span>
                </a>
              ) : (
                <Link to="/Login">
                  <b>Đăng nhập để mua hàng</b>
                </Link>
              )
            }
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="#">
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0988 550 553</span>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </div>
  );
};
export default Cart;
