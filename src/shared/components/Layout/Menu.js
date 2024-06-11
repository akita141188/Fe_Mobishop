import React, {useState, useEffect} from "react";
import { getCategories } from "../../../services/Api";
import { Link } from "react-router-dom";
const Menu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    getCategories({})
      .then(({data})=>{
        setCategories(data.data.docs);
      });
  }, []);
  return (
    <nav>
      <div id="menu" style={{borderRadius: "0 0 5px 5px", background: "#00483d"}} className="collapse navbar-collapse">
        <ul>
          {
            categories.map((category)=>
            <li className="menu-item">
              <Link to={`/Category-${category._id}`}>{category.title}</Link>
            </li>
            )
          }
          
        </ul>
      </div>
    </nav>
  );
};
export default Menu;
