import {
     StyleSheet,
     Text,
     View,
     TextInput,
     Platform,
     ScrollView,
     Modal,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";
import { router } from "expo-router";
import { initDb, insertDataDbSingle } from "../DatabaseFunctions";
import Button from "../styled-components/FullWidthButton";
import ImportCSVButton from "../styled-components/ImportCSVButton";

export default function TestParsePage() {
     const db = SQLite.openDatabaseSync("test.db");
     initDb();
     const [modalIsVisible, setModalIsVisible] = useState(false);
     const [userFilenameString, setUserFileNameString] = useState("");
     const fileExportFunction = async (stringName: string) => {
          console.log("String Name for Export: " + stringName);
          let outputString: string;
          if (
               stringName === null ||
               stringName === undefined ||
               stringName === ""
          ) {
               outputString = "Exported";
          } else {
               outputString = stringName;
          }
          console.log(outputString);
          const permissions =
               await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          const dateObject = new Date().toUTCString();
          if (permissions.granted) {
               await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    `${outputString}_${dateObject}.csv`,
                    "text/csv"
               )
                    .then(async (uri) => {
                         const allData = db.getAllSync(
                              `SELECT * FROM recent_items;`
                         );
                         let processedCsv = Papa.unparse(allData);
                         await FileSystem.writeAsStringAsync(
                              uri,
                              processedCsv,
                              {
                                   encoding: FileSystem.EncodingType.UTF8,
                              }
                         );
                         console.log(
                              "Finished Execution",
                              "CSV String: " + processedCsv
                         );
                    })
                    .catch((e) => console.log(e));
          } else {
               console.log("File creation failed");
          }
     };

     const getFile = async () => {
          try {
               const docRequest = await DocumentPicker.getDocumentAsync({
                    type: "text/comma-separated-values",
                    copyToCacheDirectory: true,
               });
               if (docRequest.assets[0].uri !== null) {
                    const fileContent = await FileSystem.readAsStringAsync(
                         docRequest.assets[0].uri
                    );
                    const parsedData = Papa.parse(fileContent, {
                         header: true,
                         escapeChar: "\\",
                         transformHeader: (header: any) => header.trim(), // trim trailing spaces from header
                         skipEmptyLines: true,
                         complete: (results: any) => {
                              db.execAsync(
                                   "DELETE FROM item; DELETE from recent_items"
                              );
                              console.log("Parsed Data: ", results);
                              console.log(
                                   "I'M THE LENGTH: ",
                                   results.data.length
                              );
                              for (let i = 0; i < results.data.length; i++) {
                                   console.log("Beginning data insertion");
                                   insertDataDbSingle(
                                        results.data[i].Article_Item,
                                        results.data[i].Description,
                                        results.data[i].Old_Property_Number,
                                        results.data[i].New_Property_Number,
                                        results.data[i].Unit_of_Measure,
                                        results.data[i].Unit_Value,
                                        results.data[i]
                                             .Quantity_per_Property_Card,
                                        results.data[i]
                                             .Quantity_per_Physical_Count,
                                        results.data[i].Location_Whereabouts,
                                        results.data[i].Condition,
                                        results.data[i].Remarks
                                   );
                                   console.log(
                                        "Importing entry number: " + String(i)
                                   );
                              }
                              console.log("Completed import");
                         }, //Use  a for each to insert into the sqlite db
                         error: () => {
                              console.log("CSV Could not be read");
                         },
                    });
                    console.log("Redirecting to csv preview");
                    router.push("/itemview/csv_view");
               } else {
                    console.log("File Picker Cancelled");
               }
          } catch (error) {
               console.log(error);
          }
     };
     if (!modalIsVisible) {
          return (
               <View style={{ flex: 1 ,justifyContent:"center",alignItems:"center"}}>
                    <View style={{width:"80%"}}>
                    <ImportCSVButton
                         Toptitle={`Import CSV`}
                         Bottomtitle={`(CLEARS RECENTLY SCANNED ITEMS)`}
                         onPress={() => {
                              getFile();
                              console.log("Import clicked");
                         }}
                    >
                    </ImportCSVButton>
                    <Button
                         title="Export CSV"
                         onPress={() => {
                              setModalIsVisible(true);
                         }}
                    />
                    <Button
                         title="Display Data in Server"
                         onPress={() => {
                              router.push("/itemview/csv_view");
                         }}
                    ></Button>
                    </View>
                    
               </View>
          );
     } else {
          return (
               <>
                    <View
                         style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                         }}
                    >
                         <View style={styles.dialogCard}>
                              <Text style={styles.dialogText}>
                                   Enter a Filename:
                              </Text>
                              <TextInput
                                   style={styles.dialogTextInput}
                                   textAlignVertical="top"
                                   value={userFilenameString}
                                   onChangeText={(val) => {
                                        setUserFileNameString(val);
                                   }}
                              />
                         </View>
                         <View style={{width:"70%",paddingTop:10}}>
                              <Button
                                   title="Choose File Save Location"
                                   onPress={() => {
                                        fileExportFunction(userFilenameString);
                                        setModalIsVisible(false);
                                   }}
                              ></Button>
                              <Button title="Cancel Export" onPress={()=>{
                                   setModalIsVisible(false)
                              }}/>
                         </View>
                    </View>
               </>
          );
     }
}

const styles = StyleSheet.create({
     dialogCard: {
          backgroundColor: "black",
          width: "70%",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
     },
     dialogText: {
          color: "white",
          margin: 5,
     },
     dialogTextInput: {
          borderWidth: 1,
          borderColor: "black",
          padding: 4,
          margin: 5,
          backgroundColor: "white",
          width: "70%",
          borderRadius: 20,
          paddingVertical: 5,
          paddingHorizontal: 3,
          marginVertical: 5,
     },
});
