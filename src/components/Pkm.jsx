import { usePokemon } from "../hooks/usePokemon"
import './Pkm.css'

export const Pkm = ({ pkm }) => {

    const { pkmName, pkmSprite, pkmAbilities, pkmTypes, pkmTypesSecondary, id } = usePokemon({ pkm })

    return (
        <div>
            <div className="pkm flex flex-col flex-wrap">
                <img className="size-32" src={`${pkmSprite}`} alt="PkmSprite" />
                <div className="pkm-id-name">
                    <h2 className="pkm-id font-bold text-2xl">{`No.${id}`}</h2>
                    <h2 className="pkm-name font-bold text-2xl">{`${pkmName.toUpperCase()}`}</h2>
                    <div className="pkm-alltypes">
                        {
                            pkmTypesSecondary.length > 0 ?
                                <>
                                    <h3 className='pkm-types'>{`${pkmTypes}`}</h3>
                                    <h3 className='pkm-types'>{`${pkmTypesSecondary}`}</h3>
                                </>
                                : <h3 className='pkm-types'>{`${pkmTypes}`}</h3>
                        }
                    </div>
                </div>
            </div>

            {
                pkmAbilities &&
                    pkmAbilities.length > 0 ?
                    pkmAbilities.length == 1 ?
                        <div className="pkm-abilities">
                            <h3>{`Habilidad:${pkmAbilities[0].ability.name}`}</h3>
                        </div> :
                        pkmAbilities.length == 2 ?
                            <div className="pkm-abilities">
                                <h3>{`Habilidad:${pkmAbilities[0].ability.name}`}</h3>
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
