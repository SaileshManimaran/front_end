// FilterComponent.jsx

import React, { useState } from 'react';

const FilterComponent = ({ onFilter }) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleApplyFilter = () => {
    // Pass the filter text to the parent component
    onFilter(filterText);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter filter text"
        value={filterText}
        onChange={handleFilterChange}
      />
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterComponent;
