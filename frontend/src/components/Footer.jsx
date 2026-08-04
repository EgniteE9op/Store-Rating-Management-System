function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

        <p>
          © 2026 Store Rating Management System
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">

          <a
            href="https://github.com/EgniteE9op"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;