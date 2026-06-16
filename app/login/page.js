import RedirectToBackendAuth from "@/components/auth/RedirectToBackendAuth";

export const metadata = {
  title: "Login | Citiinfo",
};

export default function LoginPage() {
  return <RedirectToBackendAuth type="login" />;
}
