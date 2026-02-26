import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="text-sm text-gray-500">
          © 2026 AIVisual. Open source on{" "}
          <Link
            href="https://github.com/PeiGuagua/aivisual"
            className="text-gray-400 transition hover:text-white"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
        <div className="flex gap-6">
          <Link href="https://twitter.com" target="_blank" className="text-sm text-gray-500 transition hover:text-white">
            Twitter
          </Link>
          <Link href="mailto:icewuyuxin888@gmail.com" className="text-sm text-gray-500 transition hover:text-white">
            Email
          </Link>
          <Link href="https://github.com/PeiGuagua/aivisual" target="_blank" className="text-sm text-gray-500 transition hover:text-white">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
