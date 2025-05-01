// components/SearchBar.js
import React from 'react';

const SearchBar = ({
  searchTerm,
  suggestions,
  handleSearchChange,
  handleKeyDown,
  handleSubmit,
  handleSelectTicker
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search ticker"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul
          className="suggestions-list list-group mt-2"
          style={{ position: 'absolute', zIndex: 1000, width: '250px' }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectTicker(s)}
              style={{ cursor: 'pointer' }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
