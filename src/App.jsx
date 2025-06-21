import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (busqueda.trim() === '') {
      setPokemon(null);
      setError('');
      return;
    }

    const fetchPokemon = async () => {
      setCargando(true);
      setError('');
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`);
        if (!res.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await res.json();
        setPokemon({
          nombre: data.name,
          imagen: data.sprites.front_default
        });
      } catch (err) {
        setPokemon(null);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchPokemon();
  }, [busqueda]);

  return (
    <div className="App">
      <h1>Buscador de Pokémon</h1>

      <input
        type="text"
        placeholder="Escribe un nombre (ej: pikachu)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      {pokemon && (
        <div className="card">
          <h2>{pokemon.nombre}</h2>
          <img src={pokemon.imagen} alt={pokemon.nombre} />
        </div>
      )}
    </div>
  );
}

export default App;