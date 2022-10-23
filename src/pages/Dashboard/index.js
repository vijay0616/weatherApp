import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { CityContext } from "../../contexts/CityContext";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import TextInputComponent from "../../components/TextInputComponent";
import ListComponent from "../../components/ListComponent";
import Moment from "react-moment";
import "moment-timezone";
import { STATIC_STYLE_DATA } from "../../static/StaticData";
import "./index.css";

export default function Dashboard() {
  const { cities, dispatch } = useContext(CityContext);
  const [citySelected, setCitySelected] = useState("New York");
  const [location, setLocation] = useState("");
  const [err, setErr] = useState("");
  const [weatherData, setWeatherData] = useState({
    weather: [],
    main: {},
    timezone: 19800,
  });
  const [iconName, setIconName] = useState("Sun");
  const [fetchLocation, setFetchLocation] = useState("New York");
  const [flag, setFlag] = useState(false);
  const [background, setBackGround] = useState("sunny");
  const [navigate, setNavigate] = useState(false);
  const changeCity = (e, val) => {
    setCitySelected(val.city);
    setFetchLocation(val.city);
  };

  const addCityToList = () => {
    setCitySelected(location);
    setFetchLocation(location);
    setLocation("");
  };

  useEffect(() => {
    setFlag(true);
  }, []);

  useEffect(() => {
    if (flag) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${fetchLocation}&units=metric&APPID=6dc117b66b6e76ce57bb6fb0ac1fad35`
      )
        .then((response) => response.text())
        .then((result) => {
          const responseData = JSON.parse(result);
          if (responseData.cod === 200) {
            const city = cities.filter((data) => data.city === fetchLocation);
            if (city.length === 0) {
              dispatch({
                type: "ADD_CITY",
                payload: { location: fetchLocation },
              });
            }
            setWeatherData(responseData);
          } else {
            setErr(responseData.message);
            setTimeout(() => {
              setErr("");
            }, 3000);
          }
        })
        .catch((error) => setErr(error.message));
      setFlag(true);
    }
  }, [fetchLocation, flag, cities, dispatch]);

  useEffect(() => {
    const details = STATIC_STYLE_DATA[weatherData.weather[0]?.icon];
    setIconName(details?.icon);
    setBackGround(details?.background);
  }, [weatherData]);

  return (
    <React.Fragment>
      <Box className="dashboard">
        <Grid container direction={"column"}>
          <Grid item>
            <Paper className={`weatherHeader ${background}`}>
              My Weather
            </Paper>
          </Grid>
          <Grid item xs={12} padding={2}>
            <Paper className="weatherBody">
              <Grid container spacing={0}>
                <Grid item xs={0} md={3} lg={3}></Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextInputComponent
                    id={"cityName"}
                    label={"Location"}
                    variant={"outlined"}
                    inputValue={location}
                    endAdornment={
                      <InputAdornment position="end" onClick={addCityToList}>
                        <span style={{ fontWeight: "bold" }}>SET</span>
                      </InputAdornment>
                    }
                    handleChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={0} md={3} lg={3}></Grid>
              </Grid>
              {err !== "" && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setErr("");
                  }}
                >
                  {err}
                </Alert>
              )}
              <Grid container spacing={5}>
                <Grid item xs={0} md={2} lg={2}></Grid>
                <Grid item xs={12} md={4} lg={4}>
                  {navigate && (
                    <Navigate
                      to={"/weather-deatils"}
                      state={{ weatherData, iconName, background }}
                    />
                  )}
                  <Card
                    className="weatherCardContainer"
                    onClick={() => setNavigate(true)}
                  >
                    <CardContent>
                      <div className="weatherCard">
                        <div className="weatherIconSection">
                          <img
                            src={`/Icons/${iconName}.svg`}
                            className="weatherIcon"
                            alt="weatheIcon"
                          />
                        </div>
                        <div className="weatherDetailsSection">
                          <div className="degree">
                            {weatherData.main?.temp}°
                          </div>
                          <div className="weatherName">
                            {weatherData.weather[0]?.main}
                          </div>
                          <div className="cityName">
                            <Moment
                              format="dddd, MMMM, D"
                              utc={weatherData.timezone}
                            ></Moment>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Card className="cityListContainer">
                    <h4 style={{ textAlign: "center" }}>My Locations</h4>
                    <div className="cityListSection">
                      <div className="cityList">
                        <ListComponent
                          data={cities}
                          selectedIndex={citySelected}
                          displayKey={"city"}
                          handleListItemClick={changeCity}
                        />
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={0} md={2} lg={2}></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
