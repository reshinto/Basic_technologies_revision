# TCP (Transmission Control Protocol) vs UDP (User Datagram Protocol)
- both lies at the Layer 4 Transport in the OSI model
  - it lets multiple apps use 1 network connection simultaneously
  1. the sender sends a `message` wrapped by a `Segment`
      - `Segment` contains additional information
        - e.g.: source and destination port numbers
  2. the `Segment` is then sent to the `Network layer` for further processing
  3. the `Segment` will then reappear from the `Network layer` in the receiver's `Transport layer` 
      - `Segment` will be examined to determine the destination port
      - it would then be unwrapped and delivered to the destination port
## TCP
- the reliable, connection based choice
- it is stream-oriented
  - used as a continuous flow of data
  - split up in chunks by TCP
  - e.g.: phone conversation
- Uses of TCP
  - when data loss can't be tolerated or in-order delivery is needed
    - e.g.: file transfers, remote access (SSH)
  - when delivery acknowledgements are needed
    - alternative (not worth the effort): use UDP and implement acknowledgements in app for important packets

|pros|cons|
|-|-|
|delivery acknowledgement|larger packets (header: 20 bytes)|
|guaranteed delivery: packet would be resent if no receipt acknowledge was made|requires more bandwidth as it has bigger overhead: retransmission of packets, acknowledgement of packets|
|requires setting up a connection first (3 way handshake)|slower than UDP|
|congestion control: delays transmission when network is congested|stateful|
|will send packets in order because segments are numbered|data doesn't always get sent out immediately due to side effect of congestion control|
|error detection: no technical improvement from UDP but checksum is mandatory for IPv4 and IPv6 packets||

### TCP Example
- `tcp.js`
  ```javascript
  const net = require("net");

  const server = net.createServer((socket) => {
    socket.write("Hello.");
    socket.on("data", (data) => {
      console.log(data.toString());
    });
  });

  server.listen(8080);
  ```
- Run server
  > node tcp.js
- Make connection
  > telnet 127.0.0.1 8080
- Close connection
  - need to close at server side
## UDP
- lightweight, connectionless choice
- it is message-oriented
  - app sends data in distinct chunks
  - e.g.: email, text messaging
- Uses of UDP
  - multimedia streaming
    - alternative: TCP
      - when its overhead doesn't deteriorate performance
      - some firewalls block UDP for security reasons
    - use UDP for less overhead, send delay undesirable, data loss can be masked
  - small transactions
    - e.g. DBS lookups
    - no need to create and close the connection first
  - Bandwidth-intensive apps that tolerate packet loss

|pros|cons|
|-|-|
|smaller packets sizes (header: 8 bytes)|no acknowledgement|
|less bandwidth|no guaranteed delivery as it has primitive error detection|
|faster than tcp|no error recovery when error detection is detected, corrupted segment would most likely be discarded or remains but turn on a warning flag for the app|
|stateless|no congestion control (packets get dropped more often during congested senario)|
|no connection reqired to create and maintain|packets can arrive out of order|
|more control over when data is sent|no compensation for lost packets|
||checksum is mandatory for only IPv6 packets|

### UDP Example
- udp.js
  ```javascript
  const dgram = require('dgram');
  const socket = dgram.createSocket('udp4');  // for IPv4
  // const socket = dgram.createSocket('udp6');  // for IPv6

  socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });

  socket.bind(8081);
  ```
- Run server
  > node udp.js
- Make connection
  > echo "hi" | nc -w1 -u 127.0.0.1 8081
