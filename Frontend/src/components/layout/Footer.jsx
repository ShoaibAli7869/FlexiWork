// src/components/landing/Footer.jsx
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowUpRight, Heart } from "lucide-react";
import { SiX, SiGithub, SiLinkedin, SiDiscord } from "react-icons/si";

/* ── Static Data ── */
const FOOTER_LINKS = Object.freeze({
  Product: Object.freeze([
    Object.freeze({ name: "Features", href: "#features" }),
    Object.freeze({ name: "Pricing", href: "#pricing" }),
    Object.freeze({ name: "AI Matching", href: "#" }),
    Object.freeze({ name: "Collaboration", href: "#" }),
    Object.freeze({ name: "Payments", href: "#" }),
  ]),
  Company: Object.freeze([
    Object.freeze({ name: "About Us", href: "#" }),
    Object.freeze({ name: "Careers", href: "#", badge: "Hiring" }),
    Object.freeze({ name: "Blog", href: "#" }),
    Object.freeze({ name: "Press Kit", href: "#" }),
    Object.freeze({ name: "Contact", href: "#" }),
  ]),
  Resources: Object.freeze([
    Object.freeze({ name: "Documentation", href: "#" }),
    Object.freeze({ name: "Help Center", href: "#" }),
    Object.freeze({ name: "Community", href: "#" }),
    Object.freeze({ name: "Tutorials", href: "#" }),
    Object.freeze({ name: "API Reference", href: "#" }),
  ]),
  Legal: Object.freeze([
    Object.freeze({ name: "Privacy Policy", href: "#" }),
    Object.freeze({ name: "Terms of Service", href: "#" }),
    Object.freeze({ name: "Cookie Policy", href: "#" }),
    Object.freeze({ name: "GDPR", href: "#" }),
  ]),
});

const SOCIALS = Object.freeze([
  Object.freeze({ icon: SiX, href: "#", label: "Twitter / X" }),
  Object.freeze({ icon: SiGithub, href: "#", label: "GitHub" }),
  Object.freeze({ icon: SiLinkedin, href: "#", label: "LinkedIn" }),
  Object.freeze({ icon: SiDiscord, href: "#", label: "Discord" }),
]);

/* ── Sub-Components ── */
const SocialLink = memo(({ social }) => (
  <a
    href={social.href}
    aria-label={social.label}
    className="w-9 h-9 rounded-xl flex items-center justify-center
               transition-all duration-200 cursor-pointer"
    style={{
      background: "var(--theme-surface-card)",
      border: "1px solid var(--theme-border-subtle)",
      color: "var(--theme-text-tertiary)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-strong)";
      e.currentTarget.style.color = "var(--theme-text-primary)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "var(--theme-shadow-sm)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-subtle)";
      e.currentTarget.style.color = "var(--theme-text-tertiary)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <social.icon className="w-3.5 h-3.5" aria-hidden="true" />
  </a>
));
SocialLink.displayName = "SocialLink";

const FooterLink = memo(({ link }) => (
  <li>
    <a
      href={link.href}
      className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
      style={{ color: "var(--theme-text-tertiary)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--theme-text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--theme-text-tertiary)";
      }}
    >
      {link.name}
      {link.badge && (
        <span
          className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
          style={{
            background: "var(--theme-badge-secondary-bg)",
            color: "var(--theme-badge-secondary-text)",
            border: "1px solid var(--theme-badge-secondary-border)",
          }}
        >
          {link.badge}
        </span>
      )}
      {link.href.startsWith("http") && (
        <ArrowUpRight
          className="w-3 h-3 opacity-0 group-hover:opacity-60 -translate-y-0.5 transition-all duration-200"
          aria-hidden="true"
        />
      )}
    </a>
  </li>
));
FooterLink.displayName = "FooterLink";

const FooterColumn = memo(({ category, links }) => (
  <div>
    <h4
      className="font-bold text-xs uppercase tracking-[0.12em] mb-4"
      style={{ color: "var(--theme-text-primary)" }}
    >
      {category}
    </h4>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <FooterLink key={link.name} link={link} />
      ))}
    </ul>
  </div>
));
FooterColumn.displayName = "FooterColumn";

/* ── Main Component ── */
const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const linkEntries = useMemo(() => Object.entries(FOOTER_LINKS), []);

  return (
    <footer
      className="relative pt-16 sm:pt-20 pb-8"
      style={{ background: "var(--theme-footer-bg)" }}
      role="contentinfo"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--theme-border-strong), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* ── Newsletter + Links Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-14">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center
                           transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary-500), var(--brand-secondary-400))",
                }}
              >
                <Zap
                  className="w-4 h-4 text-white fill-white"
                  aria-hidden="true"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span style={{ color: "var(--theme-text-primary)" }}>
                  Flexi
                </span>
                <span className="text-gradient">Work</span>
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-[280px] mb-5"
              style={{ color: "var(--theme-text-tertiary)" }}
            >
              AI-powered freelancing platform with fair fees, instant payments,
              and portable blockchain reputation.
            </p>

            {/* Newsletter Mini */}
            <div className="mb-5">
              <div
                className="flex rounded-xl overflow-hidden"
                style={{
                  border: "1px solid var(--theme-border-default)",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3.5 py-2.5 text-sm bg-transparent outline-none min-w-0"
                  style={{ color: "var(--theme-text-primary)" }}
                  aria-label="Email for newsletter"
                />
                <button
                  className="px-4 py-2.5 text-xs font-bold shrink-0 cursor-pointer
                             transition-opacity duration-200 hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                    color: "var(--theme-text-on-primary)",
                  }}
                >
                  Subscribe
                </button>
              </div>
              <p
                className="text-[10px] mt-1.5"
                style={{ color: "var(--theme-text-muted)" }}
              >
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map((social) => (
                <SocialLink key={social.label} social={social} />
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {linkEntries.map(([category, links]) => (
            <FooterColumn key={category} category={category} links={links} />
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
        >
          <p
            className="text-sm flex items-center gap-1"
            style={{ color: "var(--theme-text-muted)" }}
          >
            © {currentYear} FlexiWork. Built with
            <Heart
              className="w-3 h-3 text-danger-400 fill-danger-400 mx-0.5"
              aria-hidden="true"
            />
            for freelancers.
          </p>

          <div
            className="flex items-center gap-2"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--brand-secondary-400)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--brand-secondary-500)" }}
              />
            </span>
            <span className="text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
