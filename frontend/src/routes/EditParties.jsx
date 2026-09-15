import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useToast from "../hooks/useToast"

// api
import partyFetch from '../axios/config'

//css
import "./Form.css";

//style
import "./EditParties.css"


const EditParty = () => {

  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();


  //load Services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");


      setServices(res.data);

      loadDetailsParty();
    };

    const loadDetailsParty = async () => {
      const response = await partyFetch.get(`/parties/${id}`);

      setParty(response.data);
    };

    loadServices();
  }, []);


  // add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((service) => service._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices = partyServices.filter((service) => service._id !== value);
    }

    setParty({ ...party, services: partyServices })

  }


  //update party
  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const response = await partyFetch.put(`/parties/${party._id}`, party);

      if (response.status === 200) {

        navigate(`/party/${id}`);


        toast(response.data.msg)
      }

    } catch (error) {

      toast(error.response?.data?.msg ?? "Erro desconhecido", "error")
    }
  };

  if (!party) return <p>Carregando...</p>

  return (
    <div className="form-page">
      <h2>Editando: {party.title}</h2>
      <p>Ajuste as informações da sua festa</p>
      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span>
            Nome da festa:
          </span>
          <input
            type="text"
            placeholder="Nome da sua festa"
            required
            onChange={(e) => setParty({ ...party, title: e.target.value })}
            value={party.title}
          />
        </label>
        <label>
          <span>
            Anfitrião:
          </span>
          <input
            type="text"
            placeholder="Quem está dando a festa?"
            required
            onChange={(e) => setParty({ ...party, author: e.target.value })}
            value={party.author}
          />
        </label>
        <label>
          <span>
            Descrição:
          </span>
          <textarea
            placeholder='Conte mais sobre a sua festa'
            required
            onChange={(e) => setParty({ ...party, description: e.target.value })}
            value={party.description}
          >
          </textarea>
        </label>
        <label>
          <span>
            Orçamentos:
          </span>
          <input
            type="text"
            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
            placeholder="Quando você vai investir"
            required
            onChange={(e) => setParty({ ...party, budget: e.target.value })}
            value={party.budget}
          />
        </label>
        <label>
          <span>
            Imagem:
          </span>
          <input
            type="text"
            placeholder="Insira a url da imagem"
            required
            onChange={(e) => setParty({ ...party, image: e.target.value })}
            value={party.image}
          />
        </label>
        <div>
          <h2> Agora escolha os serviços </h2>
          <div className="services-container" >
            {services.length === 0 && (<p>Carregando...</p>)}
            {services.length > 0 && (

              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => { handleServices(e) }}
                      checked={party.services.find(
                        (partyService) => partyService._id === service._id
                      ) || ""}
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="divBtn">
          <button className="btn" type="submit">Atualizar festa</button>
        </div>
      </form>
    </div>
  )
}

export default EditParty