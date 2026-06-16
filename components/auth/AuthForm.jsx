"use client";

import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { resolveLoginRedirect } from "@/lib/api/auth";

function getErrorMessage(error, fallback) {
  if (!error) return fallback;

  if (error.status === 401) {
    return error.message || "Invalid email or password.";
  }

  if (error.status === 403) {
    return error.message || "Your account has been blocked. Please contact support.";
  }

  if (error.status === 422 && error.errors) {
    const firstField = Object.keys(error.errors)[0];
    if (firstField && error.errors[firstField]?.[0]) {
      return error.errors[firstField][0];
    }
  }

  return error.message || fallback;
}

export default function AuthForm({ type = "login" }) {
  const isLogin = type === "login";
  const { login, register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree_terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;

    setForm({
      ...form,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const data = await login({
          email: form.email,
          password: form.password,
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

      const data = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        agree_terms: form.agree_terms,
      });

      if (data.token) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: data.message || "Your account has been created successfully.",
          confirmButtonColor: "#087df2",
        }).then(() => {
          window.location.href = "/";
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
        title: isLogin ? "Login Failed" : "Registration Failed",
        text: getErrorMessage(
          error,
          "Something went wrong. Please try again."
        ),
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
