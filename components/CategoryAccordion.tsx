

export default function CategoryAccordion() {
  return (
    <button type="button" id="desktop-cats-toggle" aria-expanded="false" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent-700">
      カテゴリ
      <svg id="desktop-cats-chevron" className="h-3.5 w-3.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
    </button>
  )
}
