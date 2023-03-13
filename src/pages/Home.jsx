import About from "../components/shared/About";
import aboutImg from "./../assets/about-img.jpeg";

const Home = () => {
  const heading = "Game Review Hub: Strategy and Fun";
  const text = `Welcome to NC Games, 
  your ultimate source for board game reviews! 
  Whether you're a seasoned board game pro or just starting out, 
  NC Games has something for everyone. 
  So sit back, relax, and let us guide you through the wonderful 
  world of board games!`;

  return (
    <div className="homepage">
      <About img={aboutImg} heading={heading} text={text} />
    </div>
  );
};

export default Home;
