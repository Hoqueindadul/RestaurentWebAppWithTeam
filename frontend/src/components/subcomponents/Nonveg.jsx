import React from 'react';

const Nonveg = () => {
    return (
        <div className="non-veg">
            <h1 className="non-veg-menu">Non-Veg Menu</h1>
            <div className="non-veg-items">
                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/biryani.jpg" alt="Veg Dish 1" style={{ width: '200px', height: '100px' }} />
                    <h3>Biryani</h3>
                </div>
                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/karahi.jpg" alt="Veg Dish 2" style={{ width: '200px', height: '100px' }} />
                    <h3>Karahi</h3>
                </div>
                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/garlic.png" alt="Veg Dish 3" style={{ width: '200px', height: '100px' }} />
                    <h3>Garlic Butter Chicken</h3>
                </div>
                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/chicken_kebab.jpeg" alt="Veg Dish 4" style={{ width: '200px', height: '100px' }} />
                    <h3>Chicken Kebab</h3>

                </div>
                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/Rezala.jpg" alt="Veg Dish 5" style={{ width: '200px', height: '100px' }} />
                    <h3>Chicken Rezala</h3>

                </div>
                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/tandoori.jpg" alt="Veg Dish 6" style={{ width: '200px', height: '100px' }} />
                    <h3>Chicken Tandoori</h3>

                </div>

                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/prawn.jpg" alt="Veg Dish 7" style={{ width: '200px', height: '100px' }} />
                    <h3>Prawn Masala</h3>

                    
                </div>


                <div className="non-veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/fry_prawn.jpg" alt="Veg Dish 8" style={{ width: '200px', height: '100px' }} />
                    <h3>Prawn Fry</h3>
                    
                </div>
            </div>
        </div>
    );
};

export default Nonveg;