// import React from 'react';
// import pfp from './images/pfp1.png';

// function Chatcard() {
//     const data = [
//         { name: 'RISE OF APES', pfp: pfp }
//         // { name: '#C2', pfp: pfp },
//         // { name: '#C3', pfp: pfp },
//         // { name: '#C4', pfp: pfp },
//         // { name: '#C5', pfp: pfp }
//     ];

//     return (
//         <div className='cards'>
//             {data.map(content => (
//                 <div className='card' key={content.name}>
//                     <h2 className='headerc'>TCC</h2>
//                     {/* <img className='icon' src={content.pfp} alt={content.name} /> */}
//                     <p className='name'>{content.name}</p>
//                     <button className='chat'>CHAT</button>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Chatcard;



import React, { useState, useEffect } from 'react';
// import pfp from './images/pfp1.png';
import '../index.css'
import { over } from 'stompjs'
import SockJS from 'sockjs-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
// import Stomp from 'stompjs';
var stompClient = null;

function Chatcard() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const openChat = () => {
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }
    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => {
        connect();
    }

    return (

        <div className='cards'>
            <div className='card'>
                <h2 className='headerc'>TCC</h2>
                <p className='name'>RISE OF APES</p>
                <button className='chat' onClick={openChat}>
                    CHAT
                </button>
            </div>
            {isChatOpen && (
                <div className='chat-dialog'>
                    <h1 className='chat-header'>THE RISE OF APES</h1>
                    <button className='close-button' onClick={closeChat}>
                        <FontAwesomeIcon icon={faX} style={{ color: "#000", }} />
                    </button>
                    {userData.connected ?
                        <div className="chat-box">
                            <div className="member-list">
                                <ul>
                                    <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>CHAT ROOM</li>
                                    {[...privateChats.keys()].map((name, index) => (
                                        <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>
                            {tab === "CHATROOM" && <div className="chat-content">
                                <ul className="chat-messages">
                                    {publicChats.map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                                </div>
                            </div>}
                            {tab !== "CHATROOM" && <div className="chat-content">
                                <ul className="chat-messages">
                                    {[...privateChats.get(tab)].map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                                </div>
                            </div>}
                        </div>
                        :
                        <div className="register">
                            <input
                                id="user-name"
                                placeholder="Enter your name"
                                name="userName"
                                value={userData.username}
                                onChange={handleUsername}
                                margin="normal"
                            />
                            <button className='buttonc' type="button" onClick={registerUser}>
                                CONNECT
                            </button>
                        </div>}
                </div>
            )}
        </div>

    );
}

export default Chatcard;





