import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Login | Citiinfo",
};

export default function LoginPage() {
  return <AuthForm type="login" />;
}
