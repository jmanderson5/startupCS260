import React, { useState } from 'react';
import './chat.css';

export function Chat() {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <main className="chat-page">
        <div className="content-chat">
            <form className="message-form" onSubmit={handleSubmit}>
                <div className="message-form-header">
                    <h3>New Message</h3>

                    <span className="selected-recipient">
                    {recipient
                        ? `Sending to: ${recipient}`
                        : 'No recipient selected'}
                    </span>
                </div>

                <div className="message-controls">
                    <label htmlFor="recipient">Recipient</label>

                    <select id="recipient"
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}>
                        <option value="">Select a recipient</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Bob Johnson">Bob Johnson</option>
                    </select>

                    <label htmlFor="message">Message</label>

                    <div className="message-input-row">
                    <textarea
                        id="message"
                        placeholder='Select a recipient first...'
                    />

                    <button
                        type="submit"
                        className="send-button"
                    >
                        Send
                    </button>
                    </div>
                </div>
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