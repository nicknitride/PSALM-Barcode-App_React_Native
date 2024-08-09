import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
     ScrollView,
} from "react-native";
import Button from "../styled-components/Button";
import * as dbFunc from "../DatabaseFunctions";
import ItemEditOnly from "../styled-components/ItemEditOnly";

export default function App() {
     const db = dbFunc.startDb();
     useEffect(() => {
          dbFunc.initDb();
     }, []);

     const [facing, setFacing] = useState("back");
     const [permission, requestPermission] = useCameraPermissions();
     const [QRValue, setQRValue] = useState("");
     const [recentItemExists, setRecentItemExists] = useState<any>(false);
     const [container, setContainer] = useState();
     const itemList = (result: any) => {
          const out = db.getAllSync(
               `SELECT * FROM item WHERE New_Property_Number = "${result}";`
          );
          // console.log("itemList Output: "+JSON.stringify(out))
          return out;
     };

     const itemListLength = (result: any) => {
          const out = db.getAllSync(
               `SELECT * FROM item WHERE New_Property_Number = "${result}" UNION 
               SELECT * FROM recent_items WHERE New_Property_Number = "${result}";`
          );
          return out.length;
     };

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
                                             // console.log("--- Result ---  ", result);
                                             setQRValue(`${result.raw}`);
                                             setContainer(itemList(result.raw));
                                             // console.log(
                                             //      "---  RESULT.RAW  ---",
                                             //      result.raw
                                             // );
                                             // const itemList = db.getFirstSync(`SELECT * FROM item WHERE New_Property_Number = "${result.raw}";`);
                                             // {container.map((item) => (
                                             //      <>
                                             //      {console.log("Map function item --- ", item)}
                                             //      <] items={item} key={item.New_Property_Number} />
                                             //      </>
                                             // ))}
                                             const recentItem = db.getFirstSync(
                                                  `SELECT * FROM recent_items WHERE New_Property_Number = "${result.raw}";`
                                             );
                                             if (recentItem === null) {
                                                  setRecentItemExists(false);
                                             } else {
                                                  setRecentItemExists(true);
                                             }
                                             // console.log(
                                             //      "Recent Item Exists: ",
                                             //      recentItemExists,
                                             //      recentItem
                                             // );
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
                              {itemListLength(QRValue) == 0 && (
                                   <View>
                                        <View style={styles.card}>
                                             <Text style={styles.cardTextBody}>
                                                  Scanned Item is NOT PRESENT in
                                                  the imported CSV file.
                                                  Manually create new entry?
                                             </Text>
                                        </View>
                                        <Button
                                             title="Scan Another Instead"
                                             onPress={() => {
                                                  setQRValue("");
                                             }}
                                        ></Button>
                                        <Button
                                             title="Add New Scanned Item"
                                             onPress={() => {
                                                  router.push({
                                                       pathname: `itemview/create`,
                                                       params: {
                                                            id: `${QRValue}`,
                                                       },
                                                  });
                                             }}
                                        ></Button>
                                   </View>
                              )}
                              {itemListLength(QRValue) >= 1 && (
                                   <>
                                        <ScrollView>
                                             <Text
                                                  style={{
                                                       margin: 5,
                                                       fontSize: 20,
                                                       fontWeight: "bold",
                                                       backgroundColor: "black",
                                                       color: "white",
                                                       marginBottom: 15,
                                                       borderRadius: 20,
                                                       padding: 20,
                                                       marginRight: 15,
                                                  }}
                                             >
                                                  Detected Item no.: {QRValue}
                                             </Text>
                                             {container.map((item) => (
                                                  <>
                                                       {/* {console.log(
                                                            "\n \n \n \n \nItem Description Inside Multi Item Container"+item.Description
                                                       )} */}
                                                       <ItemEditOnly
                                                            items={item}
                                                            key={`${item.New_Property_Number}${item.Description}`}
                                                       />
                                                  </>
                                             ))}
                                        </ScrollView>
                                        <Button
                                             title="Scan Another Instead"
                                             onPress={() => {
                                                  setQRValue("");
                                             }}
                                        ></Button>
                                   </>
                              )}

                              {/* {itemListLength(QRValue) === 1 && (
                                   <View>
                                        <View style={{ flexDirection: "row" }}>
                                             <Button
                                                  title="Edit Detected Item"
                                                  onPress={() => {
                                                       // console.log(
                                                       //      "Submit clicked for: " +
                                                       //           QRValue
                                                       // );
                                                       if (recentItemExists) {
                                                            router.push(
                                                                 `/itemview/recent/${QRValue}`
                                                            );
                                                       } else {
                                                            // console.log(`/itemview/${QRValue}`)
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
                                                  }}
                                             ></Button>
                                        </View>
                                   </View>
                              )} */}
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
     card: {
          backgroundColor: "black",
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 20,
          marginVertical: 10,
     },
     cardTextBody: {
          color: "white",
          fontSize: 19,
          paddingBottom: 10,
     },
});
