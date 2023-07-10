#include <ESP8266WiFi.h>


char ssid[]="HomiesConnectionHub";
char pass[]="XxmunkExX";

const int trigger=16;
const int echo=5;
long T;
float distance;

WiFiClient client;



void setup() {
  // put your setup code here, to run once:
  Serial.begin(11520);
  pinMode(trigger,OUTPUT);
  pinMode(echo,INPUT);
  WiFi.mode(WIFI_STA);

}

void loop() {
  // put your main code here, to run repeatedly:
  if(WiFi.status()!=WL_CONNECTED){
    Serial.print("Connecting: ");
    Serial.println(ssid);
    while(WiFi.status()!=WL_CONNECTED){
      WiFi.begin(ssid,pass);
      Serial.print(".");
      delay(5000);
    }
    Serial.println("\nConnected");
  }
  digitalWrite(trigger,LOW);
  delay(1);
  digitalWrite(trigger,HIGH);

  delay(10);

  digitalWrite(trigger,LOW);
  T=pulseIn(echo,HIGH);
  distance=T*0.034;
  distance=distance/2;
  Serial.print("Distance: ");
  Serial.println(distance);
}
