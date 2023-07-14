#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Arduino_JSON.h>
#include <SoftwareSerial.h>

const int Tx=14;
const int Rx=15;
const int sensorPin = A0;
// const char* ssid = "YeahScience!!";
// const char* password = "sunny123";

const char* ssid="HomiesConnectionHub";
const char* password="XxmunkExX";
String postTemp = "/temperature";

const char* serverAddress = "http://192.168.210.19:8080"; // Replace with your server address


//declare Global vars
WiFiClient client;
HTTPClient http;
SoftwareSerial arduinoMega( Rx,Tx);




void sendPostRequest(float value, String endpoint) {
  // Specify the server and endpoint
  http.begin(client, String(serverAddress) + endpoint);

  // Set the Content-Type header to application/json
  http.addHeader("Content-Type", "application/json");

  // Create the JSON payload
  JSONVar payload;
  payload["temp"] = value;

  // Serialize the JSON payload
  String jsonString = JSON.stringify(payload);

  // Send the POST request
  int httpResponseCode = http.POST(jsonString);

  // Check the response
  if (httpResponseCode > 0) {
    Serial.print("HTTP POST request sent successfully. Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("HTTP POST request failed. Error code: ");
    Serial.println(httpResponseCode);
  }

  // Close the connection
  http.end();
}

String httpGETRequest(const char* serverName) {
  // Your IP address with path or Domain name with URL path
  http.begin(client, serverName);

  // Send HTTP GET request
  int httpResponseCode = http.GET();

  String payload = "{}";

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}

void setup() {
  Serial.begin(115200);  // Initialize serial communication with PC at 115200 baud
  arduinoMega.begin(115200);

  delay(10);

  WiFi.begin(ssid, password);
  Serial.println();
  Serial.print("Connecting to Wi-Fi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Connected to Wi-Fi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (WiFi.status() == WL_CONNECTED) {
    // Specify the server and endpoint
    // String payload = httpGETRequest(serverAddress + postTemp);

    // // Send the GET request
    // Serial.println(payload);
    // JSONVar myObject = JSON.parse(payload);
    // Serial.println("JSON: ");
    // Serial.println(myObject);
  }
  while(!Serial);
  // Delay before sending the next request
  delay(5000);
}

void loop() { // run over and over
  if (arduinoMega.available()) {
    String receivedData = arduinoMega.readStringUntil('\n');
    receivedData.trim();
    float temperature = receivedData.toFloat();
    Serial.print("Received Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
  }else{
    Serial.println("Bruh");
  }
  delay(10000);
}

// void loop() {
//   // int sensorValue = analogRead(sensorPin);
//   // float temperature = sensorValue*0.48828125;

//   // String temperature = "/temperature";
//   // sendPostRequest(temperature, endpoint);
//   if (arduinoMega.available()) {
//     // Read temperature value from Arduino Mega
//     float temp = arduinoMega.parseFloat();

//     // Print received temperature value
//     Serial.print("Received Temperature: ");
//     Serial.print(temp);
//     Serial.println(" °C");
//   }
//   else{
//     Serial.print("Bruhh");
//   }
//   // Serial.println(temperature);
//   delay(100);
// }
