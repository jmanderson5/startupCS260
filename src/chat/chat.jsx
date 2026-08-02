import React, { useState, useEffect } from 'react';
import './chat.css';
import { chatNotifier } from './chatNotifier.js';

export function Chat() {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    
    const [messagesReceived, setMessagesReceived] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!recipient || !message.trim()) {
            return;
        }

        const sender =
            localStorage.getItem('userName') || 'Anonymous';
        const newMessage = {
            type: 'chat',
            id: crypto.randomUUID(),
            sender,
            recipient,
            text: message.trim(),
            sentAt: new Date().toISOString(),
        };

        try {
            chatNotifier.sendMessage(newMessage);
            setMessage('');
        } catch (error) {
            console.error(
            'Unable to send message:',
            error
            );
        }
    }

    useEffect(() => {
        function handleIncomingMessage(
            incomingMessage
        ) {
            if (incomingMessage.type !== 'chat') {
                return;
            }

            console.log(
                'Adding chat message to React:',
                incomingMessage
            );

            setMessagesReceived((current) => [
                ...current,
                incomingMessage,
            ]);
        }

        chatNotifier.addHandler(
            handleIncomingMessage
        );

        return () => {
            chatNotifier.removeHandler(
            handleIncomingMessage
            );
        };
    }, []);

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
                    <h4 className="mb-0">Messages</h4>
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
                                    <span className="sender">{receivedMessage.sender}{' → '}{receivedMessage.recipient}</span>
                                    <span className="message">{receivedMessage.text}</span>
                                </div>
                                <span className='sent-time'>{formatMessageTime(receivedMessage.sentAt)}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    </main>
  );
}

function formatMessageTime(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}