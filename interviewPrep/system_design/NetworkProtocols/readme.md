# Network Protocols
- IP packets, TCP headers, HTTP requests
- these low-level networking concepts are essential to understanding how machines in a system communicate with one another
- it will consists of messages that are gonna be sent and received by machines, clients, and servers over the network
  - it contains
    - the type of messages
    - the format of the messages
    - how they are structured
    - the order of those messages if they have an order
    - whether or not they should be some sort of response to a message if there should be
    - what that response should look like
    - whether or not there should be rules around when messages can be sent to one another
## Protocol
- it is an agreed upon set of rules for an interaction between 2 parties
- analogy example
  - when 2 people who vaguely know each other cross each other while walking down a hallway
    - typically, they will have some kind of exchange
      - chat with one another with small talk then say bye
## Key Terms
### IP
- stands for Internet Protocol
- the modern internet effectively runs on IP
  - meaning that when a machine or a client tries to interact with another machine or a server and it sends data to that other machine
    - that data is going to be sent in the form of IP Packet
- this network protocol outlines how almost all machine-to-machine communications should happen in the world
- other protocols like TCP, UDP and HTTP are built on top of IP
- IP has 2 versions
  - IPv4: most of the modern day internet uses
  - IPv6: now being used more and more
### TCP
- stands for Transimission Control Protocol
- built on top of the Internet Protocol (IP)
- allows for ordered, reliable data delivery between machines over the public internet by creating a connection
- TCP is usually implemented in the kernel, which exposes sockets to applications that they can use to stream data through an open connection
- it is meant to send IP Packets in an ordered way, and in a reliable way guaranteeing that the IP Packets sent will be received by the destination
  - you will know if some packets keep failing from getting received and in the error free way
    - this means that if the data sent was corrupted, you will know and will be able to resend those packets
- TCP is used in virtually all web applications and allows you to send arbitrarily long pieces of data to other machines
- TCP example
  - when a machine wants to communicate with another machine over TCP
    - when your browser wants to communicate with a website's servers
      - 1st it will create a TCP connection with the destination computer / server through a handshake
        - handshake:
          - is a special TCP interaction where 1 computer contacts the other by sending a packet or a few packets stating that it wants to connect with the other computer, the other computer will response and say ok
          - the client that was trying to establish the connection will reresponds again and say that the the 2 computers are connected and there is an open connection
      - once the connection is established, both machines can freely send data to one another
        - however, if one of the 2 machines doesn't send data in a given amount of period, the connection can be timed out
        - if one of the machines wants to end the connection, it can do so be sending a special message to the other machine know about the ending of the connection
- summary: it is a more powerful and more functional wrapper around IP, but still lacks a robust framework that developers can use to ready define meaningful and easy to use communication channels for clients and servers in the system
  - HTTP solves this issue
### HTTP
- the HyperText Transfer Protocol is a very common network protocol implemented on top of TCP
- follows the request response paradigm
- clients make HTTP requests, and servers respond with a response
- requests typically have the following schema
    ```
    host: string (example: algoexpert.io)
    port: integer (example: 80 or 443)
    method: string (example: GET, PUT, POST, DELETE, OPTIONS or PATCH)
    path: string (example: /payments)
    headers: pair list (example: "Content-Type" => "application/json")
    body: opaque sequence of bytes
    ```
    - path: servers might have multiple paths for different services
      - clients will issue requests to these various paths
        - depending on the path, different business logic will occur
    - headers: contain important meta-data about the request
- responses typically have the following schema
    ```
    status code: integer (example: 200, 401)
    headers: pair list (example: "Content-Length" => 1238)
    body: opaque sequence of bytes
    ```
### IP Packet
- it is made up (stored in) of bytes
- sometimes more broadly referred to as just a (network) packet
- an IP Packet is effectively the smallest unit used to describe data being sent over IP from 1 machine to another
- asides from bytes, an IP Packet consists of 2 main sections:
  - an IP header:
    - contains the source and destination IP addresses as well as other information related to the network
    - the total size of the packet
    - the version of the IP packet is operating by
    - header size is between 20 to 60 bytes
  - a payload: is just the data being sent over the network
    - contains a TCP header
      - contains the information about the ordering of packets
    - the rest will be the actual data portion
- IP Packet are limited in size
  - are only 2^16 bytes (65,536 bytes)
  - only way to send more data is to use multiple IP Packets
    - if multiple IP Packets are being sent from one machine to another and is only using IP
      - there is no way of guaranteeing that these packets are gonna be received
        - some of the packets might get lost over the network
      - there is no guarantee in the order in which those packets will be read or interpreted
    - TCP is required to solve this issue
