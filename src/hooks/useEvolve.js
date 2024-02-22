import { useEffect, useState } from 'react'


export const useEvolve = ({ pkmSpecies }) => {

    const [newEvolution, setNewEvolution] = useState([])

    const GetSprite = async (pkmName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmName}`);
            if (!response.ok) {
                throw new Error(`Ocurrió algo son la petición : ${response.status}`);
            }
            const pokemonData = await response.json()
            const { sprites } = pokemonData
            const spriteUrl = sprites?.other["official-artwork"].front_default

            if (!spriteUrl) {
                console.warn(`No se encuentra el sprite de: ${pkmName}`)
            } else {
                return spriteUrl
            }
        } catch (error) {
            console.error(`Error fetching Pokemon sprite: ${error}`)
        }
    }

    const GetChainEvolution = async (ev, setEvolution) => {
        const evolutions = []
        let evolutionData = ev

        do {
            const evoDetails = evolutionData?.evolution_details[0]
            const newSprite = await GetSprite(evolutionData?.species.name)

            evolutions.push({
                name: evolutionData?.species.name,
                min_level: evoDetails?.min_level ?? 1,
                sprite: newSprite
            });

            evolutionData = evolutionData?.evolves_to[0]
        } while (evolutionData)



        setEvolution(evolutions)

    }

    const GetEvolutions = async (chainUrl, GetChainEvolution, setEvolution) => {
        try {
            const response = await fetch(chainUrl);
            if (!response.ok) {
                throw new Error(`Ocurrió algo son la petición : ${response.status}`);
            }
            const evData = await response.json();
            const { chain } = evData;
            const evolution = GetChainEvolution(chain, setEvolution)

            if (!chainUrl) {
                console.warn(`No se encuentra la evolucion`);
            } else {
                return evolution
            }
        } catch (error) {
            console.error(`Error fetching Pokemon sprite: ${error}`);
        }
    }

    useEffect(() => {
        if (!pkmSpecies) return
        fetch(pkmSpecies?.url)
            .then(res => res.json())
            .then(res => {
                const { evolution_chain } = res
                GetEvolutions(evolution_chain?.url, GetChainEvolution, setNewEvolution)
            })
            .catch(err => {
                console.error(`Error with url:${err}`)
            })

    }, [pkmSpecies])


    return { newEvolution }

}