import React, { useEffect, useState } from 'react';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,translations,flags,capital,population')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando países:", err);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(country => {
    const name = country.translations?.spa?.common || country.name?.common || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando países...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Países</h2>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="🔍 Buscar país..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredCountries.map((country, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              <img 
                src={country.flags?.png} 
                className="card-img-top border-bottom" 
                alt={`Bandera de ${country.name.common}`}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">
                  {country.translations?.spa?.common || country.name.common}
                </h5>
                <p className="card-text mb-1">
                  <strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}
                </p>
                <p className="card-text">
                  <strong>Población:</strong> {country.population.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCountries.length === 0 && (
        <div className="alert alert-warning text-center">
          No se encontraron países con ese nombre.
        </div>
      )}
    </div>
  );
};

export default Countries;