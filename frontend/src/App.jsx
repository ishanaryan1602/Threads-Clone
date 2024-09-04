import React from "react";
import { Container } from "@chakra-ui/react";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Container maxW={"620px"}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/" element={<AuthPage />} />
        <Route path="/:usernmae" element={<UserPage />} /> 
        <Route path="/:usernmae/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;
