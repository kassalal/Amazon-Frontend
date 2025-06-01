import Data from "./Data";
import CatagoryCard from "./CatagoryCard";
import css from "./Catagory.module.css";
const Catagory = () => {
  return (
    <div className={css.catagory__container}>
      {Data.map((item, index) => (
        <CatagoryCard key={index} data={item} />
      ))}
    </div>
  );
};

export default Catagory;
