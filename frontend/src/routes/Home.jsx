import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

//status message
import useToast from "../hooks/useToast"


// api
import partyFetch from '../axios/config'

//hooks
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//features
import FormatDateTime from '../components/formatDateTime'
import Search from '../components/Search'

//mui Materials
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {

  const navigate = useNavigate();
  const toast = useToast();

  const [parties, setParties] = useState(null);
  const [titleSearch, setTitleSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [dateOrder, setDateOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // evitar que a página seja renderizada antes de carregar as festas


  //load pasties and check if user is logged in
  useEffect(() => {
    const loadParties = async () => {

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return; // termina a execução da função se não houver token
      }

      try {
        const response = await partyFetch.get("/parties");
        setParties(response.data);
        setIsLoading(false); // define isLoading como false após carregar as festas

      } catch (error) {

        navigate("/");

        toast("Não foi possível carregar as festas!", error.response?.data?.msg ?? "Erro desconhecido");
      }
    };

    loadParties()

  }, []);


  // busca
  const searchParty = async (title) => {

    const response = await partyFetch.get(`/parties/search/${title}`);

    console.log(response.data);

    setSearchResult(response.data);

  }

  if (!parties) return <CircularProgress sx={{ color: "#7703fc" }} />



  //função de reset
  const resetSearch = () => {
    setSearchResult(null);
    setTitleSearch("");
  }


  //ordenação de parties por data
  const moreRecent = [...parties].sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return dateB - dateA // mais recente
  })


  const lessRecent = [...parties].sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return dateA - dateB // mais antigo
  })



  //pegar o valor do select
  const handleChangeDateOrder = (e) => {
    setDateOrder(e.target.value);
  };


  //decide qual lista será exibida
  const orderedParties = dateOrder ? moreRecent : lessRecent;
  const listToShow = searchResult || orderedParties;

  return (
    <>
      {isLoading ? (
        < CircularProgress sx={{color:"#7703fc"}} />
      ) : (
        <div className='home'>
          <h2>Suas Festas</h2>

          <Search
            titleSearch={titleSearch}
            setTitleSearch={setTitleSearch}
            searchParty={searchParty}
            resetSearch={resetSearch}
            dateOrder={dateOrder}
            handleChangeDateOrder={handleChangeDateOrder}
          />

          <div className='parties-container'>
            {listToShow.length === 0 && (<p>Não há festas cadastradas</p>)}
            {listToShow.map((party) => (
              <div className="party" key={party._id}>
                <img src={party.image} alt={party.title} />
                <h3>{party.title}</h3>
                <p>Data de criação: {FormatDateTime(party.createdAt)}</p>
                <Link className='btn-secondary' to={`/party/${party._id}`} >
                  Detalhes
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

    </>

  )
}

export default Home