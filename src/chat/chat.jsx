import React, { useState, useEffect } from 'react';
import './chat.css';

export function Chat() {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [messagesReceived] = useState([
        {
            id: 1,
            recipient: 'John Doe',
            text: 'Hello! How are you?',
            sentAt: '7/18/2026, 12:52:42 PM',
        },
        {
            id: 2,
            recipient: 'Jane Smith',
            text: 'How is the work coming on the project?',
            sentAt: '7/18/2026, 12:54:10 PM',
        },
        {
            id: 3,
            recipient: 'Bob Johnson',
            text: 'I have a question about the code.',
            sentAt: '7/18/2026, 12:56:05 PM',
        },
        ]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!recipient || !message.trim()) {
            return
        }

        const newMessage = {
            id: Date.now(),
            recipient,
            text: message.trim(),
            sentAt: new Date().toLocaleString(),
        };

        setMessages((currentMessges) => [
            ...currentMessges,
            newMessage,
        ]);

        setMessage('');
    }

    useEffect(() => {
        localStorage.setItem('message', JSON.stringify(messages));
    }, [messages]);

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

                    <select 
                        id="recipient"
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                    >
                        <option value="">Select a recipient</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Bob Johnson">Bob Johnson</option>
                    </select>

                    <label htmlFor="message">Message</label>

                    <div className="message-input-row">
                    <textarea
                        id="message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Write your message"
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
                    <h4 className="mb-0">Messages Received</h4>
                </div>

                <ul className="receipts-list">
                    {messagesReceived.length === 0 ? (
                        <li className='message'>
                            No message history
                        </li>
                    ) : (
                        messagesReceived.map((receivedMessage) => (
                            <li key={receivedMessage.id}>
                                <div>
                                    <span className="sender">{receivedMessage.recipient}</span>
                                    <span className="message">{receivedMessage.text}</span>
                                </div>
                                <span className='sent-time'>{receivedMessage.sentAt}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="chat-receipts card shadow-sm">
                <div className="card-header">
                    <h4 className="mb-0">Sent Messages</h4>
                </div>

                <ul className="receipts-list">
                    {messages.length === 0 ? (
                        <li className='message'>
                            No message history
                        </li>
                    ) : (
                        messages.map((sentMessage) => (
                            <li key={sentMessage.id}>
                                <div>
                                    <span className="sender">{sentMessage.recipient}</span>
                                    <span className="message">{sentMessage.text}</span>
                                </div>
                                <span className='sent-time'>{sentMessage.sentAt}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    </main>
  );
}