import React from 'react';
import './about.css';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/login');
  }

  return (
    <main className="about-page">
        <div className="content-box">
            <div className="accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Welcome to the Internship Command Center</button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                        <div className="accordion-body"><strong>Track your internship applications, LeetCode progress, 
                            resume versions, and interview notes</strong> It is shown by default, until the 
                            collapse plugin adds the appropriate classes that we use to style each element. These 
                            classes control the overall appearance, as well as the showing and hiding via CSS 
                            transitions. You can modify any of this with custom CSS or overriding our default 
                            variables. It's also worth noting that just about any HTML can go within the 
                            <code>.accordion-body</code>, though the transition does limit overflow.</div>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Learn from the past, Plan for the future</button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body"><strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</div>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Connect with others in the CS community</button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body"><strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</div>
                    </div>
                </div>
            </div>

            <aside className="yoda-panel">
                <div className="card">
                    <img src="./Yoda.jpeg" className="img-fluid rounded-start h-100" alt="Yoda"/>
                        <title>Yoda Quote</title>
                        <rect width="100%" height="100%" fill="#20c997"></rect>

                    <div className="card-body">
                        <h5 className="card-title">Master Yoda</h5>
                        <p className="card-text">"Fear is the path to the dark side. Fear leads to anger, anger 
                        leads to hate, hate leads to suffering."</p>
                        <form onSubmit={handleSubmit} method="get">
                        <button type="submit" className="btn btn-primary">Be Inspired</button>
                        </form>
                    </div>
                </div>
            </aside>
        </div>    
    </main>
  );
}