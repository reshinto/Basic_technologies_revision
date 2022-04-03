# Logging and Monitoring
- in order to properly understand and diagnose issues that crop up within a system
  - it is critical to have mechanisms in place that create audit trails of various events that occur within said system
## Logging
- the act of collecting and storing logs or useful information about events in your system
- typically your programs will output log messages to its STDOUT or STDERR pipes
  - which will automatically get aggregated into a centralized logging solution
### Storing logs
- requires some sort of system or service to collect all the logs and store them in a database for future reference
  - tools used to store logs
    - [Google Cloud's operations suite formerly known as Stackdriver](https://cloud.google.com/products/operations)
### Formating logs
- depending on the language that you are using, might need a special library to format these logs
  - 2 popular formats for logs
    - [syslog-ng](https://www.syslog-ng.com/)
    - JSON
### When to use example
- in the event a customer complains that they tried to purchase a product, receive a success product purchased message, credit card got charged, but didn't get access to the product
  - this kind of issue is hard to understand and to reproduce, therefore requires logs to get more information (such as errors, operations, requests) to allow us to debug
## Monitoring
- the process of having visibility into a system's key metrics
- it is typically implemented by collecting important events in a system and aggregating them in human-readable charts
- provides you with insights that could be useful if you are designing, building and maintaining a system
- in summary when it comes down to system design, monitoring comes down to making sure that in your overall system you've got systems in play to monitor important metrics about your overall system
### When to use example
- as the system grows, you would want to have visibility into the operations on the system
- e.g.: you might want to see are users getting a lot of errors, latencies?
  - how is the payment service and authentication services working?
  - how many sales you are getting per week, per day, per hour?
  - how many people are logging into your platform everyday?
  - what authentication service are they using?
### Ways to gather metrics
- build some sort of service or use a pre-built tool to scrape your logs (good logs must be implemented) and create metrics out of them
  - however, you are limited to your logs, thus, logs must contain all the information you require
  - another limitation is that if you decide to change your logs, you risk breaking the metrics or monitoring system
- another popular way of gathering metrics is to use a time-series database (a database that is specialized for data related to time or data that will be measured over time)
  - e.g.: [InfluxDB](https://www.influxdata.com/), [Graphite](https://graphiteapp.org/), [Prometheus](https://prometheus.io/)
  - have servers to periodically send metrics to these databases or a central database
    - you then can query that database
    - can also use tools that make pretty graphs out of the values stored in the database
      - e.g.: [Grafana](https://grafana.com/)
## Alerting
- the process through which system administrators get notified when critical system issues occur
- can be set up by defining specific thresholds on monitoring charts
  - when the thresholds limits has been past, alerts are sent to a communication channel like Slack
