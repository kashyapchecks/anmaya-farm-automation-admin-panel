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
import NodeCard from "../components/NodeCard";
import NodeAddForm from "../components/NodeAddForm";
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

function NodeGrid({ dialogBox, setDialogBox }) {
  const { id } = useParams();
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 260);
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [nodePins, setNodePins] = useState([]);
  const [nodeManualControlPins, setNodeManualControlPins] = useState([]);
  const [nodeStates, setNodesStates] = useState([]);

  const handleWindowResize = () => {
    setMaxHeight(window.innerHeight - 260);
  };

  const fetchNodes = async (req, res) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/nodes?device_id=${id}`
      );
      const result = await response.json();
      if (response.status === 200) {
        console.log(result);
        setTimeout(() => {
          setNodes(result.nodes);
          setNodePins(result.available_node_pins);
          setNodeManualControlPins(result.available_node_manual_control_pins);
          setNodesStates(result.state);
        }, 1000);
      } else {
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setPageRefresh(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  useEffect(() => {
    if (pageRefresh) {
      fetchNodes();
    }
  }, [pageRefresh]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <NodeGridContainer>
      <Typography variant="h5">Connected Nodes</Typography>
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
        {nodes.map((node) => (
          <Grid item>
            <NodeCard
              nodeName={node.name}
              nodePin={node.node_pin}
              nodeManualControlPin={node.node_manual_control_pin}
              nodePowerConsumption={node.power_consumption}
              nodeUsageTime={node.usage_time}
              nodePrevState={node.state}
            />
          </Grid>
        ))}
      </Grid>
      <NodeAddForm
        id={id}
        open={dialogBox}
        setOpen={setDialogBox}
        nodePins={nodePins}
        nodeManualControlPins={nodeManualControlPins}
        apiEndPoint={`${process.env.REACT_APP_API_URL}/create_node`}
        setPageRefresh={setPageRefresh}
      />
      <LoaderAnimation open={loading} />
    </NodeGridContainer>
  );
}

export default NodeGrid;
