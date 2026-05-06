"use client";

import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm({ type = "login" }) {
    const isLogin = type === "login";
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            icon: "success",
            title: isLogin ? "Login Successful!" : "Registration Successful!",
            text: isLogin
                ? "Welcome back to Citiinfo."
                : "Your account has been created successfully.",
            confirmButtonColor: "#087df2",
        });
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
                        <Link href="/register" className={!isLogin ? "active outline" : "outline"}>
                            Register
                        </Link>
                    </div>

                    <h1>Welcome!</h1>
                    <p>Sign Into Your Account</p>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Full Name" required />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" placeholder="Email address" required />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
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
                                    <input type="checkbox" /> Remember me
                                </label>
                                <Link href="/forgot-password">Forgot Password</Link>
                            </div>
                        ) : (
                            <div className="auth-options">
                                <label>
                                    <input type="checkbox" required /> I agree to the terms of service
                                </label>
                            </div>
                        )}

                        <button type="submit" className="auth-submit">
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}