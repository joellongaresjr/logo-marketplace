import { useQuery } from "@apollo/client";
import { QUERY_STORES } from "../../utils/queries";
import { useParams } from "react-router-dom";
import "./stores.css";

const Stores = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_STORES, {
    variables: { _id: id },
  });

  if (loading) return <div>Loading...</div>;
  const stores = data.getStores;
  if (error) return <div>Something Wrong</div>;

  return (
    <div className="store-container">
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>
            <h3>{store.name}</h3>
            <h4>Location: {store.location}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stores;
