import React from 'react'
import ConnectDiagram from './assert/proj_1/Connection_diagram.png'
import img1 from './assert/proj_1/1.jpg'
import img2 from './assert/proj_1/2.jpg'
import img3 from './assert/proj_1/3.jpg'
import img4 from './assert/proj_1/4.jpg'
import img5 from './assert/proj_1/5.jpg'
import img6 from './assert/proj_1/6.jpg'
import img7 from './assert/proj_1/7.jpg'
import img8 from './assert/proj_1/8.jpg'
import img9 from './assert/proj_1/9.jpg'
import img10 from './assert/proj_1/10.jpg'
import img11 from './assert/proj_1/11.jpg'

const Gzxp24001 = () => {
    const codeString = `
        /*
        Download the App:
        Configure the App refer the Tutorial Video
        Download this code to ESP32
        send the data to the ESP32 to change the color.
        */
        #include "BluetoothSerial.h"
        #include "ESP32_WS2812_Lib.h"
        #define LEDS_COUNT 1                //Number of LED in the LED pixel
        #define LEDS_PIN   2                //Connect ws2812 DI pin to the esp32 D2 pin.
        #define CHANNEL    0


        ESP32_WS2812 strip = ESP32_WS2812(LEDS_COUNT, LEDS_PIN, CHANNEL, TYPE_GRB);   //name the module as strip and configure it.
        const int color[5][3]={           //define the color code.
        {255,0,0},      // red
        {0,0,255},      // blue
        {0,255,0},      // green
        {255,255,255},  //white
        {0,0,0}         //off
        };
        BluetoothSerial SerialBT;   //name the bluetooth serial communication.


        void setup() {
        Serial.begin(115200);   //define baud rate for communication
        strip.begin();          
        strip.setBrightness(30);
        SerialBT.begin("Genzonix"); // Bluetooth device name
        Serial.println("The device started in client mode, make sure your server is running.");
        connectToServer();
        }


        void loop() {
        if (SerialBT.connected()) {
            if (SerialBT.available()) {
            String commandBT = SerialBT.readStringUntil('.');    // make a command end with '.'
            processCommand(commandBT);    //Led control function call
            }
        }
        }


        void connectToServer() {          //Bluetooth connection function
        Serial.print("Connecting to server... ");
        while (!SerialBT.connected(5000)) {
            Serial.print(".");
            delay(1000);
        }
        Serial.println("Connected!");
        }


        void processCommand(String command) {   //command through change LED color function.
        if (command == "red") {
            Serial.println("It's red color");
            strip.setLedColorData(0, color[0][0], color[0][1], color[0][2]);
            strip.show();
        } else if (command == "blue") {
            Serial.println("It's blue color");
            strip.setLedColorData(0, color[1][0], color[1][1], color[1][2]);
            strip.show();
        } else if (command == "green") {
            Serial.println("It's green colour");
            strip.setLedColorData(0, color[2][0], color[2][1], color[2][2]);
            strip.show();
        } else if (command == "white") {
            Serial.println("It's white colour");
            strip.setLedColorData(0, color[3][0], color[3][1], color[3][2]);
            strip.show();
        } else if (command == "off") {
            Serial.println("LED OFF");
            strip.setLedColorData(0, color[4][0], color[4][1], color[4][2]);
            strip.show();
        }
        }`;

  return (
    <>
     <div className="container">
        <h1>CHANGE LED COLOR AND ON/OFF LED THROUGH BLUETOOTH</h1>
        <h2>Overview:</h2>
            <p>This project allows you to control a WS2812 RGB LED strip using Bluetooth via an ESP32 microcontroller. You can change the LED colors and toggle the LEDs on or off using the Serial Bluetooth Terminal app on your smartphone.</p>
        <h2>Requirements:</h2>
            <ul>
                <li>ESP32 Microcontroller</li>
                <li>WS2812 LED Strip</li>
                <li>Arduino IDE</li>
                <li>Jumper Wires</li>
                <li>Power Supply Board</li>
                <li>Adapter</li>
            </ul>
        <h2>Hardware Setup:</h2>
            <h3>Connection procedure:</h3>
                <h4>ESP32 to WS2812:</h4>
                    <ul>
                        <li>Connect the data input of the WS2812 to a digital pin on the ESP32 (e.g., GPIO D2).</li>
                        <li>Connect the ground (GND) of the WS2812 to the GND of the ESP32.</li>
                        <li>Connect the power (5V) of the WS2812 to an appropriate power source.</li>
                    </ul>
                <h4>Power:</h4>
                    <ul>
                        <li>Make sure to use a suitable power supply for the WS2812, as it can draw significant current depending on the number of LEDs.</li>
                    </ul>
            <h3>Connection setup:</h3>
                    <img src={ConnectDiagram} 
                    className="img-fluid " 
                    alt="Connection_diagram"  
                    title="Connection_diagram" 
                    style={
                        {
                            maxHeight:"400px"
                        }
                    } />
        <h2>Software Setup:</h2>
            <h3>Arduino IDE:</h3>
                <ul>
                    <li>Install the ESP32 board package.</li>
                    <li>Install the ESP32_WS2812_Lib.h library for controlling WS2812 LEDs.</li>
                </ul>
            <h3>Bluetooth Communication:</h3>
                <ul>
                    <li>Use the built-in Bluetooth capabilities of the ESP32 to set up a serial communication.</li>
                    <li>Write code to listen for commands from the Serial Bluetooth Terminal app.</li>
                </ul>
            <h3>Commands:</h3>
                <ul>
                    <li>Define commands to change colors and toggle ON/OFF.</li>
                </ul>
            <h3>Code Implementation:</h3>
            
            <pre>{codeString}</pre>
            
            <h3>App setup:</h3>
                <div>                
                    <img 
                        src={img1}
                        alt="App_install_image" 
                        className="img-fluid rounded" 
                        style={
                            {
                                maxHeight:"250px"
                            }
                        }
                    />
                
                </div>
                <h4>Bluetooth connection:</h4>
                    <ul>
                        <li>Ensure that the device is connected to Bluetooth before proceeding.</li>
                    </ul>
                    <div className="row-1">   
                        <img 
                            src={img2} 
                            alt="App_interface" 
                            className="img-fluid rounded" 
                            style={{
                                maxHeight:"400px"
                            }}/>
                    </div>
                <h4>Launch the Serial Bluetooth Terminal App:</h4>
                    <ul>
                        <li>Open the Serial Bluetooth Terminal App on your device to interact with the system.</li>
                    </ul>
                <h4>Access Customization Page:</h4>
                    <ul>
                        <li>Hold down the M1 button to open the customization page.</li>
                    </ul>
                <h4>Button Customization:</h4>
                    <div className="row-1 text-center">
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-2 me-2" src={img3} alt="OFF_setup" />
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-2 me-2" src={img4}  alt="ON_setup" />
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-2 me-2" src={img5}  alt="RED_setup" />
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-2 me-2" src={img6}  alt="GREEN" />
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-2 me-2" src={img7}  alt="BLUE_setup" />
                    </div>
                    <p>Customize the buttons for LED control:</p>
                    <ul>
                        <li>M1: Set to OFF</li>
                        <li>M2: Set to ON.</li>
                        <li>M3: Set to RED.</li>
                        <li>M4: Set to GREEN.</li>
                        <li>M5: Set to BLUE.</li>
                    </ul>
                <h4>Connect to the Bluetooth Device:</h4>
                    <div className="row-1 text-center">
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-3 me-2" src={img8}  alt="Terminal_setup" />
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-3 me-2" src={img9}  alt="Selection_Bluetooth" />
                    </div>
                    <ul>
                        <li>Tap the ≡ icon at the top left corner of the app screen.</li>
                        <li>Select Devices from the menu.</li>
                        <li>Choose your Bluetooth device from the list and connect.</li>
                    </ul>
                <h4>Control the LED:</h4>
                    <ul>
                        <li>Use the customized commands to control the LED based on the button settings configured in Step 4. </li>
                    </ul>
                    <div className="row-1 text-center">
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-3 me-2" src={img10}  alt="Bluetooth_connected" />
                        <img className="img-fluid rounded col-8 col-sm-7 col-lg-4 col-md-3 col-xl-3 me-2" src={img11}  alt="test_image" />
                    </div>
        <h2>Testing:</h2>
            <ul>
                <li>Upload the code to the ESP32 using the Arduino IDE.</li>
                <li>Pair your smartphone with the ESP32 using Bluetooth.</li>
                <li>Open the Serial Bluetooth Terminal app, connect to the ESP32, and start sending commands to control the LED strip.</li>
            </ul>
        <h2>Conclusion:</h2>    
            <p>This project is a great introduction to using Bluetooth with the ESP32 and controlling RGB LEDs. You can expand the functionality by adding more features like preset colors or brightness control. Enjoy your LED lighting control!</p>
    </div> 
    </>
  )
}

export default Gzxp24001;