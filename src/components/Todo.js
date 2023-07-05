import React, { useContext, useState } from "react";
import TaskContext from "./TaskContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

const priorityfilternames = ["High", "Mid", "Low"];

const statusfilternames = ["Pending", "Completed"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { id: "task", label: "Task", minWidth: "80%" },
  { id: "priority", label: "Priority", minWidth: "10%" },
  { id: "status", label: "Status", minWidth: "10%" },
  { id: "dueDate", label: "Due Date", minWidth: "10%" },
  { id: "actions", label: "Actions", minWidth: "10%" },
];

export default function Todo() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editedTask, setEditedTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [priorityfilters, setPriorityFilters] = useState([]);
  const [statusfilters, setStatusFilters] = useState([]);
  const [error, setError] = useState(false);

  const handleChangePriorityfilter = (event) => {
    const {
      target: { value },
    } = event;
    setPriorityFilters(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeStatusfilter = (event) => {
    const {
      target: { value },
    } = event;
    setStatusFilters(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheck = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.task === task) {
        // Toggle the status between "Completed" and "Pending"
        const newStatus = t.status === "Completed" ? "Pending" : "Completed";
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {  
    if (editingTask && editingTask.task === task) {
      if (editedTask === "") {
        setError(true);
        return;
      }
      const taskIndex = tasks.findIndex((t) => t.task === editingTask.task);
  
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = { ...editingTask, task: editedTask };
        setTasks(updatedTasks);
      }
      setEditingTask(null);
      setEditedTask("");
      setError(false);
    } else {
      const taskToEdit = tasks.find((t) => t.task === task);
      setEditingTask(taskToEdit);
      setEditedTask(taskToEdit.task);
    }
  };

  const handleDelete = (task) => {
    const updatedTasks = tasks.filter((t) => t.task !== task);
    setTasks(updatedTasks);
    setOpen(true);
  };

  const handleTaskChange = (event) => {
    setEditedTask(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>Filter By</div>
        <div>
          <FormControl sx={{ m: 1, width: 180 }}>
            <InputLabel id="demo-multiple-checkbox-label">Priority</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={priorityfilters}
              onChange={handleChangePriorityfilter}
              input={<OutlinedInput label="Priority" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {priorityfilternames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={priorityfilters.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 180 }}>
            <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={statusfilters}
              onChange={handleChangeStatusfilter}
              input={<OutlinedInput label="Status" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {statusfilternames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={statusfilters.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Task Deleted Successfully!
            </Alert>
          </Snackbar>
        </Stack>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 390 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      <b>{column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks
                  .filter((task) => {
                    // Apply the priority and status filters
                    return (
                      (priorityfilters.length === 0 ||
                        priorityfilters.includes(task.priority)) &&
                      (statusfilters.length === 0 ||
                        statusfilters.includes(task.status))
                    );
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => {
                    const isEditing =
                      editingTask && editingTask.task === task.task;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={task.task}
                        sx={{ backgroundColor: "#f1f1f1" }}
                      >
                        <TableCell
                          align="center"
                          sx={{
                            maxWidth: "150px",
                            wordWrap: "break-word",
                            margin: "auto",
                          }}
                        >
                          {isEditing ? (
                            <TextField
                              value={editedTask}
                              onChange={handleTaskChange}
                              fullWidth
                              error={error && editedTask === ""} // Show error if error state is true and task is empty
                              helperText={
                                error &&
                                editedTask === "" &&
                                "Task cannot be empty"
                              } // Display helper text when error and empty task
                              sx={{
                                borderColor:
                                  error && editedTask === ""
                                    ? "red"
                                    : "inherit",
                              }} // Add red border if error and empty task
                            />
                          ) : (
                            task.task
                          )}
                        </TableCell>
                        <TableCell align="center">{task.priority}</TableCell>
                        <TableCell align="center">{task.status}</TableCell>
                        <TableCell align="center">{task.dueDate}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleCheck(task.task)}
                            aria-label="Check"
                          >
                            <Checkbox checked={task.status === "Completed"} />
                          </IconButton>
                          <Tooltip title={isEditing ? "Save" : "Edit"}>
                            <IconButton
                              onClick={() => handleEdit(task.task)}
                              aria-label={isEditing ? "Save" : "Edit"}
                            >
                              {isEditing ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(task.task)}
                              aria-label="Delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
