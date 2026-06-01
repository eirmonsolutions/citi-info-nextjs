"use client";

import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { loginWithSanctum, resolveLoginRedirect } from "@/lib/api/auth";
import { apiFetch } from "@/lib/api/client";

export default function AuthForm({ type = "login" }) {
  const isLogin = type === "login";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree_terms: false,
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const data = await loginWithSanctum({
          email: form.email,
          password: form.password,
          remember: form.remember,
        });

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: data.message || "Welcome back to Citiinfo.",
          confirmButtonColor: "#087df2",
        }).then(() => {
          window.location.href = resolveLoginRedirect(
            data.redirect_to,
            data.user
          );
        });

        return;
      }

      const data = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          agree_terms: form.agree_terms,
        }),
      });

      if (data.ok === false) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Please check your details and try again.",
          confirmButtonColor: "#087df2",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created successfully. Please login now.",
        confirmButtonColor: "#087df2",
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: isLogin ? "Login Failed" : "Server Error",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#087df2",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <img src="/assets/images/login-img.png" alt="Login" />
        </div>

        <div className="auth-right">
          <div className="auth-tabs">
            <Link href="/login" className={isLogin ? "active" : ""}>
              Login
            </Link>

            <Link
              href="/register"
              className={!isLogin ? "active outline" : "outline"}
            >
              Register
            </Link>
          </div>

          <h1>Welcome!</h1>
          <p>{isLogin ? "Sign Into Your Account" : "Create Your Account"}</p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin ? (
              <div className="auth-options">
                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />{" "}
                  Remember me
                </label>

                <Link href="/forgot-password">Forgot Password</Link>
              </div>
            ) : (
              <div className="auth-options">
                <label>
                  <input
                    type="checkbox"
                    name="agree_terms"
                    checked={form.agree_terms}
                    onChange={handleChange}
                    required
                  />{" "}
                  I agree to the terms of service
                </label>
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Registering..."
                : isLogin
                ? "Login"
                : "Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}