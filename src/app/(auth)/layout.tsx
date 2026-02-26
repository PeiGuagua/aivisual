export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Left brand area */}
      <div className="hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 to-purple-950 p-12 lg:flex">
        <div>
          <h2 className="text-2xl font-bold text-white">
            AI<span className="text-purple-300">Visual</span>
          </h2>
        </div>
        <div>
          <h3 className="mb-4 text-4xl font-bold leading-tight text-white">
            See how AI
            <br />
            really works.
          </h3>
          <p className="max-w-md text-lg text-blue-200/70">
            Interactive visualizations that make complex AI concepts click.
            Join thousands of learners worldwide.
          </p>
        </div>
        <p className="text-sm text-blue-200/40">© 2026 AIVisual</p>
      </div>

      {/* Right form area */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
