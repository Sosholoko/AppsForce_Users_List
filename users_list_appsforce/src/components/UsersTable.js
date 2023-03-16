import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import EditUserModal from "../modals/EditUserModal";
import ConfirmModal from "../modals/ConfirmModal";
import NewUserModal from "../modals/NewUserModal";

export default function UsersTable() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (newUser) => {
    if (!newUser || !newUser.name) {
      return;
    }
    setData((prevData) => [...prevData, newUser]);
    console.log(data);
    setSearchQuery(""); // clear the search query
  };

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const json = await response.json();
      setData(json.results);
      console.log(json.results);
    }
    fetchData();
  }, []);

  let filteredData = data.filter(
    (row) =>
      row.name &&
      `${row.name.title} ${row.name.first} ${row.name.last} ${row.location.country} ${row.location.street.name} ${row.location.city} ${row.email} ${row.id.value} `
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  function deleteUser(userId) {
    const updatedData = data.filter((row) => row.id.value !== userId);
    setData(updatedData);
  }

  return (
    <>
      <TableContainer>
        <EditUserModal showModal={modalOpen} selectedUser={selectedUser} />
        <NewUserModal onAddUser={handleAddUser} showModal={newUserModalOpen} closeConfirm={() => setNewUserModalOpen(false)} />
        <ConfirmModal
          showConfirm={confirmOpen}
          closeConfirm={() => setConfirmOpen(false)}
          currentUser={currentUser?.name.first}
          onDelete={() => {
            deleteUser(currentUser.id.value);
            setConfirmOpen(false);
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row", marginBottom: "10px" }}>
          <TextField
            style={{ width: "70%" }}
            label="Search"
            variant="outlined"
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setNewUserModalOpen(true)}>Add User</Button>
        </div>

        <Table style={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>UID/ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.id.value ?? index}>
                <TableCell component="th" scope="row">
                  {`${row.name.title}. ${row.name.first} ${row.name.last}`}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Avatar alt={`${row.name.firstName} ${row.name.lastName}`} src={row.picture.medium} />
                </TableCell>
                <TableCell>
                  {row.location.country ? `${row.location.country}, ${row.location.city}, ${row.location.street.name}` : row.location}
                </TableCell>
                <TableCell>{row.id.value ?? index}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedUser(row);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setCurrentUser(row);
                      setConfirmOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
