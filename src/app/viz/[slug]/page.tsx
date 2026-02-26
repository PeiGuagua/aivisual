import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { visualizations } from "@/content/visualizations";
import Perceptron from "@/components/viz/Perceptron";

const vizComponents: Record<string, React.ComponentType> = {
  perceptron: Perceptron,
};

export function generateStaticParams() {
  return visualizations.map((v) => ({ slug: v.slug }));
}

export default async function VizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const viz = visualizations.find((v) => v.slug === slug);

  if (!viz) return notFound();

  const VizComponent = vizComponents[slug];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-24">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-gray-300">{viz.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              {viz.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              {viz.difficulty}
            </span>
            {viz.isPremium && (
              <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs text-white">
                Pro
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {viz.title}
          </h1>
          <p className="mt-3 text-lg text-gray-400">{viz.description}</p>
        </div>

        {/* Visualization */}
        {VizComponent ? (
          <VizComponent />
        ) : (
          <div className="flex h-96 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <div className="text-center">
              <p className="text-lg text-gray-400">Coming Soon</p>
              <p className="mt-2 text-sm text-gray-500">
                This visualization is under development.
              </p>
            </div>
          </div>
        )}

        {/* Explanation */}
        {slug === "perceptron" && (
          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-xl font-bold text-white">
              What is a Perceptron?
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-gray-400">
              <p>
                A perceptron is the simplest form of a neural network. It takes
                multiple inputs, multiplies each by a weight, sums them up, adds
                a bias, and passes the result through an activation function.
              </p>
              <p>
                <strong className="text-gray-200">Inputs (x)</strong> — The data
                fed into the perceptron, such as pixel values or feature
                measurements.
              </p>
              <p>
                <strong className="text-gray-200">Weights (w)</strong> — Learnable
                parameters that determine how much influence each input has.
                Positive weights amplify, negative weights suppress.
              </p>
              <p>
                <strong className="text-gray-200">Bias (b)</strong> — A constant
                that shifts the decision boundary, allowing the perceptron to
                activate even when all inputs are zero.
              </p>
              <p>
                <strong className="text-gray-200">Activation Function</strong> —
                The step function outputs 1 if the weighted sum is positive, and
                0 otherwise. Modern networks use smoother functions like ReLU or
                Sigmoid.
              </p>
              <p>
                Try adjusting the sliders above to see how changing inputs,
                weights, and bias affects the output!
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
