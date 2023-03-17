import NotFound from "../components/shared/NotFound";
import img from "./../assets/404.jpeg";

const PathNotFound = () => {
  return (
    <div>
      <NotFound
        img={img}
        heading="Path not found"
        text="🎲 You rolled a 404, go back one step"
      />
    </div>
  );
};

export default PathNotFound;
