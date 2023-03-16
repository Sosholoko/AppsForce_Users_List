import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";

export default function NewUserModal(props) {
  const [modalOpen, setModalOpen] = useState(props.showModal);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    setModalOpen(props.showModal);
  }, [props.showModal]);

  const handleCloseModal = () => {
    reset();
    props.closeConfirm();
  };

  const handleSave = (data) => {
    // TODO: update the user in the `rows` array
    const formData = getValues();
    console.log(formData);
    const userData = {
      id: {
        value: Math.random().toString(16).slice(-4)
      },
      email: formData.email,
      name: {
        title: formData.gender,
        first: formData.fname,
        last: formData.lname
      },
      picture: {
        medium: "https://randomuser.me/api/portraits/med/women/34.jpg"
      },
      location: formData.location
    };
    console.log(userData);
    props.onAddUser(userData);

    handleCloseModal();
  };
  return (
    <>
      <Modal open={modalOpen} onClose={handleCloseModal} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 5,
            width: 400
          }}
          onSubmit={handleSubmit(handleSave)}
        >
          <h2>New User</h2>
          <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "row", width: "88%", height: "72px" }}>
            <Controller
              name="gender"
              defaultValue={"Mr"}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select style={{ height: "56px" }} {...field} labelId="gender_select" id="gender_selectId" label="Gender">
                  <MenuItem value={"Mr"}>Mr</MenuItem>
                  <MenuItem value={"Mrs"}>Mrs</MenuItem>
                </Select>
              )}
            />
            <Controller
              name="fname"
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <TextField
                  style={{ width: 350, marginBottom: "15px" }}
                  {...field}
                  label="First Name"
                  variant="outlined"
                  error={!!errors.name}
                />
              )}
            />
            {errors.name && errors.name.type === "required" && (
              <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Name is required</span>
            )}
            {errors.name && errors.name.type === "minLength" && (
              <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Name must be at least 3 characters long</span>
            )}
          </div>

          <Controller
            name="lname"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => (
              <TextField
                style={{ width: 350, marginBottom: "15px" }}
                {...field}
                label="Last Name"
                variant="outlined"
                error={!!errors.name}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField style={{ width: 350, marginBottom: "15px" }} {...field} label="Email" variant="outlined" error={!!errors.email} />
            )}
          />
          {errors.email && errors.email.type === "required" && (
            <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Email is required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Invalid email address</span>
          )}
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                style={{ width: 350, marginBottom: "15px" }}
                {...field}
                label="Location"
                variant="outlined"
                error={!!errors.location}
              />
            )}
          />
          {errors.location && errors.location.type === "required" && (
            <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Location is required</span>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: "50%" }}>
            <Button variant="outlined" color="primary" type="submit">
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
