import Chart from "../../components/chart/Chart.jsx";
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods.js";

export default function Home() {
  const [ userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

    useEffect(() => {
      const getStats = async () => {
        try{
          const res = await userRequest.get("/users/stats");
          res.data.map((item)=>{
            setUserStats((prev)=>[
              ...prev,
              {name:MONTHS[item._id-1], "New Users": item.total},
            ])
          });
        }catch{}
      };
      getStats();
    
    },[MONTHS]);

    
    useEffect(() => {
      const firstLoad = localStorage.getItem("firstLoad");
      if (firstLoad === null) {
        localStorage.setItem("firstLoad", "true");
        window.location.reload();
      } else {
        localStorage.removeItem("firstLoad");
      }
    }, []);

  return (
    <div className="home">
      <Chart data={userStats} title={"User Analytics"} grid dataKey="New Users" />
    </div>
  )
}
