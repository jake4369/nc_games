import img from "./../assets/serverError.png";
import About from "../components/shared/About";

const ServerError = () => {
  return (
    <div>
      <About img={img} heading="500: Server error" />
    </div>
  );
};

export default ServerError;
