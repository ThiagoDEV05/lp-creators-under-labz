import bullet3d from "@/assets/bullet-3d.png";

type BulletProps = {
  className: string;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  opacity: number;
  spin?: boolean;
};

const bullets: BulletProps[] = [
  { className: "left-[3%] top-[10%]", size: 78, rotate: -22, delay: 0, duration: 9, opacity: 0.95, spin: true },
  { className: "left-[10%] top-[62%]", size: 58, rotate: 34, delay: 1.4, duration: 11, opacity: 0.8 },
  { className: "right-[4%] top-[16%]", size: 86, rotate: 26, delay: 0.7, duration: 10, opacity: 0.9 },
  { className: "right-[11%] top-[70%]", size: 54, rotate: -38, delay: 2.1, duration: 12, opacity: 0.75, spin: true },
  { className: "left-[45%] top-[2%]", size: 48, rotate: 10, delay: 1.9, duration: 13, opacity: 0.55 },
  { className: "right-[36%] bottom-[3%]", size: 62, rotate: -8, delay: 0.4, duration: 10.5, opacity: 0.6 },
];

export function FloatingBullets() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {bullets.map((b, i) => (
        <span
          key={i}
          className={`absolute animate-bullet-float ${b.className}`}
          style={{ animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s` }}
        >
          <span style={{ display: "block", transform: `rotate(${b.rotate}deg)`, perspective: "600px" }}>
            <img
              src={bullet3d}
              alt=""
              loading="lazy"
              width={b.size}
              height={b.size / 2}
              className={b.spin ? "animate-bullet-spin" : undefined}
              style={{
                width: b.size,
                height: "auto",
                opacity: b.opacity,
                filter: "drop-shadow(0 10px 18px oklch(0 0 0 / 0.55))",
              }}
            />
          </span>

        </span>
      ))}
    </div>
  );
}

export default FloatingBullets;
