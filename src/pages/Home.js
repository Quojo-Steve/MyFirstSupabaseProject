import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [Fetcherror, setError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies") //table name
        .select(); //fetch everything
      if (error) {
        setError("Could not fetch");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setError(null);
      }
    };

    fetchSmoothies();
  }, []);
  return (
    <div className="page home">
      {Fetcherror && <p>{Fetcherror}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* Order by buttons */}
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
