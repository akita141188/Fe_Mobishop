import { getConfigs } from "../../../services/Api";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getImageProduct } from "../../ultils";
const Footer = () => {
  const [configs, setConfigs]= useState([]);
  useEffect(()=>{
    getConfigs({})
    .then(({data})=>{
      setConfigs(data.data.docs)
    })
  },[])
  return (
    <>
      <div id="footer-top">
        <div className="container">
          <div className="row">
            <div id="logo-2" className="col-lg-3 col-md-6 col-sm-12">
              <h2>
                <a href="#">
                  <img width="260px" src={getImageProduct(configs.logo_header)} />
                </a>
              </h2>
              <p className="footer-top-p">
                {configs.body}
              </p>
            </div>
            <div  id="address" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Địa chỉ</h3>
              <p className="footer-top-p">{configs.address}</p>
            </div>
            <div id="service" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Dịch vụ</h3>
              <p className="footer-top-p">{configs.service}</p>
            </div>
            <div id="hotline" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Hotline</h3>
              <p className="footer-top-p">Hotline: {configs.hotline}</p>
              <p className="footer-top-p">Email: {configs.email}</p>
            </div>
          </div>
        </div>
      </div>
      {/*	Footer	*/}
      <div id="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p style={{textAlign: "center"}}>{configs.register}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*	End Footer	*/}
    </>
  );
};
export default Footer;
