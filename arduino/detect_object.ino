#include <car_parking_inferencing.h>
#include <EEPROM.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
// 27_EdgeImpulse_FOMO.ino
#define MAX_RESOLUTION_VGA 1

/**
 * Run Edge Impulse FOMO model on the Esp32 camera
 */

// replace with the name of your library

#include "esp32cam.h"
#include "esp32cam/tinyml/edgeimpulse/FOMO.h"
#define EEPROM_SIZE 12
DynamicJsonDocument doc(2048);
using namespace Eloquent::Esp32cam;

Cam cam;
TinyML::EdgeImpulse::FOMO fomo;

String detectObject = "";
String readObject = "";
String serverName = "http://192.168.1.107:3000/transaction";
const char* ssid = "matoo_2.4G";
const char* password = "nickmatoo";

void setup() {
    Serial.begin(115200);
    delay(3000);
    Serial.println("Init");
    EEPROM.begin(EEPROM_SIZE);
    EEPROM.writeString(1,detectObject);

    setUpWifi();
    setUpCamera();
}

void loop() {
    if (!cam.capture()) {
        Serial.println(cam.getErrorMessage());
        delay(1000);
        return;
    }

    // run FOMO model
    if (!fomo.detectObjects(cam)) {
        Serial.println(fomo.getErrorMessage());
        delay(1000);
        return;
    }

    // print found bounding boxes
    if (fomo.hasObjects()) {
        Serial.printf("Found %d objects in %d millis\n", fomo.count(), fomo.getExecutionTimeInMillis());

        fomo.forEach([](size_t ix, ei_impulse_result_bounding_box_t bbox) {
            Serial.print(" > BBox of label ");
            Serial.print(bbox.label);
            detectObject = bbox.label;
            Serial.print(" at (");
            Serial.print(bbox.x);
            Serial.print(", ");
            Serial.print(bbox.y);
            Serial.print("), size ");
            Serial.print(bbox.width);
            Serial.print(" x ");
            Serial.print(bbox.height);
            Serial.println();
        });
   
    if(detectObject == EEPROM.readString(1)){
      Serial.print("Same");
      Serial.println();
    }else{
       Serial.print("Different");
       EEPROM.writeString(1,detectObject);
       EEPROM.commit();
       setPostRequest();
       
     }
  }
    else {
        Serial.println("No objects detected");
    }
}


void setPostRequest(){
   if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      http.addHeader("Content-Type", "application/json");
      doc["license_plate"] = detectObject;
      String json;
      serializeJson(doc, json);
      serializeJsonPretty(doc, Serial);
      int httpResponseCode = http.POST(json);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();
   }
}

void setUpWifi(){
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while(WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
    delay(1000);
}


void setUpCamera(){
    cam.aithinker();
    cam.highQuality();
    cam.highestSaturation();
    cam.vga();

    while (!cam.begin())
        Serial.println(cam.getErrorMessage());
}
