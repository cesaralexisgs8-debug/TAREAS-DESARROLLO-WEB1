import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-5">
        <h1 className="display-4 text-primary mb-4">Bienvenido a InfoPaíses</h1>
        <p className="lead">Explora información sobre todos los países del mundo.</p>
        <hr className="my-4" />
        <p>Utiliza nuestra lista actualizada para conocer capitales, banderas y población.</p>
        <Link to="/countries" className="btn btn-primary btn-lg mt-3">Ver Países 🚀</Link>
      </div>
    </div>
  );
};

export default Home;