import Peer from "peerjs";

let peerIdSubscriber;
let connectionInSubscriber;

let connection = null;
const peer = new Peer();

const subscribeToPeerId = (subscriber) => {
    peerIdSubscriber = subscriber;
};

const subscribeToConnectionIn = (subscriber) => {
    connectionInSubscriber = subscriber;
};

const connectToPeer = (id) => {
    connection = peer.connect(id);
    return connection;
};

peer.on('connection', function (conn) {
    connectionInSubscriber(conn);
    conn.on('data', function (data) {
        console.log(data);
    });
});

peer.on('open', function (id) {
    peerIdSubscriber(id);
});

export {peer, subscribeToPeerId, connectToPeer, subscribeToConnectionIn}
