import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Test from "./Test";

function SensorLogs() {
  const data = [
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
    {
      date: "12/2/2024",
      time: "12:69:12 PM",
      temperature: "30",
      humidity: "40",
    },
  ];
  return (
    <Box>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Temperature in °C</TableCell>
              <TableCell align="center">Humidity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.temperature}</TableCell>
                <TableCell align="center">{row.humidity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Test />
    </Box>
  );
}

export default SensorLogs;
