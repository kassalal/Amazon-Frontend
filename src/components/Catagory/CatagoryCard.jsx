import { Link } from "react-router-dom";
import css from "./Catagory.module.css";
const CategoryCard = ({ data }) => {
  console.log(data);
  return (
    <div className={css.catagory}>
      <Link to={`/category/${data?.category}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt={data.name} />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
