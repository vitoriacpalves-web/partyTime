import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useToast from "../hooks/useToast"

// api
import partyFetch from '../axios/config'

//css
import "./Form.css";



const CreateParty = () => {

  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [partyService, setPartyServices] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  //load Services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      console.log(res.data);
      setServices(res.data);
    };

    loadServices();
  }, []);


  // add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((service) => service._id === value);

    if (checked) {
      setPartyServices((partyService) => [...partyService, filteredService[0]])
    } else {
      setPartyServices((partyService) => partyService.filter((service) => service._id !== value));
    }
  }

  // create a new party
  const Create = async (e) => {
    e.preventDefault();

    try {

      const partyData = {
        title,
        author,
        description,
        budget,
        image,
        services: partyService,
      };

      const response = await partyFetch.post("/parties", partyData);

      if (response.status === 201) {
        navigate("/home");

      
        toast(response.data.msg);
      }

    } catch (error) {

    
      toast(error.response?.data?.msg ?? "Erro desconhecido");
    }
  };

  return (
    <div>

      <div className="form-page">
        <h2>Crie sua próxima Festa</h2>
        <p>Defina o seu orçamento e escolha os serviços</p>
        <form onSubmit={(e) => Create(e)}>
          <label>
            <span>
              Nome da festa:
            </span>
            <input
              type="text"
              placeholder="Nome da sua festa"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
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
              onChange={(e) => setAuthor(e.target.value)}
              value={author || ""}
            />
          </label>
          <label>
            <span>
              Descrição:
            </span>
            <textarea
              placeholder='Conte mais sobre a sua festa'
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description || ""}
            >
            </textarea>
          </label>
          <label>
            <span>
              Orçamentos:
            </span>
            <input
              type="text"
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '' )}
              placeholder="Quando você vai investir"
              required
              onChange={(e) => setBudget(e.target.value)}
              value={budget || ""}
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
              onChange={(e) => setImage(e.target.value)}
              value={image || ""}
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
                      <input type="checkbox" value={service._id} onChange={handleServices} />
                      <p>Marque para solicitar</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="divBtn">
            <button className="btn" type="submit">Criar festa</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateParty