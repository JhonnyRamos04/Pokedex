
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
                    pkmAbilities.length > 0 ?
                    pkmAbilities.length == 1 ?
                        <div className="pkm-abilities">
                            <h3>{`Habilidad: ${pkmAbilities[0]?.ability.name}`}</h3>
                        </div> :
                        pkmAbilities.length == 2 ?
                            <div className="pkm-abilities">
                                <h3>{`Habilidad: ${pkmAbilities[0]?.ability.name}`}</h3>
                                {
                                    pkmAbilities[1].is_hidden == true ?
                                        <p>{`Habilidad oculta: ${pkmAbilities[1]?.ability.name}`}</p> :
                                        <p>No tiene habilidad oculta</p>
                                }
                            </div> :
                            <div className="pkm-abilities">
                                <h3>{`Habilidades: ${pkmAbilities[0]?.ability.name}, ${pkmAbilities[1].ability.name}`}</h3>
                                {
                                    pkmAbilities[2].is_hidden == true ?
                                        <p>{`Habilidad oculta: ${pkmAbilities[2]?.ability.name}`}</p> :
                                        <p>no tiene habilidad oculta</p>
                                }
                            </div>
                    : <p>loading...</p>
            }
        </div>
    )
}
