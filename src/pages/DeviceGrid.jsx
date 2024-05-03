import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import DeviceCard from "../components/DeviceCard";
import AddForm from "../components/AddForm";
import LoaderAnimation from "../components/LoaderAnimation";
import styled from "@emotion/styled";

const NodeGridContainer = styled(Box)(({ theme }) => ({
  // border: "2px solid black",
  flex: 1,
  padding: 10,
  paddingLeft: 40,
  paddingRight: 40,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

function DeviceGrid({ dialogBox, setDialogBox }) {
  const { id } = useParams();
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 260);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);

  const handleWindowResize = () => {
    setMaxHeight(window.innerHeight - 260);
  };

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/devices?farm_id=${id}`
      );
      const result = await response.json();
      setTimeout(() => {
        setDevices(result.devices);
      }, 1000);

      console.log(result);
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
  });

  useEffect(() => {
    fetchDevices();
  }, []);
  useEffect(() => {
    if (pageRefresh) {
      fetchDevices();
    }
  }, [pageRefresh]);

  return (
    <NodeGridContainer>
      <Typography variant="h5">Installed Devices</Typography>
      <Grid
        container
        gap={5}
        sx={{
          // border: "2px solid red",
          padding: 0,
          maxHeight: `${maxHeight}px`,
          overflow: "auto",
          marginTop: 3,
        }}
      >
        {devices.map((device) => (
          <Grid item>
            <DeviceCard
              id={device.device_id}
              deviceName={device.device_name}
              nodeCount={device.connected_nodes_length}
              powerConsumption={device.power_consumption}
            />
          </Grid>
        ))}
      </Grid>
      <AddForm
        fields={[{ label: "Name" }]}
        title="New Device"
        open={dialogBox}
        setOpen={setDialogBox}
        buttonValue="create"
        apiEndPoint={`http://localhost:8000/admin/create_device`}
        formDataTemplate={{ farmId: id, name: "" }}
        setPageRefresh={setPageRefresh}
      />
      <LoaderAnimation open={loading} />
    </NodeGridContainer>
  );
}

export default DeviceGrid;
