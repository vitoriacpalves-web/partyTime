import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'


// api
import partyFetch from '../axios/config'

//hooks
import { useState, useEffect } from 'react'

//features
import FormatDateTime from '../components/formatDateTime'
import Search from '../components/Search'

const Home = () => {

  const [parties, setParties] = useState(null);
  const [titleSearch, setTitleSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [dateOrder, setDateOrder] = useState(true);

  //load pasties
  useEffect(() => {
    const loadParties = async () => {
      const response = await partyFetch.get("/parties");

      setParties(response.data);
    };

    loadParties()

  }, []);


  // busca
  const searchParty = async (title) => {

    const response = await partyFetch.get(`/parties/search/${title}`);

    console.log(response.data);

    setSearchResult(response.data);

  }

  if (!parties) return <p>Carregando...</p>



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
    <div className="home">

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
  )
}

export default Home