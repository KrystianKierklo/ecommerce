import React from 'react'

function Rating(props) {
    const { value, text } = props
  return (
    <div className="rating text-amber-400">
        <span><span className="text-white">Ocena: </span>
            <i className={
                value >= 1 
                    ? 'fa-solid fa-star' 
                    : value >= 0.5 
                        ? 'fa-solid fa-star-half-stroke'
                        : 'fa-regular fa-star'    
            }>
            </i>
        </span> 
        <span>
            <i className={
                value >= 2 
                    ? 'fa-solid fa-star' 
                    : value >= 1.5 
                        ? 'fa-solid fa-star-half-stroke'
                        : 'fa-regular fa-star'    
            }>
            </i>
        </span> 
        <span>
            <i className={
                value >= 3 
                    ? 'fa-solid fa-star' 
                    : value >= 2.5 
                        ? 'fa-solid fa-star-half-stroke'
                        : 'fa-regular fa-star'    
            }>
            </i>
        </span> 
        <span>
            <i className={
                value >= 4 
                    ? 'fa-solid fa-star' 
                    : value >= 3.5 
                        ? 'fa-solid fa-star-half-stroke'
                        : 'fa-regular fa-star'    
            }>
            </i>
        </span> 
        <span>
            <i className={
                value >= 5 
                    ? 'fa-solid fa-star' 
                    : value >= 4.5 
                        ? 'fa-solid fa-star-half-stroke'
                        : 'fa-regular fa-star'    
            }>
            </i>
        </span> 

        <span className="text-white"> {text} opinii</span>
    </div>
  )
}

export default Rating
