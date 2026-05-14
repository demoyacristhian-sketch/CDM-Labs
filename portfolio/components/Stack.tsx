const stack = [
  "n8n", "Supabase", "React", "Next.js", "TypeScript",
  "Node.js", "Vercel", "Claude AI", "Tailwind CSS",
  "PostgreSQL", "Google Sheets API", "Telegram Bot API",
  "OAuth2", "Shopify API", "REST APIs",
];

export default function Stack() {
  return (
    <section className="py-20 px-6 bg-[#f5f5f7] border-y border-[#e5e5ea]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-widest text-[#86868b] uppercase text-center mb-8">
          Stack tecnológico
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-[#6e6e73] border border-[#d2d2d7] bg-white px-4 py-2 rounded-full hover:border-[#10b981] hover:text-[#10b981] transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
