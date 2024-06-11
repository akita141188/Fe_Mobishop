import { getBanners } from "../../../services/Api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getImageProduct } from "../../ultils";

const Sidebar = () => {
  const [banners, setBanners] = useState([]);
  useEffect(()=>{
    getBanners({})
    .then(({data})=>{
      setBanners(data.data.docs)
    })
  },[])

  return (
    <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
      <div id="banner">
    {
      banners.map ((banner)=>{

        return (
          <div className="banner-item">
          <Link to={banner.urlBanner}>
            <img 
            className="img-fluid" 
            src={getImageProduct(banner.image)}
            style={{ borderRadius: '10px' }}
             />
          </Link>
        </div>
        )
      })
    }
      </div>
    </div>
  );
};
export default Sidebar;
