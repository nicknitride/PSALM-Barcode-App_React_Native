import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../styled-components/Button";
import * as dbFunc from "../DatabaseFunctions";

export default function App() {
     const [facing, setFacing] = useState("back");
     const [permission, requestPermission] = useCameraPermissions();
     const [detectedQR, setDetectedQR] = useState(false);
     const [QRValue, setQRValue] = useState("");
     const [recentItemExists, setRecentItemExists] = useState<any>();
     const db = dbFunc.startDb();
     useEffect(() => {
          dbFunc.initDb();
     }, []);

     if (!permission) {
          // Camera permissions are still loading.
          return <View />;
     }
     if (!permission.granted) {
          // Camera permissions are not granted yet.
          return (
               <View style={styles.container}>
                    <Text style={{ textAlign: "center" }}>
                         We need your permission to show the camera
                    </Text>
                    <Button
                         onPress={requestPermission}
                         title="Grant Camera Permissions"
                    />
               </View>
          );
     }

     function toggleCameraFacing() {
          setFacing((current) => (current === "back" ? "front" : "back"));
     }

     return (
          <View style={styles.container}>
               {!QRValue && (
                    <>
                         <View style={styles.innerContainer}>
                              <CameraView
                                   style={styles.camera}
                                   facing={facing}
                                   barcodeScannerSettings={{
                                        barcodeTypes: [
                                             "qr",
                                             "upc_a",
                                             "code128",
                                             "codabar",
                                             "itf14",
                                             "code93",
                                             "code39",
                                             "datamatrix",
                                             "upc_e",
                                             "pdf417",
                                             "ean8",
                                             "ean13",
                                             "aztec",
                                        ],
                                   }}
                                   onBarcodeScanned={(result) => {
                                        if (QRValue === "") {
                                             console.log(result);
                                             setDetectedQR(true);
                                             setQRValue(`${result.raw}`);
                                             const recentItem = db.getFirstSync(`SELECT * FROM recent_items WHERE New_Property_Number = "${result.raw}";`);
                                             if(recentItem===null){
                                                  setRecentItemExists(false)
                                             }
                                             else{
                                                  setRecentItemExists(true)
                                             }
                                             console.log("Recent Item Exists: ",recentItemExists,recentItem)
                                        }
                                   }}
                              >
                                   <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                             style={styles.button}
                                             onPress={toggleCameraFacing}
                                        >
                                             <Text style={styles.buttontext}>
                                                  Flip Camera
                                             </Text>
                                        </TouchableOpacity>
                                   </View>
                              </CameraView>
                         </View>
                    </>
               )}

               {QRValue && (
                    <>
                         <View style={{ margin: 20 }}>
                              <Text
                                   style={{
                                        margin: 5,
                                        fontSize: 20,
                                        fontWeight: "bold",
                                   }}
                              >
                                   Detected Item no.: {QRValue}
                              </Text>
                              <View style={{ flexDirection: "row" }}>
                                   <Button
                                        title="Edit Detected Item"
                                        onPress={() => {
                                             console.log(
                                                  "Submit clicked for: " +
                                                       QRValue
                                             );
                                             /* 
                                             if (recent_item){
                                             router.push(`/itemview/${QRValue}`)
                                             }
                                             else{
                                             router.push(`/itemview/recent_${QRValue}`)
                                             }
                                        
                                             */
                                            if(recentItemExists){
                                             router.push(`/itemview/recent/${QRValue}`)
                                            }
                                            else{
                                             router.push(
                                                  `/itemview/${QRValue}`
                                             );
                                            }
                                            
                                        }}
                                   ></Button>
                                   <Button
                                        title="Scan Another Instead"
                                        onPress={() => {
                                             setQRValue("");
                                             setDetectedQR(false);
                                        }}
                                   ></Button>
                              </View>
                         </View>
                    </>
               )}
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     camera: {
          flex: 1,
     },
     buttonContainer: {
          flex: 1,
          flexDirection: "row",
          backgroundColor: "transparent",
          margin: 64,
     },
     button: {
          flex: 1,
          alignSelf: "flex-end",
          alignItems: "center",
          backgroundColor: "black",
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 10,
     },
     buttontext: {
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
     },
     innerContainer: {
          height: "80%",
          width: "80%",
     },
});
