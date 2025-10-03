export default function PatchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Patch Update
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Stay updated with the latest game patches, balance changes, and new content. Coming soon!
        </p>
        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-8 max-w-md mx-auto hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Coming Soon
          </h2>
          <p className="text-slate-300">
            We&apos;re working on a comprehensive patch tracking system. Stay tuned for the latest updates!
          </p>
        </div>
      </div>
    </div>
  );
}
