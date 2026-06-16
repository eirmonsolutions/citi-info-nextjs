"use client";

import { useEffect } from "react";
import {
  getBackendLoginUrl,
  getBackendRegisterUrl,
} from "@/lib/authUrls";

export default function RedirectToBackendAuth({ type = "login" }) {
  useEffect(() => {
    window.location.replace(
      type === "register" ? getBackendRegisterUrl() : getBackendLoginUrl()
    );
  }, [type]);

  return (
    <section className="auth-page">
      <div className="auth-card" style={{ maxWidth: 480, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <p>Redirecting to {type === "register" ? "registration" : "login"}...</p>
      </div>
    </section>
  );
}
