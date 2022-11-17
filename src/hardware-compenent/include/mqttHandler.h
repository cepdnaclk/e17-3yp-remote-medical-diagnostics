#include <PubSubClient.h>
#include <ArduinoJson.h>

int parse(char *message);
void controller(char *topic, char *message);
void callback(char *topic, byte *payload, unsigned int length);
PubSubClient connectAWS();
void publishMessage(float temperature);
void confirm();