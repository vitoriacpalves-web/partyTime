import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//style
import "./Search.css"

const Search = ({
    setTitleSearch,
    titleSearch,
    searchParty,
    resetSearch,
    dateOrder,
    handleChangeDateOrder }) => {
    return (
        <div className="search-container">
            <div className="search-bar">
                <label>
                    <input
                        type="text"
                        placeholder='Nome da festa'
                        onChange={(e) => setTitleSearch(e.target.value)}
                        value={titleSearch || ""}
                    />
                </label>
                <button
                    className="btn"
                    onClick={() => searchParty(titleSearch)}>
                    <SearchIcon sx={{ fontSize: "20px" }} />
                </button>
                <button
                    className="btn-secondary"
                    onClick={resetSearch}>
                    Limpar busca
                </button>
            </div>

            <div className="order-bar">
                <label>
                    <span>Selecione a ordem das festas:</span>
                    <Select
                        labelId="date-order-party-label"
                        id="date-order-party"
                        value={dateOrder}
                        onChange={handleChangeDateOrder}
                        MenuProps={{
                            disableScrollLock: true
                        }}
                    >
                        <MenuItem value={true}>As mais recentes</MenuItem>
                        <MenuItem value={false}>As mais antigas</MenuItem>
                    </Select>
                </label>
            </div>
        </div>
    )
}

export default Search