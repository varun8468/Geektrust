import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./FindFalconPage.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import axios from "axios";
import { config } from "../App";
import DestinationSelection from "../components/DestinationSelection";
import { useHistory } from "react-router-dom";

export default function FindFalconPage() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState({});
  const [timeTaken, setTimeTaken] = useState(0);
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);

  const history = useHistory();

  async function getAllPlanets() {
    try {
      let response = await axios.get(`${config.endpoint}/planets`);
      if (response.status === 200) {
        setPlanets(response.data);
      }
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function getToken() {
    const headers = {
      Accept: "application/json",
    };
    try {
      let response = await axios.post(
        `${config.endpoint}/token`,
        {},
        { headers: headers }
      );
      setToken(response.data.token);
    } catch (e) {
      console.log(e.reponse.data);
    }
  }

  async function getAllVehicles() {
    try {
      let response = await axios.get(`${config.endpoint}/vehicles`);
      if (response.status === 200) {
        setVehicles(response.data);
        return response.data;
      }
    } catch (e) {
      console.log(e.response.data);
    }
  }

  useEffect(() => {
    getAllPlanets();
    getAllVehicles();
    getToken();
  }, []);

  function reset() {
    setSelectedDestinations([]);
    setSelectedVehicles([]);
    setVehicles(getAllVehicles());
    setTimeTaken(0);
  }

  function getButton() {
    return (
      <Button
        onClick={reset}
        variant="contained"
        startIcon={<RestartAltIcon />}
      >
        Reset
      </Button>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (vehicle) => {
    if (selectedPlanet.distance <= vehicle.max_distance) {
      selectedVehicles.push(vehicle.name);
      vehicle.total_no -= 1;
      computeTime(vehicle);
      setOpen(false);
    } else alert("Vehicle can't react to this planet");
  };

  const computeTime = (vehicle) => {
    if (selectedPlanet.distance <= vehicle.max_distance) {
      let time = selectedPlanet.distance / vehicle.speed;
      setTimeTaken(timeTaken + time);
    } else alert("Vehicle can't react to this planet");
  };

  function handleDestination(e, destinations) {
    if (destinations.length <= 4) {
      setSelectedDestinations(destinations);
      if (!selectedDestinations.includes(e.target.value)) {
        handleClickOpen();
      }
    } else {
      alert("Cannot select more than four destinations..");
    }
  }

  async function findFalcone() {
    let dataObject = {
      token: token,
      planet_names: selectedDestinations,
      vehicle_names: selectedVehicles,
    };
    const headers = {
      Accept: "application/json",
    };
    if (
      dataObject.planet_names.length === 4 &&
      dataObject.vehicle_names.length === 4
    ) {
      try {
        let response = await axios.post(`${config.endpoint}/find`, dataObject, {
          headers: headers,
        });
        if (response.status === 200) {
          history.push({
            pathname: "/result",
            state: {
              res: response.data,
              time: timeTaken,
            },
          });
        }
      } catch (e) {
        console.log(e.reponse);
      }
    } else alert("Please select 4 destinations");
  }
  return (
    <>
      <Header button={getButton()} />
      <div className="container">
        <Typography variant="h6">Select any four destinations below</Typography>
        <DestinationSelection
          planets={planets}
          handleChange={handleDestination}
          selectedDestinations={selectedDestinations}
          setSelectedPlanet={setSelectedPlanet}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select Vehicle</DialogTitle>
          <DialogContent>
            {vehicles.length
              ? vehicles.map((vehicle) => {
                  return (
                    <ListItemButton
                      sx={{
                        display: vehicle.total_no <= 0 ? "none" : "block",
                      }}
                      key={vehicle.name}
                      onClick={() => handleClose(vehicle)}
                    >
                      <ListItemText style={{ width: "20vw" }}>
                        <div className="list-container">
                          <div className="vehicles">{vehicle.name}</div>
                          <div className="vehicle-no">{vehicle.total_no}</div>
                        </div>
                      </ListItemText>
                    </ListItemButton>
                  );
                })
              : ""}
          </DialogContent>
        </Dialog>
        <div className="time-container">
          <Typography variant="h6">Total time taken = {timeTaken}</Typography>
        </div>

        <div className="btn-container">
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={findFalcone}
          >
            Find Falcone
          </Button>
        </div>
      </div>
    </>
  );
}
