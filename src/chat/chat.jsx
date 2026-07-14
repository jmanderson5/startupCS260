import React from 'react';
import './chat.css';

export function Chat() {
  return (
    <main>
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

        <div id="chat-receipts" className="chat-receipts">
            <h4>Chat Receipts</h4>
            <ul id="receiptsList">
                <li>John Doe: Hello! How are you?</li>
                <li>Jane Smith: How is the work coming on the project?</li>
                <li>Bob Johnson: I have a question about the code.</li>
            </ul>
        </div>
    </main>
  );
}