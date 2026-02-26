import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const features = [
  {
    title: "Interactive Visualizations",
    description:
      "Not static images. Drag, tweak parameters, and watch data flow through neural networks in real time.",
    icon: "🔬",
  },
  {
    title: "Concept by Concept",
    description:
      "A structured learning path from simple perceptrons to complex transformers. Each concept builds on the last.",
    icon: "🧩",
  },
  {
    title: "AI-Powered Generation",
    description:
      "Paste a paper or describe a concept — our AI generates a custom interactive visualization for you.",
    icon: "⚡",
  },
];

const pricing = [
  {
    name: "Free",
    price: 0,
    features: [
      "5 basic visualizations",
      "View-only interactions",
      "Watermarked exports",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 9,
    features: [
      "All visualizations",
      "Full interactivity",
      "20 AI generations / month",
      "Export images & videos",
      "No watermark",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: 29,
    features: [
      "Everything in Pro",
      "Unlimited AI generations",
      "Embed in your site",
      "Team collaboration",
      "Priority support",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center">
        <div className="animate-fade-in">
          <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            Open Source &amp; Free to Start
          </div>
        </div>
        <h1 className="animate-fade-in-delay-1 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl">
          Understand AI{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Visually
          </span>
        </h1>
        <p className="animate-fade-in-delay-2 mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Interactive visualizations that make complex AI concepts click. From
          perceptrons to transformers, see how AI really works.
        </p>
        <div className="animate-fade-in-delay-3 mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/viz/perceptron"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Explore for Free
          </Link>
          <Link
            href="#demo"
            className="rounded-lg border border-white/10 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/5"
          >
            View Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          Why AIVisual?
        </h2>
        <p className="mb-16 text-center text-gray-400">
          Reading about AI is hard. Seeing it in action makes it click.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          See Attention Mechanism in Action
        </h2>
        <p className="mb-12 text-center text-gray-400">
          This is what understanding looks like.
        </p>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/50 to-purple-950/50 p-1">
          <div className="rounded-xl bg-[#0a0a0a]/90 p-8 sm:p-12">
            <div className="flex flex-col items-center gap-8">
              <div className="grid w-full grid-cols-4 gap-4">
                {["Query", "Key", "Value", "Output"].map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <div
                      className="h-24 w-full rounded-lg sm:h-32"
                      style={{
                        background: `linear-gradient(135deg, hsl(${220 + i * 30}, 70%, ${20 + i * 5}%), hsl(${250 + i * 30}, 70%, ${30 + i * 5}%))`,
                      }}
                    />
                    <span className="text-xs font-medium text-gray-400">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-500">
                  Interactive demo — coming with full launch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          Simple Pricing
        </h2>
        <p className="mb-16 text-center text-gray-400">
          Start free. Upgrade when you need more.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 ${
                plan.highlighted
                  ? "border-purple-500/50 bg-gradient-to-b from-purple-950/30 to-transparent"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 text-lg font-semibold text-white">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="mt-0.5 text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block w-full rounded-lg py-2.5 text-center text-sm font-medium transition ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                    : "border border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
