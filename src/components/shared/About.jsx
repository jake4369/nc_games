const About = ({ img, heading, text }) => {
  return (
    <section className="about-section">
      <img src={img} alt="" className="about-section__img" />
      <div className="about-section__text">
        <h2 className="about-section__heading">{heading}</h2>
        <p className="about-section__description">{text}</p>
      </div>
    </section>
  );
};

export default About;
