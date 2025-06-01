import axios from "axios";
import React, { useEffect, useState } from "react";
import productUrl from "../../api/baseUrl";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import css from "./Results.module.css";
import Loader from "../../components/Loader/Loader";
const Results = () => {
  let [results, setResults] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let { categoryName } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  console.log(categoryName);
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
          <hr />
          <div className={css.products__container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} renderAdd={true} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Results;
