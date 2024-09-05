import React, { useState } from "react";
import SignupCard from "../Components/SignupCard";
import LoginCard from "../Components/Login";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);
  const [value, setValue] = useState("login");
  return <>
     {
        authScreenState === "login" ? <LoginCard /> : <SignupCard />
     }
  </>;
}

export default AuthPage;
