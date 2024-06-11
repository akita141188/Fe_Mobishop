import { useState, useEffect } from "react";
import { OrderCustomer } from "../../services/Api";
import { useParams } from "react-router-dom";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const OrderDetails = () => {
    const [order, setOrder] = useState([])
    const { id } = useParams();
    const customer = useSelector(({Auth})=>Auth.login.currentCustomer)
    useEffect(() => {
        OrderCustomer(id)
            .then(({ data }) => setOrder(data.newItems))
            .catch((error) => console.log(error))
    }, [])
    console.log(order);
    return (
        <>
        <div id="my-cart">
        <Link to={`/Order-${customer?._id}`} className="btn btn-success">Quay lại</Link>
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                    Thông tin sản phẩm
                </div>
                <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Số lượng</div>
                <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
            </div>
            <form method="post">
                {
                    order?.map((item,index) => {
                        return (
                            <>
                                <div key={index} className="cart-item row">
                                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                        <img src={getImageProduct(item.thumbnails[0])} />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                        <p>{item.qty}</p>
                                    </div>
                                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{formatPrice(item.price)}</b></div>
                                </div> </>
                        )
                    })
                }
                <div className="row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    </div>
                    <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{formatPrice(order?.reduce((total,item)=> total= item.price * item.qty,0))}</b></div>
                </div>
            </form>
        </div>
        </>

    )
}

export default OrderDetails;