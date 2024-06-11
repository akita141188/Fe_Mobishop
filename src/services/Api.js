import Http from "./Http";

export const getProducts = (config)=>Http("/products", config);
export const getProductsCategory = (id, config)=>Http(`/categories/${id}/products`, config);
export const getProduct = (id, config)=>Http(`/products/${id}`, config);
export const getCategories = (config)=>Http("/categories", config);
export const getCategory = (id, config)=>Http(`/categories/${id}`, config);
export const getCommentsProduct = (id, config)=>Http(`products/${id}/comments`, config);
export const createCommentProduct = (id, data)=>Http.post(`products/${id}/comments`, data);
export const order = (data)=>Http.post("/order", data);

//login customer
export const loginCustomer = (data)=> Http.post("/customer/login",data);

//get sliders
export const getSliders = (config)=> Http.get("/sliders",config)

//get banners
export const getBanners = (config)=> Http.get("/banners",config)

//get Configs
export const getConfigs = (config)=> Http.get("/configs",config)

//registerCustomer
export const registerCutomer = (data)=> Http.post("/customer/register",data)
export const updateCutomer = (data)=> Http.post("/customer/update",data)

//don hang theo khac hang
export const OrdersCustomer = (id,config)=> Http.get(`/customer/${id}/orders`, config)
// chi tiet don hang
export const OrderCustomer = (id,config)=>Http.get(`/customer/order/${id}`,config)
