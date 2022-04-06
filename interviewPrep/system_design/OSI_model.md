# OSI (Open System Interconnection) Model
- it defines and used to understand how data is transferred from 1 computer to another in a computer network
- in its basic form, 2 computers are connected via a LAN (Local Area Network) cable and connector (RJ45)
  - shares data with the help of NIC (Network Interface Controller) card
  - this forms the computer network
## Problem
- if 1 computer uses Windows OS, and another uses Mac OS, how would they communicate?
## Solution
- OSI Model was introduced by ISO (International Organization for Standardization) in 1984
## OSI Model contains 7 layers
- each layer is a package of protocols
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/osiLayers.png "OSI Layers")
### Application layer (7)
- this layer is used by network applications
  - network application means computer apps that uses internet
    - computer apps e.g.: chrome, firefox, outlook, skype, etc.
      - these apps are a network app that runs in your PC and does not reside in the application layer
        - but uses application layer protocols to use the internet
#### application layer protocols
- examples
  - HTTP (Hypertext Transfer Protocol)
  - HTTPS (Hypertext Transfer Protocol Secure)
  - FTP (File Transfer Protocol)
  - NFS (Network File System)
  - FMTP (Flight Message Transfer Protocol)
  - DHCP (Dynamic Host Configuration Protocol)
  - SNMP (Simple Network Management Protocol)
  - Telnet
  - SMTP (Simple Mail Transfer Protocol)
  - POP3 (Post Office Protocol version 3)
  - IRC (Internet Relay Chat)
  - NNTP (Network News Transfer Protocol)
- the application layer protocols forms the basis for various network services
  - File Transfer: uses FTP
  - Web Surfing: HTTP/S
  - Emails: SMTP
  - Virtual Terminals: Telnet
#### Summary
- application layer provides services for network applications with the help of protocols to perform user activities
### Presentation layer (6)
1. Translation
    - receives data in the form of alphanumeric characters from Application layer
    - Presentatin layer then translate the data into binary code format for the machine to understand
      - e.g.: convert ASCII (American Standard Code for Information Interchange) to EBCDIC (Extended Binary Coded Decimal Interchange Code)
2. Data Compression
    - before translated data is transmitted, presentation layer will reduce the number of bits that were used to represent the original data
    - can be in 2 type of formats
      1. Lossy
      2. Lossless
    - it reduces the amount of space used to store the original file
      - e.g.: a 5 MB file into a 2 MB file
    - when space is reduced, the amount of time required to transmit also reduces, thus allow data transmission to be faster
      - useful for realtime audio and video streaming
3. Encryption / Decryption
    - use to maintain the integrity of data before transmission
    - it helps to enhance the security of sensitive data
      - data gets encrypted on the sender side, and gets decrypted on the receiver side
    - examples:
      - SSL (Secure Sockets Layer) is used for encryption and decryption
### Session layer (5)
- it helps in setting up and managing connections enabling sending and receiving of data
  - followed by termination of connections or sessions
- it has its own helpers called APIs (Application Programming Interface)
  - examples:
    - NetBIOS (Network Basic Input/Output System)
      - it is an API example that allows applications on different computers to communicate with each other
1. Authentication
    - done before a session or connection is established with the server
    - it is a process of verifying who you are
      - for this, server uses username and password
      - when matched with the server, a connection or session is established between the server and your computer
2. Authorization
    - after authentication, authorization is checked
    - it is a process used by the server to determine if you have permission to access a file
3. Session Management
    - session layer keeps track of the files being downloaded
      - webpage example
        - it contains text and image files, and are stored as separate files on the web server
        - when you request a website on the web browser, it opens a separate session to the web server to download each of the text and image files separately 
        - files are received at the computer in the form of `Data Packets`
        - Session layer keeps tracks of which data packets belongs to which file and where it goes to (web browser for this case)
- the web browser performs all functions of Application, Presentation, and Session layer
### Transport layer (4)
- controls the reliability of communication
#### Segmentation
- data received from the Session layer is divided into small data units called `Segments`
  - each Segment or data unit contains
    - a source and destination Port number
      - helps to direct the segment to the correct computer application
    - a sequence number
      - helps to reassemble segments in the correct order to form correct message at the receiver
#### Flow Control
- controls the amount of data being transmitted
- example: a mobile app connected to a server
  - server can transmit a max data of 100 Mbps
  - mobile can process data with a max of 10 Mbps
  - when mobile is downloading a file from a server
    - if server sends data at 50 Mbps
      - it is a a rate the mobile can't process
      - mobile uses the Transport layer to tell the server to slow the data transmission rate to 10 Mbps so that no data gets lost
    - if server sends data at 5 Mbps
      - mobile uses the Transport layer to tell the server to increase the data trasmission rate to 10 Mbps to maintain system performance
