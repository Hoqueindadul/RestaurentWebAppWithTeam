import React from "react";
import { Link } from "react-router-dom";

const Recipes = ({ recipes }) => {

  return (
    <>
      <article className="recipes">
        <h3>
          <marquee direction="right">Available Now...</marquee>
        </h3>
        <section
          className="container"
          data-aos="flip-left"
          data-aos-duration="3000"
        >
          {recipes.slice(0, 8).map((element, index) => {
            return <Card key={index} element={element} />;
          })}
        </section>
        <h3>Trending Foods..............</h3>
        <section
          className="container"
          data-aos="flip-left"
          data-aos-duration="3000"
        >
          {recipes.slice(8).map((element, index) => {
            return <Card key={index} element={element} />;
          })}
        </section>
      </article>
    </>
  );
};

export default Recipes;

const Card = ({ element }) => {
  return (
    <Link
      to={`/recipe/${element.id}`}
      className="card"
      data-aos="flip-left"
      data-aos-duration="3000"
    >
      <img src={element.image} alt={element.title} />
      <h4>{element.title}</h4>
      <h4>{element.cookingTime}</h4>
    </Link>
  );
};
