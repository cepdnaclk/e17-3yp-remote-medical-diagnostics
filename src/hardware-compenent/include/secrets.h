#include <pgmspace.h>

const char WIFI_SSID[] = "Eng-Student";
const char WIFI_PASSWORD[] = "3nG5tuDt";

const char *deviceUUID = "1234";

// MQTT Broker
const char *mqtt_broker = "52.184.165.84";
const char *mqtt_username = "co326a";
const char *mqtt_password = "safety";
const int mqtt_port = 1883;

// The MQTT topics that this device should publish/subscribe
const char *topic_confirm = "medgenie/1234/confirm";
const char *topic_pair = "medgenie/1234/pair";
const char *topic_temperature = "medgenie/1234/temperature";

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
)EOF";

// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----

)KEY";

// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----

)KEY";