import { useEffect, useState } from 'react'

export const usePokemon = ({ pkm }) => {

    const [pkmName, setPkmName] = useState('')
    const [pkmSprite, setPkmSprite] = useState('')
    const [pkmTypes, setPkmTypes] = useState(null)
    const [pkmAbilities, setPkmAbilities] = useState(null)
    const [pkmSpecies, setPkmSpecies] = useState(null)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!pkm) return
        fetch(`https://pokeapi.co/api/v2/pokemon/${pkm}`)
            .then(res => res.json())
            .then(response => {
                const { name } = response
                setPkmName(name)
                const { id } = response
                setId(id)
                const { sprites } = response
                const sprite = sprites?.other["official-artwork"].front_default
                setPkmSprite(sprite)
                const { abilities } = response
                setPkmAbilities(abilities)
                const { types } = response
                setPkmTypes(types)
                const { species } = response
                setPkmSpecies(species)
            })
            .catch(err => {
                console.error(`Error with url:${err}`)
                setError('Pokemon no encontrado')
            })
    }, [pkm])

    return { pkmName, pkmSprite, pkmAbilities, pkmTypes, id, pkmSpecies, error }

}
