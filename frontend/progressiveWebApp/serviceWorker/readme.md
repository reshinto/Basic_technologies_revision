# Service Worker
## Definition
- A JS script that gets registered with the browser
- stays registered with the browser even when offline
 - data can still be used despite internet being disconnected
- can load content even with no connection
- they cannot directly access the DOM
  - instead, it communicate with the pages it controls
    - by responding to messages sent by the post message interface
    - these pages can manipulate the DOM if needed
- it is a programmable network proxy
  - allows you to control how network requests from your page are handled
- it gets terminated when not being used
  - and gets restarted when they are needed again
- makes use of ES6 promises
- requires HTTPS unless on localhost
### Normal request / response
- ```web browser > remote server```
- browser fetches data, remote server returns data
### With Service Worker
- ```web browser > service worker > remote server```
- service worker acts as a middleman and can intercept request
  - it will then decide what should happend after intercepting the request
    - such as decide whether to show the remote version or offline version
## Use Cases
- most commonly used for offline browsing & caching assets & API calls
- push notifications (Push & Notification API) are also a big part of service workers
  - these are notifcations that will pop up on your desktop or mobile device
    - good for marketing and advertising
- background data sync / preload
  - isn't yet fully supported for all browsers
  - a new API that lets you defer actions until the user has a stable connection
    - e.g.: a user likes a post on a social network,
      - in this case, a request needs to be sent to a server, which isn't possible due to the unstable connection
      - by using this browser sync API, it allows such action to be deferred or put on hold in the cache until connectivity is restored
        - then the post will get liked
- used in Progressive Web Apps
### Service Worker Lifecycle & Events
- ```Register -> Install -> Activate```
  - 1st step is to register the worker
  - 2nd install it by triggering the install event
  - 3rd activate it by triggering the activate event
  - then it can receive message events and functional events
    - e.g.: fetch (events), push (notifications), sync (background sync API)
