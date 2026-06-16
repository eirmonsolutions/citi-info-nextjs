import RedirectToBackendAuth from "@/components/auth/RedirectToBackendAuth";

export const metadata = {
  title: "Register | Citiinfo",
};

export default function RegisterPage() {
  return <RedirectToBackendAuth type="register" />;
}
