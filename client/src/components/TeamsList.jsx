import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import PslTeamsApi from "../apis/PslTeamsApi.js";
import { TeamsContext } from "../context/TeamsContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import AlertDismissible from "./AlertDismissible";

const TeamsList = (props) => {
  const { pslTeams, setTeams } = useContext(TeamsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      PslTeamsApi.get("/")
        .then((resp) => {
          setIsLoading(false);

          setHasError(false);
          resp.data.rows.sort(function (a, b) {
            if (a.points === b.points) {
              return b.goal_d - a.goal_d;
            }
            return a.points < b.points ? 1 : -1;
          });
          setTeams(resp.data.rows);
        })
        .catch((err) => {
          setIsLoading(false);
          setHasError(true);
          setErrMsg("Could not get teams data. Please try again");
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    navigate(`/psl-teams/add`);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    PslTeamsApi.delete(`/${id}`)
      .then(() => {
        setIsLoading(false);
        setTeams(
          pslTeams.filter((pslTeam) => {
            return pslTeam.team_id !== id;
          })
        );
        setHasError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
        setErrMsg("Could not delete item. Please try again");
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/psl-teams/${id}/update`);
  };

  return (
    <div className="container">
      {hasError && (
        <div className="mt-3">
          <AlertDismissible message={errMsg} />
        </div>
      )}

      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}

      <div className="float-end">
        <button
          onClick={() => handleAdd()}
          disabled={pslTeams.length >= 16}
          className="btn-primary"
        >
          Add Team
        </button>
      </div>

      <>
        {pslTeams.length > 0 ? (
          <div>
            <table className="table table-dark table-hover  table-sm">
              <thead>
                <tr className="bg-primary">
                  <th scope="col">#</th>
                  <th scope="col">Team</th>
                  <th scope="col">Pl</th>
                  <th scope="col">Pts</th>
                  <th scope="col">GD</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {pslTeams.map((pslTeam, i) => {
                  return (
                    <tr key={pslTeam.team_id}>
                      <th scope="row">{i + 1}</th>
                      <td> {pslTeam.team_name} </td>
                      <td> {pslTeam.played} </td>
                      <td> {pslTeam.points} </td>
                      <td> {pslTeam.goal_d} </td>
                      <td>
                        <label
                          onClick={() => handleEdit(pslTeam.team_id)}
                          className="table-buttons"
                        >
                          Edit
                        </label>
                      </td>
                      <td>
                        <label
                          onClick={() => handleDelete(pslTeam.team_id)}
                          className="table-buttons"
                        >
                          Delete
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h5>No teams data.</h5>
        )}
      </>
    </div>
  );
};

export default TeamsList;
