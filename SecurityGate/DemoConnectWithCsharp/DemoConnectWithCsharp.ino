#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN    10  // Configurable, see typical pin layout above
#define RST_PIN   5   // Configurable, see typical pin layout above
int piezoPin = 7;   // Configurable, see typical pin layout above
int redLedPin = 3; // Configurable, see typical pin layout above

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
String commandString = "";

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

MFRC522::MIFARE_Key key;

// Init array that will store new NUID
byte nuidPICC[4];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  pinMode(redLedPin, OUTPUT);
  serialEvent();
  blindBeep(1);
}

// =========================================================================
void loop() {
  if (stringComplete)
  {
    stringComplete = false;
    getCommand();
    if (commandString.equals("CONX"))
    {
    }
    if (commandString.equals("DISC"))
    {
      turnLedOff(redLedPin);
    }
    if (commandString.equals("LEDR"))
    {
      boolean ledState = getLedState();
      if (ledState == true)
      {
        turnLedOn(redLedPin);
      } else
      {
        turnLedOff(redLedPin);
      }
    }
    if (commandString.equals("BLK3"))
    {
      blinkLED(3);
    }
    if (commandString.equals("ALRT")) {
      blindBeep(9);
    }
    if (commandString.equals("BEP1")) {
      beep(1);
    }
    if (commandString.equals("BEP2")) {
      beep(2);
    }

    inputString = "";
  }

  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if ( ! rfid.PICC_IsNewCardPresent()) {
    return;
  }
  // Verify if the NUID has been readed
  if ( ! rfid.PICC_ReadCardSerial()) {
//    return;
  }

//  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
//  Serial.println(rfid.PICC_GetTypeName(piccType));

  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
      piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
      piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    Serial.println(F("Your tag is not of type MIFARE Classic."));
    return;
  }

//  if (rfid.uid.uidByte[0] != nuidPICC[0] ||
//      rfid.uid.uidByte[1] != nuidPICC[1] ||
//      rfid.uid.uidByte[2] != nuidPICC[2] ||
//      rfid.uid.uidByte[3] != nuidPICC[3] ) {
//    Serial.println(F("A new card has been detected."));

    // Store NUID into nuidPICC array
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }


    //    Serial.println(F("The NUID tag is:"));
    //    Serial.println(F("In hex: "));
    //    printHex(rfid.uid.uidByte, rfid.uid.size);
    //    Serial.println();
    //    Serial.println(F("In dec: "));
    printDec(rfid.uid.uidByte, rfid.uid.size);
//  }
//  else Serial.println(F("Card read previously."));

  // Halt PICC
  rfid.PICC_HaltA();

  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();



}
// =========================================================================
/**
   Helper routine to dump a byte array as hex values to Serial.
*/
//void printHex(byte *buffer, byte bufferSize) {
//  for (byte i = 0; i < bufferSize; i++) {
//    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
//    Serial.print(buffer[i], HEX);
//  }
//}

/**
   Helper routine to dump a byte array as dec values to Serial.
*/
void printDec(byte *buffer, byte bufferSize) {
  String tmp = "";
  for (byte i = 0; i < bufferSize; i++) {
    //    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    //    Serial.print(buffer[i], DEC);
    tmp += buffer[i] < 0x10 ? "0" : "";
    tmp += buffer[i];
  }
  Serial.println(tmp + ";");
}
void turnLedOff(int pin)
{
  digitalWrite(pin, LOW);
}

void turnLedOn(int pin)
{
  digitalWrite(pin, HIGH);
}

void getCommand()
{
  if (inputString.length() > 0)
  {
    commandString = inputString.substring(1, 5);
  }
}

boolean getLedState()
{
  boolean state = false;
  if (inputString.substring(5, 7).equals("ON"))
  {
    state = true;
  } else
  {
    state = false;
  }
  return state;
}

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

void blindBeep(int n) {
  for (int i = 0; i < n; i++) {
    beep(1);
    blinkLED(1);
  }
}

void beep(int n) {
  for (int i = 0; i < n; i++)
  {
    tone(piezoPin, 1000, 500);
    delay(250);
  }
}

void blinkLED(int n) {
  for (int i = 0; i < n; i++)
  {
    digitalWrite(redLedPin, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(500);
    digitalWrite(redLedPin, LOW);
    delay(250);
  }

}
