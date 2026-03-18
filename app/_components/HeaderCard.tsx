type HeaderCardProps = {
    pageTitle: string;
    headerTitle: string;
    details: string;
};

export default function HeaderCard({ pageTitle, headerTitle, details }: HeaderCardProps) {
    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-8 text-white sm:px-8">
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    {pageTitle}
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    {headerTitle}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                    {details}
                </p>
            </div>
        </section>
    );
}
