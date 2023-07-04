import React, { useContext, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TaskContext from "./TaskContext";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TaskForm() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(new Date());
  const [error, setError] = useState(false);
  const { onAddTask } = useContext(TaskContext);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
    if (event.target.value !== "") {
      setError(false);
    }
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDueDateChange = (date) => {
    if (date >= new Date()) {
      setDueDate(date);
    }
  };

  const handleAddTask = () => {
    if (task === "") {
      setError(true);
      return;
    }
    const newTask = {
      task,
      priority,
      status: "Pending",
      dueDate: dueDate.toISOString().slice(0, 10),
    };
    onAddTask(newTask);
    setOpen(true);
    setTask("");
    setPriority("Low");
    setDueDate(new Date());
  };

  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Task Added Successfully!
          </Alert>
        </Snackbar>
      </Stack>
      <TaskContext.Consumer>
        {(context) => (
          <div>
            <div>
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontFamily: "serif",
                  fontWeight: "bold",
                  margin: "5px",
                  padding: "3px",
                  borderRadius: "10%",
                  textShadow: "0 0 3px #FF0000, 0 0 5px #0000FF",
                }}
              >
                Task List
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "20px",
                marginLeft: "20%",
                marginRight: "20%",
              }}
            >
              <div style={{ flexGrow: "1", flexBasis: "60%" }}>
                <TextField
                  label="Task"
                  value={task}
                  onChange={handleTaskChange}
                  fullWidth
                  error={error}
                  helperText={error && "Task can not be empty"}
                  sx={{ borderColor: error ? "red" : "inherit" }}
                />
              </div>
              <div style={{ flexGrow: "1", flexBasis: "5%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    label="Priority"
                    defaultValue="Low"
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Mid">Mid</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ flexGrow: "1", flexBasis: "15%" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={handleDueDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </div>
              <div>
              <Tooltip title="Add Task">
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={handleAddTask}
                  sx={{ marginTop: "-5px" }}
                >
                  <AddBoxIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
              </Tooltip>
              </div>
            </div>
          </div>
        )}
      </TaskContext.Consumer>
    </div>
  );
}