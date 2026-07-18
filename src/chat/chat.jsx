import React from 'react';
import './chat.css';

export function Chat() {
  return (
    <main className="chat-page">
        <div className="content">
            <form id="messageForm">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="recipientDropdown" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                        Select Recipient
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="recipientDropdown">
                        <li><a className="dropdown-item" href="#" data-value="John Doe">John Doe</a></li>
                        <li><a className="dropdown-item" href="#" data-value="Jane Smith">Jane Smith</a></li>
                        <li><a className="dropdown-item" href="#" data-value="Bob Johnson">Bob Johnson</a></li>
                    </ul>
                </div>
                <textarea id="message" name="message" rows="4" cols="50" 
                placeholder="Type your message here..."></textarea>
                <br />
                <button type="button" className="btn btn-outline-primary me-2">Send</button>
            </form>

            <div className="chat-receipts card shadow-sm">
                <div className="card-header">
                    <h4 className="mb-0">Chat Receipts</h4>
                </div>

                <ul className="receipts-list">
                    <li>
                    <span className="sender">John Doe</span>
                    <span className="message">Hello! How are you?</span>
                    </li>

                    <li>
                    <span className="sender">Jane Smith</span>
                    <span className="message">How is the work coming on the project?</span>
                    </li>

                    <li>
                    <span className="sender">Bob Johnson</span>
                    <span className="message">I have a question about the code.</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
  );
}