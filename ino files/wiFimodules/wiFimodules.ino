#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <Arduino_JSON.h>

// const char* ssid = "HomiesConnectionHub";
// const char* password = "XxmunkExX";
const char* ssid="YeahScience!!";
const char* password="sunny123";
const char* serverAddress = "http://192.168.143.19:8080/"; // Replace with your server address

String httpGETRequest(const char* serverName) {
  WiFiClient client;
  HTTPClient http;
    
  // Your IP address with path or Domain name with URL path 
  http.begin(client, serverName);
  
  // If you need Node-RED/server authentication, insert user and password below
  //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
  
  // Send HTTP POST request
  int httpResponseCode = http.GET();
  
  String payload = "{}"; 
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}

void setup() {
  Serial.begin(115200);
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
    WiFiClient client;
    HTTPClient http;

    // Specify the server and endpoint
    String payload = httpGETRequest(serverAddress);

    // Send the GET request
    Serial.println(payload);
    JSONVar myObject = JSON.parse(payload);
    Serial.println("JSON: ");
    Serial.println(myObject);
    // Close the connection
    // http.end();
  }

  // Delay before sending the next request
  delay(5000);
}

void loop() {
  
}
