import { Link } from "react-router-dom";
import { images } from "./../assets/categories/index";
import aboutImg from "./../assets/about-img.jpeg";
import map from "./../assets/map.jpeg";

import About from "../components/shared/About";
import LatestReviews from "../components/LatestReviews";

const heading = "Game Review Hub: Strategy and Fun";
const text = `Welcome to NC Games, 
your ultimate source for board game reviews! 
Whether you're a seasoned board game pro or just starting out, 
NC Games has something for everyone. 
So sit back, relax, and let us guide you through the wonderful 
world of board games!`;

const Home = ({ categories }) => {
  const categoryCards = categories.map((category) => {
    const categoryName = category.slug.split("-").join(" ");
    const categoryImg = category.slug.split("-").join("");

    return (
      <div className="category-card" key={category.slug}>
        <img src={images[categoryImg]} alt="" className="category-card__img" />
        <h3 className="category-card__category-name">{categoryName}</h3>
        <Link to={`/category/${category.slug}`}>
          <button className="category-card__btn">View</button>
        </Link>
      </div>
    );
  });

  return (
    <div className="homepage">
      <About img={aboutImg} heading={heading} text={text} />

      <section className="categories">
        <h2 className="categories__heading">Categories</h2>
        <div className="category-cards__container">{categoryCards}</div>
      </section>

      <img src={map} alt="" className="map-img" />

      <LatestReviews />
    </div>
  );
};

export default Home;
