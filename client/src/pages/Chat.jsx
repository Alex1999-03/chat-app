import { Fragment } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  List,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useSendMessage from "../hooks/useSendMessage";
import "../styles/Chat.css";
import useGetMessages from "../hooks/useGetMessages";
import ListChatMessages from "../components/ListChatMessages";
import { useFormik } from "formik";

export default function Chat() {
  const { messages, chatviewRef } = useGetMessages();
  const { onSendMessage } = useSendMessage();

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: onSendMessage,
  });

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box mt={3} p={3}>
            <Typography variant="h4" gutterBottom>
              Chat
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid xs={12} item>
                <List id="chatview-container" ref={chatviewRef}>
                  <ListChatMessages messages={messages} />
                </List>
              </Grid>
              <Grid
                component={"form"}
                onSubmit={formik.handleSubmit}
                container
                item
                spacing={4}
                alignItems="center"
              >
                <Grid xs={11} item>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      required
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      name="text"
                      type={"text"}
                      label="Mensaje"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid xs={1} item>
                  <IconButton
                    type="submit"
                    aria-label="send"
                    color="primary"
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}
