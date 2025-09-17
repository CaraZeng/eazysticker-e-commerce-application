import React, { useState } from "react";
import PageTitle from "./PageTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/auth-slice";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      const fakeToken = "local-token";
      localStorage.setItem("jwtToken", fakeToken);
      dispatch(loginSuccess({ jwtToken: fakeToken, user }));
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        <PageTitle title="Login" />
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
          <button type="submit" className="w-full px-6 py-2 bg-primary text-white rounded-md text-xl font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}