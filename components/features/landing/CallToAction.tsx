import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-16">
        <div
          className="
            relative rounded-[2rem] border border-gray-200 bg-white
            p-5 md:p-6
            flex flex-col md:flex-row
            items-start md:items-center
            justify-between
            gap-4 md:gap-6
            shadow-sm
          "
        >
          {/* Icon nổi: mobile hiển thị nhỏ trong flow; desktop nổi ra ngoài khung */}
          <div className="md:hidden">
            <Image
              src="/images/home/Asset 45.svg"
              alt="Graduation cap"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
          </div>
          <Image
            src="/images/home/Asset 45.svg"
            alt="Graduation cap"
            width={96}
            height={96}
            className="hidden md:block absolute -top-12 -left-6 w-24 h-24"
            priority
          />

          {/* Nội dung CTA */}
          <div className="flex-1 md:ml-20">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Sẵn sàng bắt đầu hành trình học tập?
            </h3>
            <p className="text-sm md:text-base text-gray-500">
              Tham gia ONYX để khám phá hàng trăm khóa học thú vị cho trẻ em.
            </p>
          </div>

          {/* Button: full width trên mobile, giữ kích thước gọn */}
          <Button
            asChild
            className="
              w-full md:w-auto
              rounded-full
              px-5 py-2 md:px-8 md:py-3
              text-sm md:text-base
              font-semibold text-white
              bg-gradient-to-r from-yellow-400 to-yellow-300
              hover:from-yellow-500 hover:to-yellow-400
              shadow
            "
          >
            <Link href="/#courses">Bắt đầu ngay</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
