import FeaturedSection from "components/Content/FeaturedSection"
import HeroSlider from "components/Hero/HeroSlider"
import ProductList from "components/Content/ProductList"
const Home = () => {
  return (
    <>
      <HeroSlider />
      <FeaturedSection />
      <ProductList />
    </>
  )
}

export default Home