import React, { useState, useEffect } from 'react';
import './chat.css';
import { chatNotifier } from './chatNotifier.js';

export function Chat() {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const currentUser = localStorage.getItem('userName');

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
        async function loadMessages() {
            try {
            const response = await fetch(
                '/api/chat/messages',
                {
                credentials: 'include',
                }
            );

            const body = await response.json();

            if (!response.ok) {
                throw new Error(
                body.msg ||
                    'Unable to load chat history'
                );
            }

            setMessages(body);
            } catch (error) {
            console.error(error);
            }
        }

        loadMessages();
    }, []);

    useEffect(() => {
        function handleIncomingEvent(event) {
            if (event.type === 'chat') {
            setMessages((current) => {
                const alreadyExists =
                current.some(
                    (message) =>
                    message.id === event.id
                );

                if (alreadyExists) {
                return current;
                }

                return [...current, event];
            });

            return;
            }

            if (event.type === 'profiles') {
            setProfiles(event.profiles || []);
            }
        }

        chatNotifier.addHandler(
            handleIncomingEvent
        );

        return () => {
            chatNotifier.removeHandler(
            handleIncomingEvent
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
                        {profiles.filter((profile) => profile.email !== currentUser).map((profile) => (
                            <option
                                key={profile.email}
                                value={profile.email}
                            >
                                {profile.name || profile.email}
                            </option>
                        ))}
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
                    {messages.length === 0 ? (
                        <li className='message'>
                            No message history
                        </li>
                    ) : (
                        messages.map((message) => (
                            <li key={message.id}>
                                <div>
                                    <span className="sender">{message.sender}{' → '}{message.recipient}</span>
                                    <span className="message">{message.text}</span>
                                </div>
                                <span className='sent-time'>{formatMessageTime(message.sentAt)}</span>
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