import { useState } from "react";
import { StyledSearchBar, SearchBarInput } from "../../styled-components/SearchBar";
import { NavButton } from "../../styled-components/Navigation";

const SearchBar = ({ onSearch, randomSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');  // Default to searching by name

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchTerm('');  // Clear the search term when switching search type
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm, searchBy);
    } else {
      alert("Please enter a search term");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledSearchBar>
      <select value={searchBy} onChange={handleSearchByChange}>
        <option value="id">Search by ID</option>
        <option value="name">Search by Name</option>
      </select>
      <SearchBarInput 
        type="search" 
        value={searchTerm} 
        onChange={handleChange} 
        onKeyPress={handleKeyPress}
        placeholder={searchBy === 'name' ? "Enter character name" : "Enter character ID"}
      />
      <NavButton onClick={handleSearch}>Search</NavButton>
    </StyledSearchBar>
  );
};

export default SearchBar;