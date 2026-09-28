function PlaceholderPage({ title }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8">
      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        This section will be implemented in a later step.
      </p>
    </div>
  );
}

export default PlaceholderPage;