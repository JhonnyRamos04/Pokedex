import { useEffect, useState } from 'react'

export const usePokemon = ({ pkm }) => {

    const defaultAbilities = [
        {
            "ability": {
                "name": "rock-head",
                "url": "https://pokeapi.co/api/v2/ability/69/"
            },
            "is_hidden": false,
            "slot": 1
        },
        {
            "ability": {
                "name": "sturdy",
                "url": "https://pokeapi.co/api/v2/ability/5/"
            },
            "is_hidden": false,
            "slot": 2
        },
        {
            "ability": {
                "name": "sand-veil",
                "url": "https://pokeapi.co/api/v2/ability/8/"
            },
            "is_hidden": true,
            "slot": 3
        }
    ]

    const [pkmName, setPkmName] = useState('')
    const [pkmSprite, setPkmSprite] = useState('')
    const [pkmTypes, setPkmTypes] = useState('')
    const [pkmTypesSecondary, setPkmTypesSecondary] = useState('')
    const [pkmAbilities, setPkmAbilities] = useState(defaultAbilities)
    const [id, setId] = useState('')

    useEffect(() => {
        if (!pkm) return
        fetch(`https://pokeapi.co/api/v2/pokemon/${pkm}`)
            .then(res => res.json())
            .then(response => {
                const { forms } = response
                const name = forms[0].name
                setPkmName(name)
                const { id } = response
                setId(id)
                const { sprites } = response
                const sprite = sprites.front_default
                setPkmSprite(sprite)
                const { abilities } = response
                setPkmAbilities(abilities)
                const { types } = response
                setPkmTypes(types[0].type.name)
                setPkmTypesSecondary(types[1].type.name)
            })
    }, [pkm])

    return { pkmName, pkmSprite, pkmAbilities, pkmTypes, pkmTypesSecondary, id }

}
