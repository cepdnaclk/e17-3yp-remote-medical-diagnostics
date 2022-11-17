#include "secrets.h"
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>

extern const int PIN_led = 26;

extern int is_paired;
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
        Serial.println("paired");
        digitalWrite(PIN_led, HIGH);
    }
}

void callback(char *topic, byte *payload, unsigned int length)
{
    char *message = new char[length];

    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
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
    Serial.print("subscribed to topic :");
    Serial.println(topic_pair);
    client.publish(topic_pair, "im in");

    return client;
}

void publishMessage(float temperature)
{
    StaticJsonDocument<200> doc;
    doc["time"] = millis();
    doc["temperature"] = temperature;
    doc["id"] = deviceUUID;
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    client.publish(topic_temperature, jsonBuffer);
}

void confirm()
{
    DynamicJsonDocument doc(1024);
    doc["state"] = 1;
    char buffer[256];
    serializeJson(doc, buffer);

    // Publish an MQTT message on topic esp32/OutputControl
    uint16_t packetIdPub1 = client.publish(topic_confirm, buffer);
    Serial.printf("Publishing on topic %s at QoS 1, packetId: %i", topic_confirm, packetIdPub1);
}