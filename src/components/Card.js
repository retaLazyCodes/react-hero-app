import React, { useContext } from 'react';
import HeroesContext from '../context/auth/index';
import { Link } from 'react-router-dom';

const Card = ({ id, name, img, powerstats, fromSearch }) => {
    const {
        // combat,
        durability,
        // intelligence,
        power,
        // speed,
        strength
    } = powerstats
    const context = useContext(HeroesContext);
    const { handleHero, handleAdd, handleDelete } = context;
    return (
        <div className="alkemy-card" style={{ width: '18rem', maxWidth: '18rem', minWidth: '18rem', textAlign: 'center' }}>
            <img className="card-img-top" src={img} alt="Imagen de card" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Power: {power === 'null' ? 'No info' : power} </p>
                <p className="card-text">Strength: {strength === 'null' ? 'No info' : strength} </p>
                <p className="card-text">Durability: {durability === 'null' ? 'No info' : durability} </p>

                {
                    fromSearch ? <button className="alkemy-btn-primary" onClick={() => handleAdd(id)}> Add </button>
                        : <> <Link to={`/hero/${id}`}>
                            <button className="alkemy-btn-primary btn-primary" onClick={() => handleHero(id)}> Detail </button>
                        </Link>
                            <button className="alkemy-btn-danger" onClick={() => handleDelete(id)}> Delete </button>
                        </>
                }


            </div>
        </div>
    );
};

export default Card;