import { useEffect, useState } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import styles from './Home.module.css'; 

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Función para obtener todos los Pokémon disponibles
    const fetchPokemons = async (limit = 386) => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
            const data = await response.json();
            
            // Obtener detalles de cada Pokémon
            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    return await pokemonResponse.json();
                })
            );
            
            setPokemons(pokemonDetails);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setLoading(false);
        }
    };

    // Filtrar Pokémon por tipo y término de búsqueda
    const filteredPokemons = pokemons.filter(pokemon => {
        const matchesType = selectedType === 'all' || 
            pokemon.types.some(typeInfo => typeInfo.type.name === selectedType);
        
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm) ||
            pokemon.id.toString().includes(searchTerm);
        
        return matchesType && matchesSearch;
    });

    useEffect(() => {
        fetchPokemons();
    }, []);
    return(
        <>
        <Header 
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredPokemonsCount={filteredPokemons.length}
        />

        {/* Sección principal para mostrar Pokémon */}
        <main className="container-fluid py-4">
            {/* Indicador de carga */}
            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="visually-hidden">Cargando Pokémon...</span>
                    </div>
                    <p className="mt-3 fs-4">Cargando Pokémon...</p>
                </div>
            )}

            {/* Información del filtro actual */}
            {!loading && (
                <div className="text-center mb-4">
                    <h2 className={`${styles.filterTitle}`}>
                        {searchTerm ? (
                            `Resultados para "${searchTerm}" ${selectedType !== 'all' ? `(tipo ${selectedType})` : ''} (${filteredPokemons.length})`
                        ) : selectedType === 'all' ? (
                            `Todos los Pokémon (${filteredPokemons.length})`
                        ) : (
                            `Pokémon tipo ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} (${filteredPokemons.length})`
                        )}
                    </h2>
                    {searchTerm && (
                        <button 
                            className={`btn btn-outline-secondary btn-sm mt-2 ${styles.clearSearchBtn}`}
                            onClick={() => setSearchTerm('')}
                        >
                            Limpiar búsqueda
                        </button>
                    )}
                </div>
            )}

            {/* Grid de tarjetas de Pokémon */}
            <div className="row g-3">
                {filteredPokemons.map((pokemon) => (
                    <div key={pokemon.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <Link 
                            to={`/pokemon/${pokemon.id}`} 
                            className="text-decoration-none"
                            style={{ color: 'inherit' }}
                        >
                            <div className={`card h-100 shadow-sm ${styles.pokemonCard}`}>
                                <div className="text-center pt-3">
                                    <img 
                                        src={pokemon.sprites.other.home.front_default}
                                        alt={pokemon.name}
                                        className={`${styles.pokemonImage}`}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className={`card-title text-center ${styles.pokemonName}`}>
                                        #{pokemon.id.toString().padStart(3, '0')} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                    </h5>
                                    
                                    {/* Tipos de Pokémon */}
                                    <div className="text-center mb-2">
                                        {pokemon.types.map((typeInfo, index) => (
                                            <span 
                                                key={index}
                                                className={`badge me-1 ${styles.typeBadge} ${styles[typeInfo.type.name]}`}
                                            >
                                                {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats básicas */}
                                    <div className={`${styles.pokemonStats} mt-auto`}>
                                        <small className="text-muted">
                                            <strong>Altura:</strong> {pokemon.height / 10} m<br/>
                                            <strong>Peso:</strong> {pokemon.weight / 10} kg<br/>
                                            <strong>Exp. Base:</strong> {pokemon.base_experience}
                                        </small>
                                    </div>

                                    {/* Habilidades */}
                                    <div className="mt-2">
                                        <small className="text-muted">
                                            <strong>Habilidades:</strong><br/>
                                            {pokemon.abilities.slice(0, 2).map((ability, index) => (
                                                <span key={index} className="d-block">
                                                    • {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                                                </span>
                                            ))}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Mensaje cuando no hay Pokémon */}
            {!loading && filteredPokemons.length === 0 && (
                <div className="text-center py-5">
                    <h3>
                        {searchTerm ? (
                            `No se encontraron Pokémon que coincidan con "${searchTerm}"`
                        ) : (
                            `No se encontraron Pokémon del tipo ${selectedType}`
                        )}
                    </h3>
                    <p className="text-muted">
                        {searchTerm ? (
                            'Intenta con otro término de búsqueda o limpia el filtro'
                        ) : (
                            'Prueba con otro tipo o selecciona "Ver todos"'
                        )}
                    </p>
                    {(searchTerm || selectedType !== 'all') && (
                        <button 
                            className="btn btn-primary mt-2"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedType('all');
                            }}
                        >
                            Mostrar todos los Pokémon
                        </button>
                    )}
                </div>
            )}
        </main>
        </>
    )
}

export default Home;