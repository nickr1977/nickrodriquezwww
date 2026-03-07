import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-gray-900 tracking-tight">
          Nick Rodriquez
        </Link>
        <div className="flex items-center gap-8 text-sm text-gray-600">
          <Link href="#about" className="hover:text-gray-900 transition-colors">About</Link>
          <Link href="#services" className="hover:text-gray-900 transition-colors">Services</Link>
          <Link href="#timeline" className="hover:text-gray-900 transition-colors">Career</Link>
          <Link href="#blog" className="hover:text-gray-900 transition-colors">Blog</Link>
          <Link href="#contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
