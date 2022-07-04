import React from "react";
import TeamsList from "../components/TeamsList";

const HomePage = () => {
  return (
    <div className="container mt-5">
      <h3 className="text-center">Premier Soccer League 2021/2022</h3>
      <div>
        <TeamsList />
      </div>
    </div>
  );
};

export default HomePage;
