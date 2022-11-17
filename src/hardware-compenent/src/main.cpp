#include "mqttHandler.h"
#include "wifiConnectionHandler.h"
#include "temperatureSensorHandler.h"

const int temperatureSensorTriggerPin = 2; // the number of the pushbutton pin
const int PIN_push_button = 13;            // the number of the pushbutton pin
const int PIN_led = 26;

extern PubSubClient client;

int is_paired = 0;
void temperatureSensor_ISR()
{
  publishMessage(getTemperature());
}

void pushButton_ISR()
{
  if (is_paired == 1)
  {
    digitalWrite(PIN_led, LOW);
    confirm();
  }
}
void setup()
{
  // connect to the wifi with the credentials in eeprom
  // fall back to smartConfig upon faliure
  connectWiFi();

  // connect with AWS IoT core with certificate based authentication
  client = connectAWS();

  // temperature sensor trigger
  pinMode(temperatureSensorTriggerPin, INPUT);
  pinMode(PIN_push_button, INPUT);
  attachInterrupt(0, temperatureSensor_ISR, CHANGE);
  attachInterrupt(0, pushButton_ISR, CHANGE);
}

void loop()
{
  // put your main code here, to run repeatedly:
  client.loop();
}
