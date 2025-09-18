import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border bg-background p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Sẵn sàng bắt đầu hành trình học tập?</h3>
            <p className="text-muted-foreground">Tham gia ONYX để khám phá hàng trăm khóa học thú vị cho trẻ em.</p>
          </div>
          <Button asChild className="bg-accent text-accent-foreground">
            <Link href="/#courses">Bắt đầu ngay</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
