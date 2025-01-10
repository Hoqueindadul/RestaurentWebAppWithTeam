import React from 'react'
import Recipes from "./subcomponents/Recipes"

const Gallery = ({recipes}) => {
  return (
    <>
     <Recipes recipes={recipes} />
    </>
  )
}

export default Gallery
