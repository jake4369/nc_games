const NotFound = ({ img, heading, text }) => {
  return (
    <section className="not-found">
      <img src={img} alt="" className="not-found__img" />
      <div className="not-found__text">
        <h1 className="not-found__heading">404: {heading}</h1>
        <p className="not-found__description">{text}</p>
      </div>
    </section>
  );
};

export default NotFound;
