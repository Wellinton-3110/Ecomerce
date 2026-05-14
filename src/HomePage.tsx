import { Items } from "../components/body/Items";
import { SearchForm } from "../components/header/SearchForm";

const HomePage = ({ count, setCount }) => {
  return (
    <div>
      <SearchForm />
      <Items count={count} setCount={setCount} />
    </div>
  );
};

export default HomePage;
