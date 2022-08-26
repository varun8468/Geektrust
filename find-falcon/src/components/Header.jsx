import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ button }) {
  return (
    <Stack
      style={{ backgroundColor: "#c0dbe2", height: "10vh" }}
      display="flex"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
    >
      <Link to="/" style={{textDecoration:'none', color:'black'}}>
        <Box>
          <Typography variant="h5">FINDING FALCONE</Typography>
        </Box>
      </Link>
      <Box>{button}</Box>
    </Stack>
  );
}
