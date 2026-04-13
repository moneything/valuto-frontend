import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-emerald-900/30 bg-[#040d18] text-white">
      <div className="mx-auto px-20 py-16">
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-10 max-w-64">
            <div className="">
              <a href="/" className="flex-start bg-black flex">
                <Image src="/valuto-logo.png" alt="Valuto logo" width={26} height={26} />
              </a>
              <p className="mt-3 max-w-sm text-md leading-relaxed text-slate-400">
                Teaching young people the money skills schools don't.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-100">Get In Touch</h3>
              <ul className="mt-3 space-y-3 text-md text-slate-400">
                <li>Email: jakebpb1@gmail.com</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-100">Quick Links</h3>
            <ul className="mt-6 space-y-3 text-md text-slate-400">
              <li><a href="/#home" className="transition-colors hover:text-valuto-green-400">Home</a></li>
              <li><a href="/features" className="transition-colors hover:text-valuto-green-400">Features</a></li>
              <li><a href="/pricing" className="transition-colors hover:text-valuto-green-400">Pricing</a></li>
              <li><a href="/about" className="transition-colors hover:text-valuto-green-400">About</a></li>
              <li><a href="/contact" className="transition-colors hover:text-valuto-green-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <svg className="h-5 w-5" fill="#f1f5f9" viewBox="0 0 122.88 122.88" aria-hidden="true">
                <path d="M60.54,34.07A7.65,7.65,0,0,1,49.72,23.25l13-12.95a35.38,35.38,0,0,1,49.91,0l.07.08a35.37,35.37,0,0,1-.07,49.83l-13,12.95A7.65,7.65,0,0,1,88.81,62.34l13-13a20.08,20.08,0,0,0,0-28.23l-.11-.11a20.08,20.08,0,0,0-28.2.07l-12.95,13Zm14,3.16A7.65,7.65,0,0,1,85.31,48.05L48.05,85.31A7.65,7.65,0,0,1,37.23,74.5L74.5,37.23ZM62.1,89.05A7.65,7.65,0,0,1,72.91,99.87l-12.7,12.71a35.37,35.37,0,0,1-49.76.14l-.28-.27a35.38,35.38,0,0,1,.13-49.78L23,50A7.65,7.65,0,1,1,33.83,60.78L21.12,73.49a20.09,20.09,0,0,0,0,28.25l0,0a20.07,20.07,0,0,0,28.27,0L62.1,89.05Z" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-100">Connect</h3>
            </div>
            <ul className="mt-6 space-y-3 text-md text-slate-400">
              <li>
                <a href="https://www.linkedin.com/company/valutouk/posts/?feedView=all" className="inline-flex items-center gap-2 transition-colors hover:text-valuto-green-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/valutouk" className="inline-flex items-center gap-2 transition-colors hover:text-valuto-green-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92A69.8 69.8 0 0 1 2.16 12c0-3.21.01-3.59.07-4.85.15-3.23 1.67-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-900/30 px-6 py-6">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-4">
          <p className="text-md text-slate-400">
          © {year} Valuto. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-base text-slate-400">
            <Link href="/privacy-policy" className="transition-colors hover:text-valuto-green-400">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-valuto-green-400">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
