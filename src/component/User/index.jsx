import { UserContextProvider } from "@/context/UserContextProvider";
import React from "react";
import { useUserContext } from "@/context/UserContextProvider";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  Input,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

//import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Delete, Update } from "@mui/icons-material";
import CustomizedTables from "../Table";
function User() {
  const {
    allUserData,
    loading,
    userNameRef,
    userEmailRef,
    userPhoneRef,
    userRoleRef,
    userDescRef,
    userDobRef,
    submit,
    update,
    fillForm,
    deleteUser,
  } = useUserContext();
  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        maxWidth={500}
        margin={"auto"}
        component={"form"}
        onSubmit={submit}
      >
        <Input type="file" onChange={(e) => console.log(e)} />

        <Avatar variant="round" sx={{ width: 150, height: 150 }}></Avatar>
        <Stack spacing={"2%"} direction={"row"}>
          <TextField
            fullWidth
            inputRef={userNameRef}
            variant="outlined"
            type="text"
            label="Name"
          ></TextField>
          <TextField
            variant="outlined"
            inputRef={userEmailRef}
            fullWidth
            type="email"
            label="Email"
          ></TextField>
        </Stack>
        <Stack spacing={"2%"} direction={"row"}>
          <TextField
            variant="outlined"
            inputRef={userPhoneRef}
            sx={{ width: "49%" }}
            type="number"
            label="Phone"
          ></TextField>
          {/* <TextField
            variant="outlined"
            inputRef={userRoleRef}
            fullWidth
            type="text"
            label="Role"
          ></TextField> */}
          <Autocomplete
            disablePortal
            sx={{ width: "49%" }}
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} inputRef={userRoleRef} label="Role" />
            )}
          />
        </Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputRef={userDobRef}
            onChange={(newDate) => {
              console.log(new Date(newDate));
              userDobRef.current.value = newDate;
            }}
            label="Date of Birth"
          />
        </LocalizationProvider>
        <TextareaAutosize minRows={6} ref={userDescRef} />
        <Button
          variant="contained"
          color="success"
          type="submit"
          startIcon={update ? <Update /> : <SaveAltIcon />}
          // onClick={() => {
          //   submit();
          // }}
        >
          {update ? "Update" : "Save"}
        </Button>
      </Stack>
      {loading
        ? "Loading..."
        : allUserData.map((user, index) => {
            return (
              <Card variant="outlined" sx={{ m: 3 }} key={index}>
                <Stack gap={2} p={3} alignItems={"flex-start"}>
                  {user.name && (
                    <Typography variant="body" component="p">
                      <b>Name</b> : {user.name}
                    </Typography>
                  )}
                  {user.email && (
                    <Typography variant="body" component="p">
                      <b>Email</b> : {user.email}
                    </Typography>
                  )}
                  {user.phone && (
                    <Typography variant="body" component="p">
                      <b>Phone</b> : {user.phone}
                    </Typography>
                  )}
                  {user.description && (
                    <Typography variant="body" component="p">
                      <b>Description</b> : {user.description}
                    </Typography>
                  )}
                  {user.dob && (
                    <Typography variant="body" component="p">
                      <b>Date of Birth</b> : {user.dob}
                    </Typography>
                  )}
                  {user.role && (
                    <Typography variant="body" component="p">
                      <b>Role</b> : {user.role}
                    </Typography>
                  )}
                  <Stack spacing={3} direction={"row"} alignSelf={"flex-end"}>
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => deleteUser(user.id)}
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => fillForm({ user })}
                      startIcon={<Update />}
                    >
                      Update
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
      {/* <CustomizedTables/> */}
    </>
  );
}

export default User;

const top100Films = [
  { label: "Full Stack Developer" },
  { label: "Manager" },
  { label: "Marketing lead" },
  { label: "Hiring Manager" },
  { label: "Accountant" },
  { label: "Sales Representative" },
];
