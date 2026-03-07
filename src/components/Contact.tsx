export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-indigo-600 font-mono text-sm mb-4 tracking-widest uppercase">Contact</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Let&apos;s connect</h2>
        <p className="text-gray-600 mb-10 max-w-lg mx-auto">
          Whether it&apos;s a new opportunity, a project, or just a conversation —
          my inbox is always open.
        </p>
        <a
          href="mailto:nicholasrodriquez@gmail.com"
          className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-lg"
        >
          Say hello →
        </a>
        <div className="mt-16 flex justify-center gap-8 text-gray-500 text-sm">
          <a href="https://github.com/nickr1977" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
