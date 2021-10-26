#include "wifiConnectionHandler.cpp"
#include "mqttHandler.cpp"
#include "temperatureSensorHandler.cpp"

const int temperatureSensorTriggerPin = 2; // the number of the pushbutton pin

void setup()
{
  //connect to the wifi with the credentials in eeprom
  //fall back to smartConfig upon faliure
  connectWiFi();

  //connect with AWS IoT core with certificate based authentication
  connectAWS();

  //temperature sensor trigger
  pinMode(temperatureSensorTriggerPin, INPUT);
  attachInterrupt(0, temperatureSensor_ISR, CHANGE);
}

void loop()
{
  // put your main code here, to run repeatedly:
}

void temperatureSensor_ISR()
{
  publishMessage(getTemperature());
}