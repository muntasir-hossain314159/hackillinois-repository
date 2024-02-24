import React, { useState } from "react";
import authService from "../auth1/authService.js";
interface AuthProps {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}
const AuthRegister: React.FC<AuthProps> = ({ title, subtitle, subtext }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await authService.register(formData);
      if (data) {
        window.location.href = "/authentication/login";
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during registration"
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {title && <h2>{title}</h2>} {subtext} <label htmlFor="name">Name</label>{" "}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />{" "}
      <label htmlFor="email">Email</label>{" "}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />{" "}
      <label htmlFor="password">Password</label>{" "}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />{" "}
      <button type="submit">Register</button> {error && <div>{error}</div>}{" "}
      {subtitle}{" "}
    </form>
  );
};
export default AuthRegister;
