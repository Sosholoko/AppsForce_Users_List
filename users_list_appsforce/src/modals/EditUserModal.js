import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";

export default function EditUserModal(props) {
  const [selectedUser, setSelectedUser] = useState();
  const [modalOpen, setModalOpen] = useState(props.showModal);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    console.log(props.showModal);
    console.log(props.selectedUser);
    setSelectedUser(props.selectedUser);
    setModalOpen(props.showModal);

    if (props.selectedUser) {
      reset({
        name: `${props.selectedUser.name.title} ${props.selectedUser.name.first} ${props.selectedUser.name.last}`,
        email: props.selectedUser.email,
        location: props.selectedUser.location.street.name
          ? `${props.selectedUser.location.street.name}, ${props.selectedUser.location.city}, ${props.selectedUser.location.country}`
          : props.selectedUser.location
      });
    }
  }, [props.showModal, props.selectedUser]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = (data) => {
    // TODO: update the user in the `rows` array
    console.log(data);
    handleCloseModal();
  };

  return (
    <>
      {selectedUser && (
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
            <h2>Edit User</h2>
            <Controller
              name="name"
              control={control}
              defaultValue={`${selectedUser?.name.title} ${selectedUser?.name.first} ${selectedUser?.name.last}`}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <TextField style={{ width: 350, marginBottom: "15px" }} {...field} label="Name" variant="outlined" error={!!errors.name} />
              )}
            />
            {errors.name && errors.name.type === "required" && (
              <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Name is required</span>
            )}
            {errors.name && errors.name.type === "minLength" && (
              <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>Name must be at least 3 characters long</span>
            )}
            <Controller
              name="email"
              control={control}
              defaultValue={selectedUser?.email}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }) => (
                <TextField
                  style={{ width: 350, marginBottom: "15px" }}
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                />
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
              defaultValue={`${selectedUser?.location.street.name}, ${selectedUser?.location.city}, ${selectedUser?.location.country}`}
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
      )}
    </>
  );
}
