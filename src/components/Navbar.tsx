import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-white tracking-tight">
          Nick Rodriguez
        </Link>
        <div className="flex items-center gap-8 text-sm text-gray-400">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
