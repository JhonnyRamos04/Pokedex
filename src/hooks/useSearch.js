import { useRef, useState, useCallback } from "react"

export const useSearch = ({ pkm }) => {
    const priviusPkm = useRef(pkm)
    const [newPkm, setNewPkm] = useState()
    const [newError, setNewError] = useState(null)

    const getPkm = useCallback((pkm) => {

        if (pkm == priviusPkm.current) return
        try {

            setNewError(null)
            priviusPkm.current = pkm
            setNewPkm(pkm)

        } catch (error) {
            setNewError(error.message)
        }

    }, [])

    return { newPkm, newError, getPkm }
}