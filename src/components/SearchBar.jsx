import { useState } from 'react';
import './styles/SearchBar.css';

const SearchBar = (props) => {
    const { onSearch } = props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(searchTerm);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch(''); // Clear search results
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={handleSearchChange}/>
            <button onClick={handleSearchChange}>Search</button>
            <button onClick={handleClearSearch}>Clear</button>
        </div>
    );
};

export default SearchBar;