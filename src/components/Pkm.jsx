import { usePokemon } from "../hooks/usePokemon"
import { PkmInfo } from "./PkmInfo"
import { PkmEv } from "./PkmEv"
import './Pkm.css'

export const Pkm = ({ pkm }) => {

    const { pkmName, pkmSprite, pkmAbilities, pkmTypes, pkmTypesSecondary, id, pkmSpecies, error } = usePokemon({ pkm })

    return (
        <article className="flex flex-wrap justify-center items-center gap-2">
            {
                !error ?
                    <>
                        {
                            pkmName &&
                            <>
                                <img className="size-44" src={`${pkmSprite}`} alt="PkmSprite" />
                                <PkmInfo pkmName={pkmName} pkmAbilities={pkmAbilities} pkmTypes={pkmTypes} pkmTypesSecondary={pkmTypesSecondary} id={id} />
                            </>
                        }

                        {
                            pkmSpecies &&
                            <PkmEv pkmSpecies={pkmSpecies} />
                        }
                    </>
                    : <span className="text-black text-2xl font-bold mt-4">{error.toUpperCase()}</span>
            }
        </article>
    )
}
