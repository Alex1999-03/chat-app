import React from "react";
import { ListItem, ListItemText } from "@mui/material";

const ListChatMessages = ({ messages }) => {
  return messages.map((message) => {
    return (
      <ListItem key={message.id}>
        <ListItemText
          primary={`${message.firstName} ${message.lastName}`}
          secondary={message.text}
        />
      </ListItem>
    );
  });
};

export default ListChatMessages;
