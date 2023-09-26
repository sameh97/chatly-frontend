import React from "react";
import { Paper, Text } from "@mantine/core";

const Message = ({ message }) => {
  return (
    <Paper padding="xs" radius="sm" style={{ marginBottom: "10px" }}>
      <Text size="sm" color="gray" style={{ wordWrap: "break-word" }}>
        {message.content}
      </Text>
    </Paper>
  );
};

export default Message;
