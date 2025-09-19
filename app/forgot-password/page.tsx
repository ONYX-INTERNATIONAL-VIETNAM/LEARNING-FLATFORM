import { AuthLayout } from "@/components/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Quên mật khẩu"
      subtitle="Nhập email để nhận liên kết đặt lại mật khẩu"
    >
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Khôi phục mật khẩu</h3>
            <p className="text-sm text-muted-foreground">
              Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email của bạn
            </p>
          </div>
        </CardHeader>

        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Gửi liên kết khôi phục
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-accent hover:underline font-medium"
              >
                ← Quay lại đăng nhập
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
