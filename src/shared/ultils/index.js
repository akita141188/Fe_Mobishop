import { BASE_URL } from "../constants/app";
import moment from "moment";
import 'moment/locale/vi';  // Đảm bảo bạn đã import locale tiếng Việt

export const getImageProduct = (imageName) => {
    return `${BASE_URL}/assets/Uploads/images/${imageName}`;
}
// Format price
export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
    })
    return formatter.format(price)
}

export const formatDate = (data) => {
    return moment(data).locale("vi").format("LL LTS");
};

