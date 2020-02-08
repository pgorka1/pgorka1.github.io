import React, {useEffect, useState} from 'react';
import './App.css';
import {subscribeToPeerId, connectToPeer, subscribeToConnectionIn} from "./peer";

export default () => {
    const [peerId, setPeerId] = useState(null);

    // connections
    const [connectionOut, setConnectionOut] = useState(null); // connecting to client
    const [connectionIn, setConnectionIn] = useState(null); // connection from another client

    // inputs
    const [peerIdInputValue, setPeerIdInputValue] = useState('');
    const [messageInputValue, setMessageInputValue] = useState('');

    useEffect(() => {
        if (!peerId) subscribeToPeerId(subscribeToOpenCb);
        if (!connectionIn) subscribeToConnectionIn(subscribeToConnectionInCb);
    });

    const subscribeToOpenCb = (id) => {
        setPeerId(id);
    };

    const subscribeToConnectionInCb = (connection) => {
        setConnectionIn(connection);
        console.log(connection);
        if (!connectionOut) createConnectionOut(connection)
    };

    const createConnectionOut = (connectionInPassed) => {
        let connectionOut = null;
        if (connectionInPassed) { // using id of client that is connected to this peer
            connectionOut = connectToPeer(connectionInPassed.peer);
            if (connectionOut) {
                setConnectionOut(connectionOut);
            }
        }
        return connectionOut;
    };

    const onChangePeerIdInput = (event) => {
        setPeerIdInputValue(event.target.value);
    };

    const onChangeMessageInput = (event) => {
        setMessageInputValue(event.target.value);
    };

    const onClickConnect = () => {
        if (!peerIdInputValue.trim()) return;
        setConnectionOut(connectToPeer(peerIdInputValue))
    };

    const sendMessage = () => {
        if (!messageInputValue.trim()) return;
        connectionOut.send(messageInputValue);
    };


    return (
        <div className="App">
            <h4>Peerjs demo with react</h4>
            User peerId: {peerId}
            <br />
            connection to: {connectionOut ? connectionOut.peer : 'No Connection'}
            <br />
            connection from: {connectionIn ? connectionIn.peer : 'No Connection'}
            <br />
            <br />
            <br />
            <input value={peerIdInputValue} onChange={onChangePeerIdInput} type="text" />
            <button onClick={onClickConnect}>connect</button>
            <br />
            <input value={messageInputValue} onChange={onChangeMessageInput} type="text" />
            <button onClick={() => sendMessage()}>Send Message</button>
        </div>
    );
}
