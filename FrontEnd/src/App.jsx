import { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import axios from "axios";

import Register from "./components/Register"
import Login from "./components/Login";
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public Route */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" elemen={<Unauthorized />} />

        {/* Private Route */}
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth admin />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth admin />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth admin />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth admin />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
      </Route>

      <Route path="*" element={<Missing />} />
      {/* </Route> */}
    </Routes >
  );
}

export default App;
