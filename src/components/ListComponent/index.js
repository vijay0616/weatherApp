import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./index.css";

export default function ListComponent(props) {
  const { data, selectedIndex, displayKey, handleListItemClick } = props;
  return (
    <List>
      {data.map((list, i) => (
        <ListItem disablePadding key={i}>
          <ListItemButton
            selected={selectedIndex === list[displayKey]}
            onClick={(e) => handleListItemClick(e, list)}
          >
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary={list[displayKey]} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
