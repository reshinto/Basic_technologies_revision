# OSI (Open System Interconnection) Model
- it defines and used to understand how data is transferred from 1 computer to another in a computer network
- in its basic form, 2 computers are connected via a LAN (Local Area Network) cable and connector (RJ45)
  - shares data with the help of NIC (Network Interface Controller) card
  - this forms the computer network
## Problem
- if 1 computer uses Windows OS, and another uses Mach OS, how would they communicate?
## Solution
- OSI Model was introduced by ISO (International Organization for Standardization) in 1984
## OSI Model contains 7 layers
- each layer is a package of protocols
### Application layer
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
### Presentation layer
### Session layer
### Transport layer
### Network layer
### Data Link layer
### Physical layer
