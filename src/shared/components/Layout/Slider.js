import { getSliders } from "../../../services/Api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getImageProduct } from "../../ultils";
const Slider = () => {
  const [sliders, setSliders] = useState([])
  useEffect(() => {
    getSliders({})
      .then(({ data }) => {
        setSliders(data.data.docs)
      })
  }, [])
  return (
    <>
    {/* Slider */}
    <div id="slide" className="carousel slide" data-ride="carousel">
      {/* Indicators */}
      <ul className="carousel-indicators">
        {sliders.map((slider, i) => (
          slider.status && (
            <li
              key={i}
              data-target="#slide"
              data-slide-to={i}
              className={i === 0 ? 'active' : ''}
            />
          )
        ))}
      </ul>

      {/* The slideshow */}
      <div className="carousel-inner">
        {sliders.map((slider, index) => (
          slider.status && (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <Link to={slider.url}>
                <img
                  src={getImageProduct(slider.image)}
                  alt="SmartPhone"
                  style={{ borderRadius: '10px' }}
                  className="d-block w-100"
                />
              </Link>
            </div>
          )
        ))}
      </div>

      {/* Left and right controls */}
      <a className="carousel-control-prev" href="#slide" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#slide" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
    {/* End Slider */}
  </>
  );
};
export default Slider;
