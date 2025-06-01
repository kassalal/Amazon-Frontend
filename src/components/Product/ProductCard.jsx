import { Rating } from "@mui/material";
import css from "./Product.module.css";

import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import Type from "../../utility/action.type";

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  if (!product) return null;
  let { image, title, id, rating, price, description } = product;
  let [state, dispatch] = useContext(DataContext);
  let addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };
  console.log(state);
  // console.log(product);
  return (
    <div
      className={`${css.card__container}  ${flex ? css.product__flexed : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div className={css.renderDesc}>{description}</div>}
        <div className={css.rating}>
          {/* Rating  */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* Rating Counter  */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price  */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={css.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
