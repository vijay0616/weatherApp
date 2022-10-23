import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Moment from "react-moment";
import "moment-timezone";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import "../Dashboard/index.css";

export default function WeatherDetails() {
  const { state } = useLocation();
  const { weatherData, iconName, background } = state;
  return (
    <div
      style={{
        //just done with inline styling
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 10,
      }}
    >
      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          className={background}
          title={`${weatherData.name} - ${weatherData.weather[0]?.main}`}
          subheader={
            <Moment format="dddd, MMMM, D" utc={weatherData.timezone}></Moment>
          }
        />
        <CardMedia
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <img
            src={`/Icons/${iconName}.svg`}
            style={{ height: 100 }}
            alt="weatheIcon"
          />
          <h1 style={{ fontSize: 40 }}>{weatherData.main?.temp}°</h1>
        </CardMedia>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Wind Speed</TableCell>
                  <TableCell align="right">Temperature(&nbsp;min)</TableCell>
                  <TableCell align="right">Temperature&nbsp;(max)</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {weatherData.wind?.speed}
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    {weatherData.main?.temp_min}°
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    {weatherData.main?.temp_max}°
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {weatherData.coord?.lat}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {weatherData.coord?.lon}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
