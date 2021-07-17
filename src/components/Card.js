import React, { useContext } from 'react';
import SuperHeroContext from '../context/superhero'
import { Link } from 'react-router-dom';
import './card.css'

const Card = ({ id, name, img, powerstats, fromSearch }) => {
    const {
        speed,
        intelligence,
        strength
    } = powerstats
    const { handleAdd, handleDelete } = useContext(SuperHeroContext);

    return (
        <div className="alkemy-card hero-card"
            style={{
                width: '18rem', maxWidth: '18rem', minWidth: '18rem', textAlign: 'center',
                display: 'inline-block', margin: '10px'
            }}>
            <img className="card-img-top" src={img} alt="card-pic" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Strength: {strength === 'null' ? 'No info' : strength} </p>
                <p className="card-text">Speed: {speed === 'null' ? 'No info' : speed} </p>
                <p className="card-text">Intelligence: {intelligence === 'null' ? 'No info' : intelligence} </p>

                {
                    fromSearch 
                            ? <button className="alkemy-btn-primary" onClick={() => handleAdd(id)}>add</button>
                            : <>
                                <button className="alkemy-btn-primary">
                                    <Link to={`/hero/${id}`} style={{ textDecoration: 'none', color: "white" }}>
                                        Details
                                    </Link>
                                </button>

                            <button className="alkemy-btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                        </>
                }


            </div>
        </div>
    );
};

export default Card;