import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Đăng ký"
      subtitle="Tạo tài khoản để bắt đầu hành trình học tập"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
