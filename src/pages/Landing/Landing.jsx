import CarouselEffect from "../../components/Carousel/CarouselEffect";
import Product from "../../components/Product/Product";
import Category from "../../components/Catagory/Catagory";
import Layout from "../Layout/Layout";

const Landing = () => {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
};

export default Landing;
