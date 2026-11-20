import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  staticData: { sitemap: true },
  head: () => pageHead("FIXGAD FAQ", "Answers about FIXGAD early access for customers and Hrayfis.", "/faq"),
  component: FAQPage,
});

function FAQPage() {
  const items = [
    ["What is FIXGAD?", "FIXGAD is an early-stage home-services marketplace connecting customers with independent Hrayfis."],
    ["Does early access guarantee a booking or account?", "No. Early access only records interest before launch and does not guarantee employment or immediate access."],
    ["How can a Hrayfi register?", "Choose Hrayfi registration and provide your primary profession, additional services and experience."],
    ["How is my registration used?", "Your information is used to manage early-access interest and relevant launch updates."],
  ];
  return (
    <section className="section container">
      <span className="eyebrow">Frequently asked questions</span>
      <h1>FIXGAD early access</h1>
      <div className="faq-list">
        {items.map(([question, answer]) => (
          <details key={question}><summary>{question}</summary><p>{answer}</p></details>
        ))}
      </div>
    </section>
  );
}
