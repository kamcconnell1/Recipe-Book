import React from 'react'

const SearchForm = ({ onChange, query }) => {
  return ( 
    <div className="searchForm">
      <div className="field has-addons">
        <div className="control">
          <input className="input searchform" type="text" placeholder="Find a recipe..."   onChange={onChange} value={query}/>
        </div>
      </div>
    </div>
  )
}

export default SearchForm