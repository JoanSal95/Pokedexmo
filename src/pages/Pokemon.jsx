import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import styles from './Pokemon.module.css';

function Pokemon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showShiny, setShowShiny] = useState(false);

    useEffect(() => {
        if (id) {
            fetchPokemonDetails(id);
        }
    }, [id]);

    const fetchPokemonDetails = async (pokemonId) => {
        try {
            setLoading(true);
            
            // Obtener datos básicos del Pokémon
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemonData = await pokemonResponse.json();
            setPokemon(pokemonData);

            // Obtener datos de la especie
            const speciesResponse = await fetch(pokemonData.species.url);
            const speciesData = await speciesResponse.json();
            setSpecies(speciesData);

            // Obtener cadena evolutiva
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();
            
            const evolutionArray = await parseEvolutionChain(evolutionData.chain);
            setEvolutionChain(evolutionArray);

        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
        } finally {
            setLoading(false);
        }
    };

    const parseEvolutionChain = async (chain) => {
        const evolutionArray = [];
        let current = chain;

        while (current) {
            const pokemonId = current.species.url.split('/').slice(-2, -1)[0];
            
            try {
                const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const pokemonData = await pokemonResponse.json();
                
                evolutionArray.push({
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.other['official-artwork'].front_default,
                    types: pokemonData.types
                });
            } catch (error) {
                console.error(`Error fetching evolution data for ${current.species.name}:`, error);
            }

            current = current.evolves_to[0];
        }

        return evolutionArray;
    };

    const getTypeColor = (type) => {
        const typeColors = {
            normal: '#a8a878',
            fire: '#f08030',
            water: '#6890f0',
            grass: '#78c850',
            electric: '#f8d030',
            ice: '#98d8d8',
            fighting: '#c03028',
            poison: '#a040a0',
            ground: '#e0c068',
            flying: '#a890f0',
            psychic: '#f85888',
            bug: '#a8b820',
            rock: '#b8a038',
            ghost: '#705898',
            dark: '#705848',
            dragon: '#7038f8',
            steel: '#b8b8d0',
            fairy: '#ee99ac'
        };
        return typeColors[type] || '#68a090';
    };

    const goToPokemon = (pokemonId) => {
        navigate(`/pokemon/${pokemonId}`);
    };

    if (loading) {
        return (
            <div>
                <Header 
                    selectedType="all"
                    setSelectedType={() => {}}
                    searchTerm=""
                    setSearchTerm={() => {}}
                    filteredPokemonsCount={0}
                />
                <div className="container my-5">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3">Cargando datos del Pokémon...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div>
                <Header 
                    selectedType="all"
                    setSelectedType={() => {}}
                    searchTerm=""
                    setSearchTerm={() => {}}
                    filteredPokemonsCount={0}
                />
                <div className="container my-5">
                    <div className="text-center">
                        <h2>Pokémon no encontrado</h2>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/')}
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header 
                selectedType="all"
                setSelectedType={() => {}}
                searchTerm=""
                setSearchTerm={() => {}}
                filteredPokemonsCount={0}
            />
            <div className="container my-4">
                {/* Botón de regreso */}
                <button 
                    className="btn btn-outline-primary mb-4"
                    onClick={() => navigate('/')}
                >
                    <i className="bi bi-arrow-left">←</i> Volver al Pokédex
                </button>

                <div className="row">
                    {/* Información principal del Pokémon */}
                    <div className="col-lg-6 mb-4">
                        <div className={`card ${styles.pokemonCard}`}>
                            <div className="card-body text-center">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h1 className={`card-title ${styles.pokemonName}`}>
                                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                    </h1>
                                    <span className={`badge ${styles.pokemonNumber}`}>
                                        #{pokemon.id.toString().padStart(3, '0')}
                                    </span>
                                </div>

                                {/* Imagen del Pokémon */}
                                <div className={styles.imageContainer}>
                                    <img
                                        src={showShiny ? 
                                            pokemon.sprites.other['official-artwork'].front_shiny || pokemon.sprites.front_shiny :
                                            pokemon.sprites.other['official-artwork'].front_default
                                        }
                                        alt={pokemon.name}
                                        className={styles.pokemonImage}
                                    />
                                </div>

                                {/* Toggle Shiny */}
                                <div className="mb-3">
                                    <div className="form-check form-switch d-inline-block">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="shinyToggle"
                                            checked={showShiny}
                                            onChange={(e) => setShowShiny(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="shinyToggle">
                                            ✨ Versión Shiny
                                        </label>
                                    </div>
                                </div>

                                {/* Tipos */}
                                <div className="mb-3">
                                    {pokemon.types.map((type, index) => (
                                        <span 
                                            key={index}
                                            className={`badge me-2 ${styles.typeBadge}`}
                                            style={{ backgroundColor: getTypeColor(type.type.name) }}
                                        >
                                            {type.type.name.toUpperCase()}
                                        </span>
                                    ))}
                                </div>

                                {/* Descripción */}
                                {species && species.flavor_text_entries && (
                                    <p className={`text-muted ${styles.description}`}>
                                        {species.flavor_text_entries
                                            .find(entry => entry.language.name === 'es' || entry.language.name === 'en')
                                            ?.flavor_text.replace(/\f/g, ' ') || 'No hay descripción disponible'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="col-lg-6 mb-4">
                        <div className={`card ${styles.statsCard}`}>
                            <div className="card-body">
                                <h5 className="card-title">Estadísticas Base</h5>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <strong>Altura:</strong> {pokemon.height / 10} m
                                    </div>
                                    <div className="col-6">
                                        <strong>Peso:</strong> {pokemon.weight / 10} kg
                                    </div>
                                </div>

                                {pokemon.stats.map((stat, index) => (
                                    <div key={index} className="mb-2">
                                        <div className="d-flex justify-content-between">
                                            <span className={styles.statName}>
                                                {stat.stat.name.replace('-', ' ').toUpperCase()}
                                            </span>
                                            <span className={styles.statValue}>{stat.base_stat}</span>
                                        </div>
                                        <div className="progress" style={{height: '8px'}}>
                                            <div 
                                                className="progress-bar"
                                                style={{
                                                    width: `${(stat.base_stat / 255) * 100}%`,
                                                    backgroundColor: getTypeColor(pokemon.types[0].type.name)
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}

                                {/* Habilidades */}
                                <div className="mt-4">
                                    <h6>Habilidades:</h6>
                                    <div>
                                        {pokemon.abilities.map((ability, index) => (
                                            <span 
                                                key={index}
                                                className={`badge bg-secondary me-2 ${styles.abilityBadge}`}
                                            >
                                                {ability.ability.name.replace('-', ' ')}
                                                {ability.is_hidden && ' (Oculta)'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cadena Evolutiva */}
                {evolutionChain.length > 1 && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className={`card ${styles.evolutionCard}`}>
                                <div className="card-body">
                                    <h5 className="card-title text-center mb-4">Cadena Evolutiva</h5>
                                    <div className="row justify-content-center">
                                        {evolutionChain.map((evolution, index) => (
                                            <div key={evolution.id} className="col-md-4 col-sm-6 mb-3">
                                                <div 
                                                    className={`text-center ${styles.evolutionItem} ${evolution.id === pokemon.id ? styles.currentEvolution : ''}`}
                                                    onClick={() => goToPokemon(evolution.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img
                                                        src={evolution.image}
                                                        alt={evolution.name}
                                                        className={styles.evolutionImage}
                                                    />
                                                    <h6 className={styles.evolutionName}>
                                                        {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                                                    </h6>
                                                    <div>
                                                        {evolution.types.map((type, typeIndex) => (
                                                            <span 
                                                                key={typeIndex}
                                                                className={`badge me-1 ${styles.typeBadgeSmall}`}
                                                                style={{ backgroundColor: getTypeColor(type.type.name) }}
                                                            >
                                                                {type.type.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {index < evolutionChain.length - 1 && (
                                                        <div className={`${styles.evolutionArrow} d-none d-md-block`}>
                                                            →
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Pokemon;
