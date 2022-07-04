import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TeamsContextProvider } from "./context/TeamsContext";

import HomePage from "./pages/HomePage";
import AddTeamPage from "./pages/AddTeamPage";
import UpdatePage from "./pages/UpdatePage";

const App = () => {
  return (
    <TeamsContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/psl-teams/add" element={<AddTeamPage />} />
            <Route path="/psl-teams/:id/update" element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </TeamsContextProvider>
  );
};

export default App;
