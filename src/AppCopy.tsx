import { useEffect, useReducer, useState } from 'react'
import './App.css'


const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  return +numberString;
}

function App() {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forcerefresh] = useReducer(x => x + 1, 0)

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi().then(n => setNumber(n)).catch(error => setError(error.message))
  }, [key])

  useEffect(() => {
    if(number) setIsLoading(false)
  }, [number])
  
  useEffect(() => {
    if(error) setIsLoading(false)
  }, [error])

  return (
    <div className="App">
      {
        isLoading ? (<h2>Cargando...</h2>)
          : (<h2>numero aleatorio: {number} </h2>)
      }

      {
        !isLoading && error && (<h4>{error}</h4>)
      }

      <button onClick={forcerefresh} disabled={isLoading}>{isLoading? '...' : 'Nuevo numero'}</button>
    </div>
  )
}

export default App
