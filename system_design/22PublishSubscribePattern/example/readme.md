# Publish / Subscribe Example
## How to use
- install all dependencies
> npm i
- open 7 terminals
- 1st terminal run server
> node server.js
- 2nd terminal run 1st subscriber
> TOPIC_ID=stock_prices node subscriber.js
- 3rd terminal run 2nd subscriber with the same topic as the 1st subscriber
> TOPIC_ID=stock_prices node subscriber.js
- 4th terminal run 3rd subscriber with different topic
> TOPIC_ID=news_alerts node subscriber.js
- 5th terminal run 1st publisher
> (for i in `seq 1 10000`; do sleep 1; echo New Stock Price; done) | NAME=STOCK_BROKER TOPIC_ID=stock_prices node publisher.js
    - 1st and 2nd subscriber will receive the notifications
- 6th terminal run 2nd publisher
> (for i in `seq 1 10000`; do sleep 1; echo Breaking News; done) | NAME=NEWS_STATION TOPIC_ID=news_alerts node publisher.js
    - only the 3rd subscriber will receive the notifications
- 7th terminal run 3rd publisher
> (for i in `seq 1 10000`; do sleep 1; echo Youtube Notification; done) | NAME=YOUTUBE TOPIC_ID=youtube_notifications node publisher.js
    - none of the subscriber will receive any notifications
