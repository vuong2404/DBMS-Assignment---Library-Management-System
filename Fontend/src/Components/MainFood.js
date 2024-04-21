import React, { useState, useEffect } from 'react'
import OurFood from './OurFood'

const MainFood = () => {
  const [foodData, setFoodData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/all')
      .then((response) => response.json())
      .then((data) => setFoodData(data))
      .catch((error) => console.error('Error fetching food data:', error))
  }, [])

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-between">
        {foodData.map((food, i) => (
          <OurFood key={i} {...food} />
        ))}
      </div>
    </div>
  )
}

export default MainFood
