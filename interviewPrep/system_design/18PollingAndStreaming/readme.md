# Polling And Streaming
- it is like a classroom, sometimes students ask the teacher lots of questions
  - other times they quiet down and listen attentively to the teacher's lecture
## When to use
- when we are designing a system, if clients wants a piece of data that gets updated or that changes very regularly
  - the clients are gonna have to be able to monitor the data changes (e.g.: temperature outside, or messages from a chat) in real time as the data will change a lot
    - the servers are gonna have this changing data, and clients are gonna need to see all these changes
- in such cases, Polling and Streaming comes into play to help reflect these regular updates of data
## Terms Used
### Polling
- the act of fetching a resource or piece of data regularly at an interval to make sure your data is not too stale
  - e.g.: fetch data at every x number of seconds
- However, it has limitations
  - for apps like chat apps, you would want to send and receive messages instantly
  - reducing the interval seconds can mimic the instantenous experience but comes with a trade off of having a lot of load on the server
### Streaming
- in networking, it usually refers to the act of continuously getting a feed of information from a server by keeping an open connection between the 2 machines or processes
  - typically referred to as a socket, which is a file that lives on your computer, that your computer can write to and read from, to communicate with another computer in a long lived connection, without having to repeatedly send requests
- in Streaming, client is actively listening for data, and not requesting for data from servers
  - it is the server's job to send the data to the client whenever the server gets an update
  - in other words, the server will proactively push data to clients
- one thing to take note is that, Streaming is not necessary better than polling
  - Polling would be better if you need data updated not too frequently
    - e.g.: a dashboard that monitors stock prices and gives you a snapshot of stock prices at any given point in time, but not to allow users to do live trading
