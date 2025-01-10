import React from 'react'

const About = () => {
  return (
    <>
      <article className='about'>
        <section id="about" class="about section">

          <div class="container">

            <div class="items">
              <div class="col content">
                <h1><u><span class="spn">About Us</span></u></h1>
                <p class="fst-italic">
                "Welcome to Rannaghar – where tradition meets taste.
                                    Discover the authentic flavors of Bengal,
                                    lovingly crafted in every dish. Your culinary journey begins here."
                </p>
                <ul>
                  <li><i class="bi bi-check2-all"></i> <span>At Rannaghar, we celebrate the rich and diverse flavors of food. Our resturant offers a warm and
                    inviting atmosphere where you can savor authentic dishes crafted with love and tradition.</span></li>
                  <li><i class="bi bi-check2-all"></i> <span>Every
                    dish at Rannaghar is a tribute to time-honored recipes passed down through generations,
                    prepared using the freshest ingredients and traditional technique.</span></li>
                  <li><i class="bi bi-check2-all"></i> <span>Whether you are joining us for
                    a family dinner, a special celebration, or a casual meal with friends, we promise an unforgettable
                    culinary experience.</span></li>
                </ul>
                <p>
                  At Rannaghar, we believe that dining is not just about food; it's about creating memories.
                  Our dedicated team is committed to providing exceptional service and ensuring that every visit is a delightful
                  and memorable one.Join us at Rannaghar, where every meal is a story, and every bite is a journey.....
                </p>
              </div>
              <div class="col image" data-wow-delay="0.1s" data-aos="zoom-in"
                data-aos-duration="3000">
                <img src="/about.jpg" class="fld about-img" alt="coffee" style={{ width: '600px', height: '400px' }}></img>
              </div>
            </div>

          </div>

        </section>
      </article>
    </>
  )
}

export default About
