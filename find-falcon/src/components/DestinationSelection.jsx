import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function DestinationSelection({
  planets,
  handleChange,
  selectedDestinations,
  setSelectedPlanet,
}) {
  return (
    <>
      <ToggleButtonGroup
        value={selectedDestinations}
        onChange={handleChange}
        aria-label="select destination"
      >
        {planets.map((planet) => {
          return (
            <ToggleButton
              onClick={() => setSelectedPlanet(planet)}
              value={planet.name}
              style={{
                textTransform: "capitalize",
                margin: "5px",
                height: "32px",
                fontSize: "14px",
                backgroundColor: selectedDestinations.includes(planet.name)
                  ? "black"
                  : "white",
                color: selectedDestinations.includes(planet.name)
                  ? "white"
                  : "black",
              }}
              key={planet.name}
            >
              {planet.name}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
}
