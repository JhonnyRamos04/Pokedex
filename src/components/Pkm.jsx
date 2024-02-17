import { usePokemon } from "../hooks/usePokemon"
import './Pkm.css'

function PkmInfo({ pkmName, pkmAbilities, pkmTypes, pkmTypesSecondary, id }) {
    return (
        <div className="flex gap-2 flex-col">
            <h3 className="font-bold text-2xl">{`${pkmName.toUpperCase()} N.º${id}`}</h3>
            <div className="flex justify-center items-center gap-x-2">
                {
                    pkmTypesSecondary.length > 0 ?
                        <>
                            <h3 className='pkm-types'>{`${pkmTypes.toUpperCase()}`}</h3>
                            <h3 className='pkm-types'>{`${pkmTypesSecondary.toUpperCase()}`}</h3>
                        </>
                        : <h3 className='pkm-types'>{`${pkmTypes.toUpperCase()}`}</h3>
                }
            </div>
            {
                pkmAbilities &&
                    pkmAbilities.length > 0 ?
                    pkmAbilities.length == 1 ?
                        <div className="pkm-abilities">
                            <h3>{`Habilidad: ${pkmAbilities[0].ability.name}`}</h3>
                        </div> :
                        pkmAbilities.length == 2 ?
                            <div className="pkm-abilities">
                                <h3>{`Habilidad: ${pkmAbilities[0].ability.name}`}</h3>
                                {
                                    pkmAbilities[1].is_hidden == true ?
                                        <p>{`Habilidad oculta: ${pkmAbilities[1].ability.name}`}</p> :
                                        <p>No tiene habilidad oculta</p>
                                }
                            </div> :
                            <div className="pkm-abilities">
                                <h3>{`Habilidades: ${pkmAbilities[0].ability.name}, ${pkmAbilities[1].ability.name}`}</h3>
                                {
                                    pkmAbilities[2].is_hidden == true ?
                                        <p>{`Habilidad oculta: ${pkmAbilities[2].ability.name}`}</p> :
                                        <p>no tiene habilidad oculta</p>
                                }
                            </div>
                    : <p>loading...</p>
            }
        </div>
    )
}

export const Pkm = ({ pkm }) => {

    const { pkmName, pkmSprite, pkmAbilities, pkmTypes, pkmTypesSecondary, id } = usePokemon({ pkm })

    return (
        <section className="flex flex-wrap justify-center items-center gap-x-2">
            <img className="size-48" src={`${pkmSprite}`} alt="PkmSprite" />
            <PkmInfo pkmName={pkmName} pkmAbilities={pkmAbilities} pkmTypes={pkmTypes} pkmTypesSecondary={pkmTypesSecondary} id={id} />
        </section>
    )
}
