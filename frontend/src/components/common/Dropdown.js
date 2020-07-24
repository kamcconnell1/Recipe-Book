import React from 'react'


const Dropdown = ({ onChange }) => {
  return (
    <div className="control">
      <div className="select">
        <select className='dropdown' onChange={onChange} >
          <option selectedvalue='all'>All</option>
          <option value='breakfast'>Breakfast</option>
          <option value='lunch'>Lunch</option>
          <option value='dinner'>Dinner</option>
        </select>
      </div>
    </div>
  )
}

export default Dropdown


