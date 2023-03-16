import React, { useState, useEffect } from "react";
import UsersTable from "../components/UsersTable";

export default function MainScreen() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>AppsForce Users List</h1>
      <UsersTable />
    </>
  );
}