#### Error Control
- Automatic Repeat Request
  - this is used when a data unit did not arrive at the destination
  - it helps to retransmit the lost or corrupted data unit from the server to the app
- Checksum
  - it is added to each data unit by the Transport layer to find out the received corrupted or missing segment
#### transport layer performs 2 types of services
1. Connection-oriented Transmission
    - done via TCP (Transmission Control Protocol)
      - more reliable than UDP
        - because it provides feedback
          - you will know of the data delivery status
          - data can be retransmitted if lost or corrupted
      - used when whole data delivery is a must
        - www (world wide web), email, FTP
2. Connectionless Transmission
    - done via UDP (User Datagram Protocol)
      - UDP (User Datagram Protocol)
        - faster than TCP
          - because it provides no feedback
            - you do not know of the data delivery status
        - used when receiving of whole data is not necessary
          - e.g.: online streaming movies, songs, games, voice over ip, TFTP (Trivial File Transfer Protocol), DNS (Domain Name System)
### Network layer (3)
- Transport Layer sends data segments to the network layer
- Network Layer works for the transmission of the recieved data segments from one computer to another located in different networks
- Data Units in Network Layer is called Data Packets
- The Function of Network Layer are:
1. Logical Addressing
    - IPv4 & IPv6 + Mask
      - every computer in a network has a unique IP address
      - Network layer assigns sender and receiver IP address to each segment to form an IP Packet
        - IP address are assigned to ensure each data packet can reached the correct destination
      - Mask tells that the first 3 combination of an IP address represent the which network
        - the last combination of the IP address represents which host or computer
2. Routing
    - it is a method of moving data packet from source to destination
    - it is based on the logical addressing format (IP addresses and Mask), routing decisions are made in the computer network
3. Path Determination
    - a computer can be connected to an internet server or a computer in a number of ways
      - choosing the best possible path for delivery from source to destination is called path determination
    - examples of protocols used to determine the best possible path for delivery
      - OSPF (Open Shortest Path First)
        - it is a link-state routing protocol
      - BGP (Border Gateway Protocol)
        - it is a standardized exterior gateway protocol
      - IS-IS (Intermediate System to Intermediate System)
        - it is a routing protocol 
### Data Link layer (2)
- Data link layer receives data packets from network layer
  - Data packets contains IP addresses of sender and receiver
    - There are two types of addressing: 
      1. Logical Addressing
          - done at the Network layer
          - where senders and receivers IP addresses are assigned to each segments to form a data packets
      2. Physical Addressing
          - done at the Data Link layer
          - head is added infront of the IP packet, while the tail is added behind
          - where MAC addresses of sender and receiver are assigned to each data packets to form a frame
          - MAC Address is 12 digit Alpha-Character Number Data unit in data link layer is called Frame.
            - it is embedded into the network card by the manufacturer
- Data Unit in Data Link layer is referred to as `frame`
  - it is embedded as a software in NIC (Network Interface Card) of the computer
    - it provide means to transfer data from 1 computer to another via a local media
      - such as copper wire, optical fiber, and air
      - media refers to the physical links between 2 computer or networks
#### performs 2 basic function
1. allows upper layer of OSI Model to access the media
    - via techniques such as framing
      - IP packet gets encapsulated into a frame before sending, upon receiving it gets decapsulated
        - this process repeats itself until the data reaches its final destination
2. controls how data is placed and received from the media
    - via techniques such as media access control, and error detection
      - multiple devices could be connected via a common media
        - if 2 or more devices sends data at the same time
          - there will be a possibility of collision of the 2 messages resulting in a useless message that no recipient can understand 
            - use CSMA (Carrier-Sense Multiple Access) to avoid such a situation
              - it is a (MAC) Media Access Control protocol
              - keeps an eye on when the shared media is free so that device can transmit data to the receiver
              - this helps to control data transmission
            - each frame contains bits which are used to detect errors in the receiver frame
              - errors occur due to certain limitations of the media used for transporting data
### Physical layer (1)
- Till now, Data from Application Layer has  been segmented by Transport Layer - placed into Packets by Network Layer
- and Framed by Data Link Layer
  - which is a sequence of binary 0's and 1's
- physical layer converts this binary bits into signals and transmit over local media
- It can be an electrical signal in the case of Copper cable or LAN cable, Light signal in the case of Optical Fiber, and Radio Signal in the case of AIR
  - So signal generated by physical layer depends on the type of media used to connect two devices
- At the receiver, Physical Layer receives signal and converts to bits and pass it to Data Link Layer as a Frame
- Frame is further decapsulated as data moves through higher layers
- Finally,data is moved to Application Layer
- Application Layer Protocol makes the sender's message visible in the application in the receiver's computer screen
- In this way, OSI model is helping to transfer data between different hosts
  - So, these Seven Layers of OSI model are lying behind the smooth functioning of Internet
