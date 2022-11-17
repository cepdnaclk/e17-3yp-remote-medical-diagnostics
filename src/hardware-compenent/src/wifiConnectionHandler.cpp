#include <EEPROM.h>
#include <WiFiClientSecure.h>

void connectWiFi()
{

    EEPROM.begin(512); // Initialasing EEPROM
    delay(10);
    Serial.begin(115200);

    // Read eeprom for ssid and password
    Serial.println("Reading stored ssid");

    String storedSsid;
    String storedPassword;

    for (int i = 0; i < 32 && EEPROM.read(i) != 0; ++i)
    {
        storedSsid += char(EEPROM.read(i));
    }
    Serial.print("SSID: ");
    Serial.println(storedSsid);
    Serial.println();
    Serial.println("Reading stored password");

    for (int i = 32; i < 96 && EEPROM.read(i) != 0; ++i)
    {
        storedPassword += char(EEPROM.read(i));
    }
    Serial.print("password: ");
    Serial.println(storedPassword);
    Serial.println("trying with the stored credentials");

    WiFi.begin(storedSsid.c_str(), storedPassword.c_str());
    for (int i = 0; i < 150 && WiFi.status() != WL_CONNECTED && storedSsid.length() != 0; i++)
    {
        delay(500);
        Serial.print(".");
    }

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("WiFi connected");
    }
    else
    {
        Serial.println("Failed to connect with the stored WiFi credentials!");

        // Init WiFi as Station, start SmartConfig
        WiFi.mode(WIFI_AP_STA);
        WiFi.beginSmartConfig();

        // Wait for SmartConfig packet from mobile
        Serial.println("Waiting for SmartConfig.");
        while (!WiFi.smartConfigDone())
        {
            delay(500);
            Serial.print(".");
        }

        Serial.println("");
        Serial.println("SmartConfig received.");

        String ssid = WiFi.SSID();
        Serial.print("SSID: ");
        Serial.println(ssid);

        String password = WiFi.psk();
        Serial.print("password: ");
        Serial.println(password);

        // storing in EEPROM
        Serial.println("writing ssid to eeprom:");
        for (int i = 0; i < ssid.length(); ++i)
        {
            EEPROM.write(i, ssid[i]);
            // Serial.print("Wrote: ");
            Serial.println(ssid[i]);
        }
        for (int i = ssid.length(); i < 32; i++)
        {
            EEPROM.write(i, 0);
        }

        Serial.println("writing eeprom pass:");
        for (int i = 0; i < password.length(); ++i)
        {
            EEPROM.write(32 + i, password[i]);
            // Serial.print("Wrote: ");
            Serial.println(password[i]);
        }
        for (int i = 32 + password.length(); i < 64; i++)
        {
            EEPROM.write(i, 0);
        }
        EEPROM.commit();

        // Wait for WiFi to connect to AP
        Serial.println("Waiting for WiFi");
        while (WiFi.status() != WL_CONNECTED)
        {
            delay(500);
            Serial.print(".");
        }

        Serial.println("WiFi Connected.");

        Serial.print("IP Address: ");
        Serial.println(WiFi.localIP());
    }
}