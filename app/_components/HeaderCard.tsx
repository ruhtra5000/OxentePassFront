type HeaderCardProps = {
    pageTitle: string;
    headerTitle: string;
    details: string;
    highlightLabel?: string;
    highlightValue?: string | number;
};

export default function HeaderCard({
    pageTitle,
    headerTitle,
    details,
    highlightLabel,
    highlightValue,
}: HeaderCardProps) {
    return (
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-8 text-white sm:px-8 sm:py-10">
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    {pageTitle}
                </span>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {headerTitle}
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
                            {details}
                        </p>
                    </div>

                    {highlightLabel && highlightValue !== undefined ? (
                        <div className="w-fit rounded-3xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                                {highlightLabel}
                            </p>
                            <p className="mt-2 text-3xl font-bold">
                                {highlightValue}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
