//for arduino board

#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM math
#include <PulseSensorPlayground.h>
#include <SoftwareSerial.h>

const int Tx=14;
const int Rx=15;

const int tempPin=A1;

const int pulsePin = 0;       // 'S' Signal pin connected to A0
const int LED13 = 13;          // The on-board Arduino LED
int Threshold = 550;      // Pulse sensor connected to analog pin A0


//Global vars
const int sampleWindow = 2000;  // Sample window duration in milliseconds
int pulseRate = 0; 
SoftwareSerial nodeMCU(Rx,Tx);
PulseSensorPlayground pulseSensor;


// const int LED13 = 13;          // The on-board Arduino LED
// int Threshold = 550; 

//functions here

float calculateTemperature() {
  // Read the raw value from LM35
  float temp = analogRead(tempPin);

  // Convert the raw value to voltage
  temp = temp * 0.48828125;

  return temp;
}

int calculatePulseRate() {
  int pulseCount = 0;  // Variable to count the number of pulses
  int lastPulseTime = 0;  // Variable to store the time of the last pulse
  int averagePulseRate = 0;  // Variable to store the average pulse rate

  // Initialize the pulse sensor pin
  pinMode(pulsePin, INPUT);

  // Read the pulse rate for the specified sample window duration
  for (int i = 0; i < sampleWindow; i++) {
    int sensorValue = analogRead(pulsePin);  // Read the sensor value

    // Check if a pulse is detected
    if (sensorValue > 500) {
      // Check if it's been enough time since the last pulse
      if (i - lastPulseTime > 200) {
        pulseCount++;  // Increment the pulse count
        lastPulseTime = i;  // Update the last pulse time
      }
    }
  }

  // Calculate the pulse rate in beats per minute (BPM)
  pulseRate = pulseCount * (60000 / sampleWindow);

  return pulseRate;
}


void setup() {
  // Start serial communication with the PC
  Serial.begin(115200);
  
  // Start software serial communication with NodeMCU
  nodeMCU.begin(115200);
  pulseSensor.analogInput(pulsePin);   
	pulseSensor.blinkOnPulse(LED13);       // Blink on-board LED with heartbeat
	pulseSensor.setThreshold(Threshold);   

	// Double-check the "pulseSensor" object was created and began seeing a signal
	if (pulseSensor.begin()) {
		Serial.println("PulseSensor object created!");
	}
  // Wait for serial ports to initialize
  delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  float temp=calculateTemperature();
  String tempString = String(temp);
  
  

  // Print the temperature value to the Serial Monitor
  int myBPM = pulseSensor.getBeatsPerMinute();      // Calculates BPM
  Serial.println("Enter your name: ");
  String name=
  String pulseStr=String(myBPM);
  // Send temperature string to NodeMCU
  
	// if (pulseSensor.sawStartOfBeat()) {               // Constantly test to see if a beat happened
		// Serial.println("♥  A HeartBeat Happened ! "); // If true, print a message
		// Serial.print("BPM: ");
    myBPM=(myBPM+8)/3;
		// Serial.println(myBPM); 
    nodeMCU.println(myBPM);                       // Print the BPM value
  // }



	delay(20);
  delay(1000);
}
