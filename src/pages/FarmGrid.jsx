import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Stack,
  IconButton,
  Toolbar,
  Input,
  Button,
  Typography,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
} from "@mui/material";

//components
import FarmCard from "../components/FarmCard";
import AddForm from "../components/AddForm";
import styled from "@emotion/styled";
import LoaderAnimation from "../components/LoaderAnimation";
import CustomSnackBar from "../components/CustomSnackBar";

const FarmGridContainer = styled(Box)(({ theme }) => ({
  // border: "2px solid black",
  width: "100%",
  flex: 1,
  padding: 10,
  paddingLeft: 40,
  paddingRight: 40,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

function FarmGrid({ dialogBox, setDialogBox }) {
  const [pageRefresh, setPageRefresh] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleWindowResize = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };
  const fetchFarms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/farms`);
      const result = await response.json();
      setTimeout(() => {
        setFarms(result.farms);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setPageRefresh(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    fetchFarms();
    console.log("called");
  }, []);

  useEffect(() => {
    if (pageRefresh) {
      fetchFarms();
    }
  }, [pageRefresh]);

  return (
    <FarmGridContainer>
      <Typography variant="h5">Deployed Farms</Typography>
      <Grid
        container
        gap={5}
        sx={{
          // border: "10px solid red",
          maxHeight: `${windowHeight - 260}px`,
          // width: "100%",
          padding: 0,
          overflow: "auto",
          marginTop: 3,
        }}
      >
        {farms?.map((farm, index) => (
          <Grid item>
            <FarmCard
              id={farm.farm_id}
              name={farm.farm_name}
              deviceCount={farm.farm_device_count}
              powerConsumption={farm.farm_power_consumption}
              waterConsumption={farm.farm_water_consumption}
            />
          </Grid>
        ))}
      </Grid>
      <AddForm
        fields={[{ label: "Farm Name" }]}
        title="New Farm"
        open={dialogBox}
        setOpen={setDialogBox}
        buttonValue="create"
        apiEndPoint={`${process.env.REACT_APP_API_URL}/create_farm`}
        formDataTemplate={{ name: "" }}
        setPageRefresh={setPageRefresh}
      />
      <LoaderAnimation open={loading} />
    </FarmGridContainer>
  );
}

export default FarmGrid;
