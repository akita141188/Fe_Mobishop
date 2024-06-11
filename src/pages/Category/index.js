import React, {useState, useEffect} from "react";
import { getProductsCategory, getCategory } from "../../services/Api";
import { useParams, useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";
const Category = () => {
  const limit = 9;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pages, setPages]= useState({limit})
  const page = Number(searchParams.get("page")) || 1;

  useEffect(()=>{
    getCategory(id, {})
      .then(({data})=>{
        setCategory(data.data.title);
      });

    getProductsCategory(id, {
      params : {
        page,
        limit
      }
    })
      .then(({data})=>{
        setTotal(data.data.pages.total);
        setProducts(data.data.docs);
        setPages({...pages,...data.data.pages})
      });
  }, [id,page]);

  return (
    <div>
      {/*	List Product	*/}
      <div className="products">
        <h3>{category} (hiện có {total} sản phẩm)</h3>
        <div className="product-list card-deck">
          {
            products.map((product)=>
              <ProductItem item={product}/>
            )
          }
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
      <Pagination pages={pages}/>
      </div>
    </div>
  );
};
export default Category;
