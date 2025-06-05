

export type StatsProps = {
    icon: React.ReactNode;
    number: string;
    label: string;
};

export default function Stats({ stats }: { stats: StatsProps[] }) {
    if (!stats || stats.length === 0) {
        return null;
    }
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2 text-blue-400 group-hover:text-purple-400 transition-colors">
                        {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-[var(--color-brand-navy)]">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}