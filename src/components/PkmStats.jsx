export const PkmStats = ({ stats }) => {
    return (
        <div>
            <h3 className="text-2xl font-bold">Stats</h3>

            <ul className="flex flex-wrap justify-center gap-2 mt-2">
                {
                    stats?.map(stat => (
                        <li key={stat.stat.url} className="px-4 py-2 bg-slate-500/30 rounded-lg border text-lg font-semibold border-white">
                            {`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}
                        </li>
                    ))
                }
            </ul>


        </div>
    )
}
