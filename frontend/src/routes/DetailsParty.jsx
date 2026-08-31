import React from 'react'

// api
import partyFetch from '../axios/config'

//hooks
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

//style 
import "./DetailsParty.css"

import useToast from "../hooks/useToast"

const DetailsParty = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [party, setParty] = useState(null);

    //load party
    useEffect(() => {
        const loadDetailsParty = async () => {
            const response = await partyFetch.get(`/parties/${id}`);

            setParty(response.data);

        };
        loadDetailsParty();

    }, [])

    //delete party
    const handleDelete = async () => {

        const result = window.confirm("Deseja realmente excluir essa festa?");

        if (result) {
            const response = await partyFetch.delete(`/parties/${id}`);

            if (response.status === 200) {
                navigate("/")

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useToast(response.data.msg);
            }
        }
    }

    return (
        <div className="party-seccion">

            {!party ? (<p> Carregando festa...</p>) : (
                <div className="container-party">

                    <div className="details-party">
                        <h1>{party.title}</h1>
                        <div className="actions-container">
                            <Link to={`/party/edit/${party._id}`} className="btn">
                                Editar
                            </Link>
                            <button
                                className="btn-secondary"
                                onClick={handleDelete}
                            >
                                Excluir
                            </button>
                        </div>
                        <p>Orçamento: R${party.budget}</p>
                        <p>Anfitrião: {party.author}</p>
                        <p>{party.description}</p>
                        <h3>
                            Serviços contratados:
                        </h3>
                        <div className="services-container">
                            {party.services.map((service) => (
                                <div className="service" key={service._id}>
                                    <img src={service.image} alt={service.name} />
                                    <p>{service.name}</p>
                                </div>

                            ))}
                        </div>


                    </div>
                    <div className="details-party">
                        <img src={party.image} alt={party.title} />
                    </div>
                </div>

            )}

        </div>
    )
}

export default DetailsParty;