import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPwd: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobileNumber, password, confirmPwd } = formData;

    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user) => user.email === email)) {
      toast.error("Email already registered!");
      return;
    }

    users.push({ name, email, mobileNumber, password });
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful. Try login...");
    navigate("/login");
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-md dark:bg-gray-600 dark:text-white";

  return (
    <div className="min-h-[752px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        <PageTitle title="Register" />
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" required placeholder="Name" value={formData.name} onChange={handleChange} className={inputClass} />
          <input type="email" name="email" required placeholder="Email" value={formData.email} onChange={handleChange} className={inputClass} />
          <input type="tel" name="mobileNumber" required pattern="\d{10}" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className={inputClass} />
          <input type="password" name="password" required placeholder="Password" value={formData.password} onChange={handleChange} className={inputClass} />
          <input type="password" name="confirmPwd" required placeholder="Confirm Password" value={formData.confirmPwd} onChange={handleChange} className={inputClass} />

          <button type="submit" className="w-full px-6 py-2 text-white text-xl bg-primary dark:bg-light rounded-md">
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary dark:text-light font-bold">Login Here</Link>
        </p>
      </div>
    </div>
  );
}