import React from "react";
import "./ResultPage.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Button, Typography } from "@mui/material";
import "./ResultPage.css";

export default function ResultPage() {
  const history = useHistory();
  const location = useLocation();
  let foundOnPlanet = location.state.res.planet_name;

  function succeed() {
    if (location.state.res.status === "success") {
      return true;
    }
    return false;
  }

  return (
    <>
      <Header />
      <div className="container">
        {succeed() ? (
          <Typography variant="h4" color="green">
            Success! Congratulation on finding falcone. King Shan is mighty
            pleased.
          </Typography>
        ) : (
          <Typography variant="h4" color="red">
            Sorry! couldn't find falcone
          </Typography>
        )}
        <Typography variant="h6">Time taken = {location.state.time}</Typography>
        {succeed() ? (
          <Typography variant="h4">Falcone found on {foundOnPlanet}</Typography>
        ) : (
          <Button variant="contained" onClick={() => history.push("/")}>
            Try again
          </Button>
        )}
      </div>
    </>
  );
}
