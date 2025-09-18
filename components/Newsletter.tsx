import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-background p-6 md:p-8 text-center">
          <h4 className="text-2xl font-semibold mb-2">Nhận tin mới từ ONYX</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Mẹo học tập, khóa học mới và ưu đãi hấp dẫn – gửi vào hộp thư của bạn.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: handle submit
            }}
          >
            <Input type="email" placeholder="Nhập email của bạn" required className="flex-1" />
            <Button type="submit" className="bg-accent text-accent-foreground">Đăng ký</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
