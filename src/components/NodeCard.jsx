import React, { useEffect, useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Switch,
  Button,
} from "@mui/material";

import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { useSocket } from "../provider/Socket";

function NodeCard({
  nodeName,
  nodePin,
  nodeManualControlPin,
  nodePowerConsumption,
  nodeUsageTime,
  nodePrevState,
}) {
  const { socket } = useSocket();
  const [nodeState, setNodeState] = useState(nodePrevState);
  const handleSwitchButton = () => {
    setNodeState(!nodeState);
  };

  const handleSocket = (data) => {
    const { state } = data;
    setNodeState(state);
  };

  useEffect(() => {
    socket.emit(nodeName, { state: nodeState });
  }, [nodeState]);

  useEffect(() => {
    socket.on(nodeName, handleSocket);
    return () => {
      socket.off(nodeName, handleSocket);
    };
  }, []);

  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardMedia
        sx={{ height: 130 }}
        image="https://cdn.pixabay.com/photo/2022/01/10/18/34/service-6929022_640.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {nodeName}
        </Typography>
        <List sx={{ padding: 0 }}>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <ElectricalServicesIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              {nodePin ? `${nodePin} Pin` : `Not Defined`}
            </ListItemText>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <PowerRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              {nodePowerConsumption ? nodePowerConsumption : 0} W Power
            </ListItemText>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <AccessTimeRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              {nodeUsageTime ? nodeUsageTime : 0} Hour Time
            </ListItemText>
          </ListItem>
        </List>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 0,
        }}
      >
        <Button variant="contained" size="small">
          Manage
        </Button>
        <Switch
          color="primary"
          checked={nodeState}
          onChange={handleSwitchButton}
        />
      </CardActions>
    </Card>
  );
}

export default NodeCard;
