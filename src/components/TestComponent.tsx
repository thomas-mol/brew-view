import useReviews from "../hooks/useReviews";
import CategorySelector from "./Filter/CategorySelector";
import NavigationBar from "./Navigation/NavigationBar";
import TestCard from "./TestCard";
import "./TestComponent.css";

const TestComponent = () => {
  const { data: reviews, error, isLoading } = useReviews();

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="home-heading">
        <h1>
          <em>Brew</em>View
        </h1>
      </div>
      <CategorySelector />
      <div className="grid">
        {reviews?.map((review) => (
          <TestCard key={review.id} review={review} />
        ))}
      </div>
      <NavigationBar />
    </>
  );
};

export default TestComponent;
