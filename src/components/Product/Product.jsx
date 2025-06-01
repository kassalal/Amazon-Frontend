import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import css from "./Product.module.css";
import Loader from "../Loader/Loader";
const Product = () => {
  let [products, setProducts] = useState();
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className={css.products__container}>
      {products?.map((singleProduct) => {
        return <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true} />;
      })}
    </section>
  );
};

export default Product;
