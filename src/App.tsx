import './App.css'
import { useRandom } from './hooks/useRandom'

function App() {

  const { isLoading, data, error, refetch, query } = useRandom()

  return (
    <div className="App">
      {
        query.isFetching ? (<h2>Cargando...</h2>)
          : (<h2>numero aleatorio: {data} </h2>)
      }

      {
        !isLoading && error && (<h4>{error}</h4>)
      }

      <button onClick={() => refetch()} disabled={query.isFetching}>Nuevo numero</button>
    </div>
  )
}

export default App
