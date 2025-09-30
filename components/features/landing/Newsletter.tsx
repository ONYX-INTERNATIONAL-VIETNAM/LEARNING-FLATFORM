import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    // Đẩy chồng xuống footer: âm margin-bottom + z-index cao
    <section className="relative -mb-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[var(--secondary-color)] px-6 py-10 md:px-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
          <h4 className="mb-2 text-xl md:text-2xl font-semibold text-white">
            Nhận tin mới từ ONYX
          </h4>
          <p className="mb-6 text-sm text-white/80">
            Mẹo học tập, khóa học mới và ưu đãi hấp dẫn – gửi vào hộp thư của bạn.
          </p>

          <form
            className="relative z-20 pointer-events-auto mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: handle submit
            }}
          >
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              required
              className="h-12 w-full rounded-2xl border-0 bg-white px-4 text-slate-700 placeholder:text-slate-400 focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="h-12 rounded-xl px-7 text-white"
              style={{
                background:
                  "linear-gradient(180deg,#FFD34D 0%, #FDB022 60%, #F59E0B 100%)",
              }}
            >
              Đăng ký
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
