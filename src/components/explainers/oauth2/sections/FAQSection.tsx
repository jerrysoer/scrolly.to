"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const faqs = [
  {
    question: "What is OAuth 2.0?",
    answer:
      "OAuth 2.0 is an authorization framework that lets third-party applications access a user's resources without the user sharing their password. Instead, the app receives a limited-scope token that grants specific permissions for a limited time.",
  },
  {
    question: "What is the difference between authentication and authorization?",
    answer:
      "Authentication verifies who you are (identity). Authorization determines what you can access (permissions). OAuth 2.0 is an authorization protocol — it grants access, not identity. OpenID Connect adds authentication on top of OAuth 2.0.",
    diagram: "venn",
  },
  {
    question: "What is an OAuth 2.0 access token?",
    answer:
      "An access token is a short-lived credential issued by the authorization server that grants a client limited access to specific resources on behalf of a user. It typically expires in minutes to hours. Think of it as a hotel key card — it opens specific doors for a limited time.",
  },
  {
    question: "What is PKCE and why is it important?",
    answer:
      "PKCE (Proof Key for Code Exchange, pronounced 'pixie') prevents authorization code interception attacks. The client generates a random code_verifier, hashes it to create a code_challenge, and sends the challenge with the auth request. When exchanging the code for a token, the client proves possession of the original verifier. It is mandatory in OAuth 2.1.",
  },
  {
    question:
      "When should I use authorization code flow vs client credentials?",
    answer:
      "Use the authorization code flow when acting on behalf of a user (web apps, mobile apps, SPAs). Use client credentials when the application itself needs access without a user context, like server-to-server communication, background jobs, or machine-to-machine APIs.",
  },
  {
    question: "What happens when an access token expires?",
    answer:
      "When an access token expires, the resource server rejects requests with a 401 Unauthorized response. The client can then use its refresh token to request a new access token from the authorization server — without requiring the user to re-authenticate. If the refresh token has also expired, the user must go through the full authorization flow again.",
  },
  {
    question:
      "How do I choose between confidential and public clients?",
    answer:
      "Confidential clients can securely store a client_secret — server-side web apps, backend services. Public clients cannot keep secrets safe — SPAs, mobile apps, desktop apps (the code is accessible to users). Public clients must use PKCE and cannot rely on client_secret for authentication. When in doubt, treat your client as public and use PKCE.",
  },
  {
    question: "Why was the implicit grant deprecated?",
    answer:
      "The implicit grant returned access tokens directly in the URL fragment, which was vulnerable to token leakage via browser history, referrer headers, and open redirector attacks. OAuth 2.1 formally removes it. Use the authorization code flow with PKCE instead — it's more secure and works for all client types.",
  },
];

function VennDiagram() {
  return (
    <svg
      viewBox="0 0 260 120"
      className="w-full max-w-xs mt-4"
      role="img"
      aria-label="Venn diagram showing authentication (who you are) vs authorization (what you can access), with OAuth 2.0 in the authorization circle"
    >
      <circle cx="90" cy="60" r="50" fill="var(--accent-primary)" opacity="0.12" stroke="var(--accent-primary)" strokeWidth="1.5" />
      <text x="70" y="45" fontSize="9" fill="var(--accent-primary)" fontFamily="var(--font-body)" fontWeight="600">
        Authentication
      </text>
      <text x="60" y="58" fontSize="8" fill="var(--text-tertiary)" fontFamily="var(--font-body)">
        Who you are
      </text>
      <text x="60" y="70" fontSize="7" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">
        OpenID Connect
      </text>

      <circle cx="170" cy="60" r="50" fill="var(--accent-success)" opacity="0.12" stroke="var(--accent-success)" strokeWidth="1.5" />
      <text x="155" y="45" fontSize="9" fill="var(--accent-success)" fontFamily="var(--font-body)" fontWeight="600">
        Authorization
      </text>
      <text x="150" y="58" fontSize="8" fill="var(--text-tertiary)" fontFamily="var(--font-body)">
        What you can access
      </text>
      <text x="160" y="70" fontSize="7" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">
        OAuth 2.0
      </text>

      <text x="118" y="95" fontSize="7" fill="var(--accent-amber)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">
        OIDC = Both
      </text>
    </svg>
  );
}

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredFaqs = faqs.filter(
    (faq) =>
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" layout="centered">
      <div className="max-w-3xl mx-auto flex flex-col gap-8" ref={sectionRef}>
        <h2
          className="text-4xl sm:text-5xl font-bold text-center"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          className="text-center text-lg leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
          }}
        >
          Everything you need to know about OAuth 2.0, tokens, and security.
        </p>

        {/* Search bar */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "var(--text-tertiary)" }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-bg-card text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition-all"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              borderColor: "var(--border)",
            }}
            aria-label="Search frequently asked questions"
          />
          {searchQuery && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-tertiary)",
              }}
            >
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-3" role="list">
          {filteredFaqs.map((faq, index) => {
            const originalIndex = faqs.indexOf(faq);
            const isOpen = openIndex === originalIndex;

            return (
              <div
                key={originalIndex}
                role="listitem"
                className="rounded-xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: isOpen
                    ? "var(--accent-primary)"
                    : "var(--border)",
                  background: "var(--bg-card)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease-out ${index * 0.06}s, transform 0.5s ease-out ${index * 0.06}s, border-color 0.2s ease`,
                }}
              >
                <button
                  onClick={() => toggleFaq(originalIndex)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-bg-secondary/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: isOpen
                        ? "var(--accent-primary)"
                        : "var(--bg-secondary)",
                      color: isOpen ? "#fff" : "var(--text-tertiary)",
                      border: isOpen
                        ? "none"
                        : "1px solid var(--border)",
                    }}
                  >
                    {originalIndex + 1}
                  </span>

                  <span
                    className="flex-1 text-base sm:text-lg font-semibold"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {faq.question}
                  </span>

                  <span
                    className="flex-shrink-0 text-2xl transition-transform duration-300"
                    style={{
                      color: "var(--text-tertiary)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s ease-out",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      className="px-5 pb-5 pl-17 leading-relaxed"
                      style={{
                        paddingLeft: "calc(2rem + 20px + 1rem)",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {faq.answer}
                      {faq.diagram === "venn" && <VennDiagram />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p
              className="text-lg"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-tertiary)",
              }}
            >
              No questions match &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}

        {/* Still confused CTA */}
        <div
          className="rounded-xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-primary) 8%, var(--bg-card)), color-mix(in srgb, var(--accent-tertiary) 5%, var(--bg-card)))",
            border: "1px solid color-mix(in srgb, var(--accent-primary) 15%, var(--border))",
          }}
        >
          <h3
            className="text-xl font-bold mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Still have questions?
          </h3>
          <p
            className="text-sm mb-6 max-w-md mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Dive deeper into the official specifications and documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://datatracker.ietf.org/doc/html/rfc6749"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: "var(--accent-primary)",
                color: "#fff",
                fontFamily: "var(--font-body)",
              }}
            >
              RFC 6749
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
              }}
            >
              Auth0 Docs
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://oauth.net/2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
              }}
            >
              OAuth.net
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
