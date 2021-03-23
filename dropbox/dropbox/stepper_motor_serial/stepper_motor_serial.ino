#include <Stepper.h>      //Stepper motor lib
#include <SPI.h>          //serial lib

const int stepsPerRevolution = 2048;
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11);

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
String commandString = "";

void setup() {
  myStepper.setSpeed(15);
  Serial.begin(9600);
}

void loop() {
  if(stringComplete){
    getCommand();
    stringComplete = false;
    if (commandString.equals("FDOP"))
    {
      myStepper.step(stepsPerRevolution);
      Serial.println(F("OPENED"));
      delay(5000);
      myStepper.step(-stepsPerRevolution);
      Serial.println(F("CLOSED"));

    }
      if (commandString.equals("FDCL"))
    {
      myStepper.step(-stepsPerRevolution);
      Serial.println(F("CLOSED"));
    }

    inputString = "";
  }

}


//get message from csharp form
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}

//get 4 chars from serial message
void getCommand()
{
  if (inputString.length() > 0)
  {
    commandString = inputString.substring(1, 5);
  }
}
