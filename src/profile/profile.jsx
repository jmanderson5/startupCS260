import React from 'react';
import './profile.css';

export function Profile() {
  return (
    <main className="profile-page">
        <div className="content">
            <div className="card">
                <img src="./BenjaminAndersonArmy.jpeg" className="card-img-top" alt="Benjamin Anderson" />
                <title>Profile Summary</title>
                <rect width="100%" height="100%" fill="#20c997"></rect>

                <div className="card-body">
                <h5 className="card-title">Benjamin Anderson</h5>
                <p className="card-text">Studying Computer Science at BYU</p>
                <a href="https://benjaminanderson.me" className="btn btn-primary" target="_blank">My Website</a>
                </div>
            </div>
            <section id="Applications" className="Applications">
                <h3>Applications</h3>
            <div className="accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Google</button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                        <div className="accordion-body">
                            <div id="application_info" className="application_info">
                            <nav>
                                <a href="benjamin_generated_resume.jpg">View Application</a>
                                <a href="benjamin_generated_resume.jpg">View Interview Notes</a>
                            </nav>
                            <p>Offer Status: Bamboozled</p>
                        </div>
                        <ul>
                            <li>Applied: 01/01/2024</li>
                        </ul></div>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Facebook</button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div id="application_info" className="application_info">
                            <nav>
                                <a href="benjamin_generated_resume.jpg">View Application</a>
                                <a href="benjamin_generated_resume.jpg">View Interview Notes</a>
                            </nav>
                            <p>Offer Status: Bamboozled</p>
                        </div>    
                        <ul>
                            <li>Applied: 01/01/2024</li>
                        </ul></div>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Amazon</button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div id="application_info" className="application_info">
                            <nav>
                                <a href="benjamin_generated_resume.jpg">View Application</a>
                                <a href="benjamin_generated_resume.jpg">View Interview Notes</a>
                            </nav>
                            <p>Offer Status: Bamboozled</p>
                        </div>    
                        <ul>
                            <li>Applied: 01/01/2024</li>
                        </ul></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div className="content">
            <div id="profile-box">
                <section id="LeetCode" className="LeetCode">
                    <h3>LeetCode Progress</h3>
                    <p>Track your LeetCode progress <button type="button" className="btn btn-outline-info">Do It</button></p>
                </section>
                <form id="Connect" className="Connect" action="./chat.html" method="get">
                    <h3>Connect</h3>
                    <p>Connect with other users <button type="button" 
                        className="btn btn-outline-info">Do It</button></p>
                </form>
            </div>    
            <section id="schedule" className="schedule">
                <h3>Schedule</h3>
                <p>View your upcoming interviews and deadlines</p>
                <p>Google API placeholder</p>
            </section>
            <section id="github" className="github">
                <h3>GitHub</h3>
                <p>View your GitHub repositories and contributions</p>
                <p>GitHub API placeholder</p>
            </section>
        </div>
    </main>
  );
}