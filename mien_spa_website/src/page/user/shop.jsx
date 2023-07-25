import * as React from "react";
import Appbar from "../../component/user/shop/appbar";
import Footer from "../../component/user/home/footer";
import Shop from "../../component/user/shop/shop";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/product/productThunk";
import { fetchCategories } from "../../redux/category/cateThunk";

const ShopPage = () => {
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

  }, [dispatch]);

  return (
    <>
      <Appbar></Appbar>
      <Shop></Shop>
      <Footer></Footer>
    </>
  );
};
export default ShopPage;
