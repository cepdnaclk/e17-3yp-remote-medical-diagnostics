#include "secrets.h"
#include "temperatureSensorHandler.h"
#include "mqttHandler.h"
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>

extern const int PIN_led = 26;

extern int is_paired;
extern int take_tempertaure;
WiFiClient net;
PubSubClient client(net);

int parse(char *message)
{
    Serial.println("parser started");
    StaticJsonDocument<200> doc;
    // Deserialize the JSON document
    DeserializationError error = deserializeJson(doc, message);
    Serial.println("deserialized");

    // Test if parsing succeeds.
    if (error)
    {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return 0;
    }

    Serial.println("acessing state");
    const int state = doc["state"];
    Serial.println(state);
    Serial.println("state accessed");
    return state;
}

void controller(char *topic, char *message)
{
    if (strcmp(topic, topic_pair) == 0)
    {
        is_paired = parse(message);
        Serial.print("paired:");
        Serial.println(is_paired);
        digitalWrite(PIN_led, HIGH);
    }
    if (strcmp(topic, topic_get_temp) == 0)
    {
        take_tempertaure = parse(message);
        Serial.print("take temperature:");
        Serial.println(take_tempertaure);
        publishMessage(getTemperature());
    }
}

void callback(char *topic, byte *payload, unsigned int length)
{
    char *message = new char[length];

    Serial.print("Message arrived in topic: ");
    Serial.println(F(topic));
    Serial.print("Message:");

    for (int i = 0; i < length; i++)
    {
        message[i] = (char)payload[i];
    }

    Serial.println(message);
    Serial.println();
    Serial.println("-----------------------");

    controller(topic, message);
}

PubSubClient connectAWS()
{
    // connecting to an mqtt broker
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    while (!client.connected())
    {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the mqtt broker\n", client_id.c_str());

        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password))
        {
            Serial.println("mqtt broker connected");
        }
        else
        {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }
    client.subscribe(topic_pair);
    client.subscribe(topic_get_temp);
    Serial.print("subscribed to topic :");
    Serial.println(F(topic_pair));

    return client;
}

void publishMessage(float temperature)
{
    StaticJsonDocument<200> doc;
    doc["temperature"] = temperature;
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    client.publish(topic_temperature, jsonBuffer);
}

void confirm()
{
    StaticJsonDocument<200> doc;
    doc["state"] = 1;
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    client.publish(topic_confirm, jsonBuffer);
}