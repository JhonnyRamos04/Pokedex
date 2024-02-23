
export function PkmInfo({ pkmName, pkmAbilities, pkmTypes, id }) {
    return (
        <div className="flex gap-2 flex-col">
            <h3 className="font-bold text-2xl">{`${pkmName.toUpperCase()} N.º${id}`}</h3>
            <ul className="flex justify-center items-center gap-x-2">
                {
                    pkmTypes?.map(type => (
                        <li className="pkm-types" key={type.type.url}>{type.type.name}</li>
                    ))
                }
            </ul>
            {
                pkmAbilities &&
                <ul>
                    {
                        pkmAbilities?.map(ability => (
                            <li key={ability?.ability.url} className="text-lg font-semibold">
                                <h3>{!ability.is_hidden ? `Habilidad: ${ability?.ability.name}` : `Habilidad Oculta: ${ability?.ability.name}`}</h3>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}
