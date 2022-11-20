#include "mqttHandler.h"
#include "wifiConnectionHandler.h"

const int PIN_push_button = 13; // the number of the pushbutton pin
const int PIN_led = 26;
const int PIN_LM35 = 36;

extern PubSubClient client;

int is_paired = 0;
int take_tempertaure = 0;
// void temperatureSensor_ISR()
// {
// }

void handlePushButton()
{
  static unsigned long last_interrupt_time = 0;
  unsigned long interrupt_time = millis();
  // If interrupts come faster than 1000ms, assume it's a bounce and ignore
  if (interrupt_time - last_interrupt_time > 1000)
  {
    if (is_paired == 1)
    {
      Serial.println("pushbutton ISR");
      digitalWrite(PIN_led, LOW);
      confirm();
    }
    last_interrupt_time = interrupt_time;
  }
}

void setup()
{
  // connect to the wifi with the credentials in eeprom
  // fall back to smartConfig upon faliure
  // connect to the wifi with the credentials in eeprom
  // fall back to smartConfig upon faliure
  connectWiFi();

  // connect with AWS IoT core with certificate based authentication
  client = connectAWS();
  // connect with AWS IoT core with certificate based authentication
  client = connectAWS();

  // temperature sensor trigger
  pinMode(PIN_LM35, INPUT);
  pinMode(PIN_push_button, INPUT);
  pinMode(PIN_led, OUTPUT);
}

void loop()
{
  // put your main code here, to run repeatedly:
  client.loop();
  // delay(520);
  if (digitalRead(PIN_push_button))
  {
    handlePushButton();
  }
}
