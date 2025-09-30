// components/sections/WhyChooseUs.tsx
"use client";

import Image from "next/image";

type Feature = {
  iconSrc: string;
  title: string;
  desc: string;
};

const leftFeatures: Feature[] = [
  {
    iconSrc: "/images/home/Asset 96.svg",
    title: "Bài giảng sáng tạo –\nnhân văn – ý nghĩa",
    desc:
      "Kho học liệu hơn 10.000 bài giảng được thiết kế theo format đa dạng như bản tin, showgame, chuyện kể… giúp kiến thức trở nên sinh động, gần gũi và dễ tiếp thu.",
  },
  {
    iconSrc: "/images/home/Asset 95.svg",
    title: "Học tập tương tác –\nnhớ lâu hơn",
    desc:
      "Kho hoạt động tương tác, game, quiz giúp kiến thức trở nên sinh động, gắn kết và dễ nhớ.",
  },
];

const rightFeatures: Feature[] = [
  {
    iconSrc: "/images/home/Asset 94.svg",
    title: "Hành trình Học – Luyện –\nThi – Chơi toàn diện",
    desc:
      "Lộ trình học được cá nhân hoá, giúp học sinh vừa học vừa ôn luyện để phát hiện điểm sai, tham gia thử thách thú vị và rèn luyện nhiều kỹ năng tư duy.",
  },
  {
    iconSrc: "/images/home/Asset 93.svg",
    title: "Báo cáo học tập\nminh bạch – đánh giá chính xác",
    desc:
      "Tiến độ học tập được hệ thống cập nhật hằng ngày. Phụ huynh dễ dàng theo dõi quá trình học, điểm số và nhận góp ý từ giáo viên/bộ phận chuyên môn.",
  },
];

function FeatureItem({ iconSrc, title, desc }: Feature) {
  return (
    <div className="max-w-[360px] mx-auto text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full">
        <Image src={iconSrc} alt="" width={46} height={46} className="w-11 h-11" />
      </div>
      <h3 className="whitespace-pre-line font-bold leading-tight text-[var(--text-color)] font-montserrat text-lg md:text-2xl mb-2">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[#4B4C4C]">{desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-color)] font-montserrat">
            Điểm nổi bật của ONYX
          </h2>
          <p className="mt-2 text-[#4B4C4C]">
            Trải nghiệm học tập lấy trẻ em làm trung tâm: an toàn – thú vị – hiệu quả
          </p>
        </div>

        {/* Wrapper relative để đặt logo tuyệt đối ở giữa trên lg+ */}
        <div className="relative">
          {/* Logo cho MOBILE (hiển thị trong luồng) */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Image
              src="/images/onyx-logo.webp"
              alt="ONYX"
              width={160}
              height={160}
              className="w-[120px] h-auto"
              priority
            />
          </div>

          {/* Logo cho DESKTOP: tuyệt đối giữa section */}
          <div className="hidden lg:flex pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/onyx-logo.webp"
              alt="ONYX"
              width={300}
              height={300}
              className="w-[280px] h-auto"
              priority
            />
          </div>

          {/* Hai cột tính năng hai bên */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-0 lg:gap-x-24">
            {/* LEFT */}
            <div className="flex flex-col items-center space-y-16">
              {leftFeatures.map((f, i) => (
                <FeatureItem key={`left-${i}`} {...f} />
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center space-y-16">
              {rightFeatures.map((f, i) => (
                <FeatureItem key={`right-${i}`} {...f} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
