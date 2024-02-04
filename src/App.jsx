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
    <section className='pkm-section '>
      <form action="" className='pkm-form' onSubmit={handleSubmit}>
        <h1 className=' font-bold px-12 py-4'>Pokedex</h1>
        <input type="text" className=' font-normal my-2 text-lg px-6 py-2 w-full rounded' value={search} onChange={handleChange} placeholder='Numero o nombre' />
        <button className='text-center px-8 py-2 w-full bg-slate-700 border transition hover:scale-110 hover:border-white' type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {
        newPkm ? <Pkm pkm={newPkm} /> : <div className='lds-dual-ring'></div>
      }

    </section>
  )
}
