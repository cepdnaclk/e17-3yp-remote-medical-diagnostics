#include "Arduino.h"

#define ADC_VREF_mV 3300.0 // in millivolt
#define ADC_RESOLUTION 4096.0
#define PIN_LM35 A0

float getTemperature()
{
    // get the ADC value from the temperature sensor
    int adcVal = analogRead(PIN_LM35);
    // convert the ADC value to voltage in millivolt
    float milliVolt = adcVal * (ADC_VREF_mV / ADC_RESOLUTION);
    // convert the voltage to the temperature
    float tempC = milliVolt / 10;

    // print the temperature in the Serial Monitor:
    Serial.print("Temperature: ");
    Serial.print(tempC); // print the temperature
    Serial.print("°C");

    return tempC;
}