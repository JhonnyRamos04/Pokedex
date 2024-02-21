import { useEffect, useState } from 'react'

export const useEvolve = ({ pkmSpecies }) => {


    const [evUrl, setEvUrl] = useState()
    const [newEvolution, setNewEvolution] = useState([])
    const getSprite = async (pkmName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmName}`);
            if (!response.ok) {
                throw new Error(`Ocurrió algo son la petición : ${response.status}`);
            }
            const pokemonData = await response.json();
            const { sprites } = pokemonData;
            const spriteUrl = sprites?.other.home?.front_default;

            if (!spriteUrl) {
                console.warn(`No se encuentra el sprite de: ${pkmName}`);
            } else {
                return spriteUrl
            }
        } catch (error) {
            console.error(`Error fetching Pokemon sprite: ${error}`);
        }
    }

    const getEvolutions = async (ev) => {
        const evolutions = []
        let evolutionData = ev

        do {
            const evoDetails = evolutionData?.evolution_details[0]
            const newSprite = await getSprite(evolutionData?.species.name)

            evolutions.push({
                name: evolutionData?.species.name,
                min_level: evoDetails?.min_level ?? 1,
                sprite: newSprite
            });

            evolutionData = evolutionData?.evolves_to[0];
        } while (evolutionData)



        setNewEvolution(evolutions)
    }

    useEffect(() => {
        if (!pkmSpecies) return
        fetch(pkmSpecies?.url)
            .then(res => res.json())
            .then(res => {
                const { evolution_chain } = res
                setEvUrl(evolution_chain.url)
            })
            .catch(err => {
                console.error(`Error with url:${err}`)
            })

    }, [pkmSpecies])

    useEffect(() => {
        if (!evUrl) return
        fetch(evUrl)
            .then(res => res.json())
            .then(res => {
                const { chain } = res
                getEvolutions(chain)
            })
            .catch(err => {
                console.error(`Error with url:${err}`)
            })
    }, [evUrl])


    //console.log(newEvolution, "soy yo") hay que reparar esto




    return { newEvolution }

}