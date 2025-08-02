import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './Header.module.css';

function Header({ 
    selectedType, 
    setSelectedType, 
    searchTerm, 
    setSearchTerm, 
    filteredPokemonsCount 
}) {
    // Función para filtrar por tipo
    const filterByType = (type) => {
        setSelectedType(type);
    };

    // Función para manejar búsqueda
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    return (
        <nav className={`navbar navbar-expand-lg bg-primary ${styles.nav}`}>
            <div className="container-fluid">
                {/* Logo */}
                <div className="navbar-brand d-flex align-items-center">
                    <img 
                        src="src\img\pokemon_transparente-removebg-preview.png" 
                        alt="Logo Pokédex"
                        className={`img-fluid ${styles.navImg}`}
                    />
                   
                </div>

                {/* Botón hamburguesa para móvil */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent" 
                    aria-controls="navbarContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className={`navbar-toggler-icon ${styles.hamburgerIcon}`}></span>
                </button>

                {/* Contenido colapsable */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Barra de búsqueda */}
                    <div className="d-flex justify-content-center w-100 my-3 my-lg-0">
                        <div className={`input-group ${styles.searchContainer}`}>
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search text-muted">🔍</i>
                            </span>
                            <input
                                type="text"
                                className={`form-control border-start-0 ${styles.searchInput}`}
                                placeholder="Buscar Pokémon por nombre o número..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {searchTerm && (
                                <span 
                                    className={`input-group-text bg-white border-start-0 ${styles.clearButton}`}
                                    onClick={() => setSearchTerm('')}
                                    style={{cursor: 'pointer'}}
                                >
                                    ✕
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Botones de filtro */}
                    <div className="w-100">
                        <div className={`d-flex flex-wrap justify-content-center gap-2 ${styles.filterButtons}`}>
                            <button 
                                className={`btn btn-primary ${styles.btnHeader} ${styles.verTodos} ${selectedType === 'all' ? styles.active : ''}`} 
                                onClick={() => filterByType('all')}
                            >
                                Ver todos
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.normal} ${selectedType === 'normal' ? styles.active : ''}`} 
                                onClick={() => filterByType('normal')}
                            >
                                Normal
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.fire} ${selectedType === 'fire' ? styles.active : ''}`} 
                                onClick={() => filterByType('fire')}
                            >
                                Fire
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.water} ${selectedType === 'water' ? styles.active : ''}`} 
                                onClick={() => filterByType('water')}
                            >
                                Water
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.grass} ${selectedType === 'grass' ? styles.active : ''}`} 
                                onClick={() => filterByType('grass')}
                            >
                                Grass
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.electric} ${selectedType === 'electric' ? styles.active : ''}`} 
                                onClick={() => filterByType('electric')}
                            >
                                Electric
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.ice} ${selectedType === 'ice' ? styles.active : ''}`} 
                                onClick={() => filterByType('ice')}
                            >
                                Ice
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.fighting} ${selectedType === 'fighting' ? styles.active : ''}`} 
                                onClick={() => filterByType('fighting')}
                            >
                                Fighting
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.poison} ${selectedType === 'poison' ? styles.active : ''}`} 
                                onClick={() => filterByType('poison')}
                            >
                                Poison
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.ground} ${selectedType === 'ground' ? styles.active : ''}`} 
                                onClick={() => filterByType('ground')}
                            >
                                Ground
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.flying} ${selectedType === 'flying' ? styles.active : ''}`} 
                                onClick={() => filterByType('flying')}
                            >
                                Flying
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.psychic} ${selectedType === 'psychic' ? styles.active : ''}`} 
                                onClick={() => filterByType('psychic')}
                            >
                                Psychic
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.bug} ${selectedType === 'bug' ? styles.active : ''}`} 
                                onClick={() => filterByType('bug')}
                            >
                                Bug
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.rock} ${selectedType === 'rock' ? styles.active : ''}`} 
                                onClick={() => filterByType('rock')}
                            >
                                Rock
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.ghost} ${selectedType === 'ghost' ? styles.active : ''}`} 
                                onClick={() => filterByType('ghost')}
                            >
                                Ghost
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.dark} ${selectedType === 'dark' ? styles.active : ''}`} 
                                onClick={() => filterByType('dark')}
                            >
                                Dark
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.dragon} ${selectedType === 'dragon' ? styles.active : ''}`} 
                                onClick={() => filterByType('dragon')}
                            >
                                Dragon
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.steel} ${selectedType === 'steel' ? styles.active : ''}`} 
                                onClick={() => filterByType('steel')}
                            >
                                Steel
                            </button>
                            <button 
                                className={`btn ${styles.btnHeader} ${styles.fairy} ${selectedType === 'fairy' ? styles.active : ''}`} 
                                onClick={() => filterByType('fairy')}
                            >
                                Fairy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
