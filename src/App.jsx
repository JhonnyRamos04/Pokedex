import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import { Pkm } from './components/Pkm'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


//const pkm = '153'

export const App = () => {

  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  const { newPkm, newError, getPkm } = useSearch({ search })

  const DebounceSearch = useCallback(debounce(newSearch => {
    getPkm(newSearch.toLowerCase())
  }, 500), [])


  useEffect(() => {
    if (isFirstInput) {
      isFirstInput.current = search === ''
      return
    }

    if (search.length < 1) {
      setError('Tienes que tener al menos un numero para buscar tu pokemon')
      return
    }
    if (newError) {
      setError(newError)
    }

  }, [newPkm])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(e.target.value)
    DebounceSearch(newSearch)
  }

  return (
    <section className='pkm-section'>
      <form action="" className='pkm-form' onSubmit={handleSubmit}>
        <h1>Pokedex</h1>
        <input type="text" value={search} onChange={handleChange} placeholder='Buscar Pkm con el nombre o numero' />
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {
        newPkm ? <Pkm pkm={newPkm} /> : <div className='lds-dual-ring'></div>
      }

    </section>
  )
}
