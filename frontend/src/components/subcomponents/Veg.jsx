import React from 'react';

const Veg = () => {
    return (
        <div className="veg">
            <h1 className="veg-menu">Veg Menu</h1>
            <div className="veg-items">
                <div className="veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/palak_paneer.jpg" alt="Veg Dish 1" style={{ width: '200px', height: '100px' }} />
                    <h3>palak_paneer</h3>
                </div>
                <div className="veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/Dosa.png" alt="Veg Dish 2" style={{ width: '200px', height: '100px' }} />
                    <h3>Dosa</h3>
                </div>
                <div className="veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/chana_masala.jpg" alt="Veg Dish 3" style={{ width: '200px', height: '100px' }} />
                    <h3>Chana Masala</h3>
                </div>
                <div className="veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/Idli.jpeg" alt="Veg Dish 4" style={{ width: '200px', height: '100px' }} />
                    <h3>Idli</h3>
                </div>
                <div className="veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/veg-rice.webp" alt="Veg Dish 5" style={{ width: '200px', height: '100px' }} />
                    <h3>Veg_Rice</h3>
                </div>
                <div className="veg-item" data-aos="flip-left"
          data-aos-duration="3000">
                    <img src="/Paneer-Butter-Masala.jpg" alt="Veg Dish 6" style={{ width: '200px', height: '100px' }} />
                    <h3>Paneer_Butter_Masala</h3>
                </div>
            </div>
        </div>
    );
};

export default Veg;