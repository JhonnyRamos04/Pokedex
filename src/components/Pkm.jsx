import { usePokemon } from "../hooks/usePokemon"
import { PkmInfo } from "./PkmInfo"
import { PkmEv } from "./PkmEv"
import './Pkm.css'

export const Pkm = ({ pkm }) => {

    const { pkmName, pkmSprite, pkmAbilities, pkmTypes, pkmTypesSecondary, id, pkmSpecies } = usePokemon({ pkm })

    return (
        <section className="flex flex-wrap justify-center items-center gap-2">
            <img className="size-44" src={`${pkmSprite}`} alt="PkmSprite" />
            <PkmInfo pkmName={pkmName} pkmAbilities={pkmAbilities} pkmTypes={pkmTypes} pkmTypesSecondary={pkmTypesSecondary} id={id} />
            <PkmEv pkmSpecies={pkmSpecies} />
        </section>
    )
}
