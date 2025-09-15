import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";

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
