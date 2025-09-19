import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Đăng nhập"
      subtitle="Chào mừng trở lại với ONYX Learning Platform"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
