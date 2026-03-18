type DetailsCardItem = {
    label: string;
    value: string;
    colSpan?: 1 | 2;
};

type DetailsCardProps = {
    title: string;
    description: string;
    items: DetailsCardItem[];
};

export default function DetailsCard({ title, description, items }: DetailsCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {items.map((item) => (
                    <div
                        key={`${item.label}-${item.value}`}
                        className={`rounded-2xl bg-slate-50 p-4 ${item.colSpan === 2 ? "sm:col-span-2" : ""}`}
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {item.label}
                        </span>
                        <p className="mt-2 text-base font-medium text-slate-900">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
