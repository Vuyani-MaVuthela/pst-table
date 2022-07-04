import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PslTeamsApi from "../apis/PslTeamsApi";
import { TeamsContext } from "../context/TeamsContext";
import LoadingSpinner from "./LoadingSpinner";
import AlertDismissible from "./AlertDismissible";

const AddTeam = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { addTeam } = useContext(TeamsContext);

  const [team_name, setTeamName] = useState("");
  const [played, setPlayed] = useState(0);
  const [points, setPoints] = useState(0);
  const [goal_d, setGoal_d] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      PslTeamsApi.get(`/${id}`)
        .then((resp) => {
          setIsLoading(false);
          setHasError(false);
          setTeamName(resp.data[0].team_name);
          setPlayed(resp.data[0].played || 0);
          setPoints(resp.data[0].points || 0);
          setGoal_d(resp.data[0].goal_d || 0);
        })
        .catch((err) => {
          setIsLoading(false);
          setHasError(true);
          setErrMsg("Could not get team data. Please try again");
          console.log(err);
        });
    };

    if (id) {
      fetchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!id) {
      PslTeamsApi.post("/", {
        team_name,
        played,
        points,
        goal_d,
      })
        .then((resp) => {
          setIsLoading(false);
          addTeam(resp.data[0]);
          setHasError(false);
          clear();
        })
        .catch((err) => {
          setIsLoading(false);
          setHasError(true);
          setErrMsg("Could not send team data. Please try again");
          console.log(err);
        });
    } else {
      PslTeamsApi.put(`/${id}`, {
        team_name,
        played,
        points,
        goal_d,
      })
        .then(() => {
          setIsLoading(false);
          navigate(`/`);
        })
        .catch((err) => {
          setIsLoading(false);
          setHasError(true);
          setErrMsg("Could not send team data. Please try again");
          console.log(err);
        });
    }
  };

  const clear = () => {
    setTeamName("");
    setPlayed(0);
    setPoints(0);
    setGoal_d(0);
  };

  const handleDone = () => {
    navigate(`/`);
  };

  return (
    <>
      <div>
        {isLoading && (
          <div className="mt-3 mb-5">
            <LoadingSpinner />
          </div>
        )}

        <div className="mt-4 d-flex justify-content-center">
          <form onSubmit={handleSubmit} action="">
            <div className="form-group row">
              <label htmlFor="txtTeamName">Team Name</label>
              <input
                id="txtTeamName"
                type="text"
                value={team_name}
                onChange={(e) => setTeamName(e.target.value)}
                className="form-control"
                placeholder="team name"
              />
            </div>
            <div className="form-group row mt-2">
              <label htmlFor="sel_Played">Played</label>
              <input
                id="sel_Played"
                type="number"
                value={played}
                onChange={(e) => setPlayed(e.target.value)}
                className="form-control"
                min="0"
                max="30"
              />
            </div>
            <div className="form-group row mt-2">
              <label htmlFor="txtPoints">Points</label>
              <input
                id="txtPoints"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="form-control"
                min="0"
              />
            </div>
            <div className="form-group row mt-2">
              <label htmlFor="txtGoal_d">Goal Difference</label>
              <input
                id="txtGoal_d"
                type="number"
                value={goal_d}
                onChange={(e) => setGoal_d(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group row mt-4">
              <button type="submit" className="btn btn-primary">
                {!id ? "Add" : "Update"}
              </button>
            </div>
            <div className="form-group row mt-1">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleDone()}
              >
                Done
              </button>
            </div>
          </form>
        </div>
        {hasError && (
          <div className="mt-3">
            <AlertDismissible message={errMsg} />
          </div>
        )}
      </div>
    </>
  );
};

export default AddTeam;
