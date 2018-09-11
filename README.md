# Environment Sample Page

Sample page to show environment data calling **API Gateway** rest endpoints to fetch the data from the a DynamoDB. The data is collected using Arduino with sensores attached. The data is send to a **Mosquitto MQTT Broker**. The data is further bridged to **AWS IoT** which finally feeds the data into **DynamoDB**.

As basis for this page an existing boilerplate repository was used: https://github.com/mhaagens/react-mobx-react-router4-boilerplate