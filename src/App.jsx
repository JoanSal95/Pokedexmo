import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'

function App() {
  return (
    <Router basename="/Pokedexmo">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
