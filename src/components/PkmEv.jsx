import { useEvolve } from "../hooks/useEvolve"



export const PkmEv = ({ pkmSpecies }) => {
    const { newEvolution } = useEvolve({ pkmSpecies })

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <strong className="font-bold text-2xl">Evolve</strong>
            {
                newEvolution.length > 0 &&
                <ul className="flex flex-wrap justify-center items-center gap-2 mt-4">
                    {
                        newEvolution.map(evo => (
                            <li className=" p-3 bg-black/20 rounded-2xl border-2 border-white" key={evo.name}>
                                <img className="size-32" src={`${evo.sprite}`} alt={evo.name} />
                                <div className="flex flex-col items-center justify-center font-bold text-xl">
                                    <span >{evo.name.toUpperCase()}</span>
                                    <span className="font-normal text-base">{`Level ${evo.min_level}`}</span>
                                </div>

                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}
