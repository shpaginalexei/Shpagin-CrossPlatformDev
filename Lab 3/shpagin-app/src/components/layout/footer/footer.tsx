import Link from "next/link";

import { BsGithub } from "react-icons/bs";

export function Footer() {
  return (
    <footer role="contentinfo" className="text-muted-foreground border-t p-6">
      <div className="flex flex-col items-center justify-center gap-6 text-center text-sm md:flex-row md:justify-between md:py-0">
        <p>
          © {new Date().getFullYear()} NextBook — made by{" "}
          <Link
            href="https://github.com/shpaginalexei"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            shpaginalexei
          </Link>
        </p>
        <div className="flex items-center justify-center gap-6 px-6">
          <Link
            href="https://github.com/shpaginalexei/Shpagin-CrossPlatformDev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-foreground"
            aria-label="Github Link"
          >
            <BsGithub className="size-7" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
