export function SectionNum({ num, total = 9 }: { num: number; total?: number }) {
  return (
    <div className="section-num">
      <span className="text-[#D4AF37]">
        {String(num).padStart(2, "0")}
      </span>
      <span className="text-white/20"> / {String(total).padStart(2, "0")}</span>
    </div>
  );
}
