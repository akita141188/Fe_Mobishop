import Category from "../pages/Category"
import Login from "../pages/Login"
import Success from "../pages/Success"
import ProductDetails from "../pages/ProductDetails"
import Search from "../pages/Search"
import Cart from "../pages/Cart"
import NotFound from "../pages/NotFound"
import Register from "../pages/Register"
import Customer from "../pages/Customer"
import Home from "../pages/Home"
import Order from "../pages/Orders"
import OrderDetails from "../pages/OrderDetails"
import { checkLogged, checkLogin } from "../shared/authRequired"


const publicRoutes = [
    {
        path : "/Customer",
        element : checkLogin(Customer)
    },
    {
        path : "/Order-:id",
        element : checkLogin(Order)
    },
    {
        path : "/OrderDetails-:id",
        element : checkLogin(OrderDetails)
    },
    {
        path : "/",
        element : Home
    },
    {
        path : "/register",
        element : checkLogged(Register)
    },
    {
        path : "/Category-:id",
        element : Category
    },
    {
        path : "/ProductDetails-:id",
        element : ProductDetails
    },
    {
        path : "/Search",
        element : Search
    },
    {
        path : "/Cart",
        element : Cart
    },
    {
        path : "/Success",
        element : Success
    },
    {
        path : "*",
        element : NotFound
    },
    {
        path : "/login",
        element : checkLogged(Login)
    },
]

export default publicRoutes;