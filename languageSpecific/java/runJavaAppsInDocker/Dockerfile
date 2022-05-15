FROM openjdk

# using maven example
COPY target/helloworld-1.0-SNAPSHOT.jar /deployments/

# method 1
CMD java -cp /deployments/helloworld-1.0-SNAPSHOT.jar com.dockerapp.App

# method 2: requires maven-jar-plugin to run
# CMD java -jar /deployments/helloworld-1.0-SNAPSHOT.jar
