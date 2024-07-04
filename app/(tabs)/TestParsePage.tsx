import {
     StyleSheet,
     Text,
     View,
     TextInput,
     Button,
     Platform,
     ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";
import * as Sharing from "expo-sharing";
import { router } from "expo-router";
import { initDb, insertDataDbSingle } from "../DatabaseFunctions";

export default function TestParsePage() {
     const db = SQLite.openDatabaseSync("test.db");
     initDb();

     const [csv_string, setCsv_String] = useState();
     const [globalFileContent, SetGlobalFileContent] = useState();
     const [fileLocation, setFileLocation] = useState();
     const [docReqResult, setDocRequest] =
          useState<DocumentPicker.DocumentPickerResult>();
     const [databaseData, setDatabaseData] = useState<any>();

     const getAllData = async () => {
          const allData = db.getAllSync("select * from item");
          setDatabaseData(JSON.stringify(allData));
     };
     const exportDb = async () => {
          if (Platform.OS === "android") {
               const permissions =
                    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
               if (permissions.granted) {
                    await FileSystem.StorageAccessFramework.createFileAsync(
                         permissions.directoryUri,
                         "example.csv",
                         "text/csv"
                    )
                         .then(async (uri) => {
                              const allData =
                                   db.getAllSync(`SELECT * FROM item;`);
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
                    console.log("Permission not granted");
               }
          } else {
               await Sharing.shareAsync(
                    FileSystem.documentDirectory + "SQLite/exported.csv"
               );
          }
     };

     const getFile = async () => {
          try {
               const docRequest = await DocumentPicker.getDocumentAsync({
                    type: "text/comma-separated-values",
                    copyToCacheDirectory: true,
               });
               setDocRequest(docRequest);
               //  console.log(docRequest);
                // console.log(docRequest.output);
               //  console.log(docRequest.assets[0].uri);
               if (docRequest.assets[0].uri !== null) {
                    setFileLocation(docRequest.assets[0].uri);
                    // console.log("File Location: " + fileLocation);
                    const fileContent = await FileSystem.readAsStringAsync(
                         docRequest.assets[0].uri
                    );
                    // console.log("File Content: ",fileContent)
                    const parsedData = Papa.parse(fileContent, {
                         header: true,
                         transformHeader: (header: any) => header.trim(), // trim trailing spaces from header
                         skipEmptyLines: true,
                         complete: (results: any) => {
                              db.execAsync("DELETE FROM item;");
                              // console.log("Parsed Data: ", results);
                              SetGlobalFileContent(results.data);
                              // console.log(results.data.length);
                              for (let i = 0; i < results.data.length; i++) {
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
                              }
                              console.log("Completed import");
                         }, //Use  a for each to insert into the sqlite db
                         error: () => {
                              console.log("CSV Could not be read");
                         },
                    });
               } else {
                    console.log("File Picker Cancelled");
               }
          } catch (error) {
               console.log(error);
          }

     };
     return (
          <View>
               <Button
                    title="Import CSV"
                    onPress={() => {
                         getFile();
                         console.log("Import clicked");
                    }}
               ></Button>
               <Button
                    title="Export CSV"
                    onPress={() => {
                         exportDb();
                    }}
               />
               <Button
                    title="Open Database Test Page"
                    onPress={() => {
                         router.push("/testing/dbtestpage");
                    }}
               />
               <Button
                    title="Display Data in Server"
                    onPress={() => {
                         //  console.log("Clicked display data", databaseData);
                         getAllData();
                    }}
               ></Button>
               <ScrollView>
                    <Text>
                         Parsed JSON: {JSON.stringify(docReqResult?.assets)}
                    </Text>
                    <Text>
                         {databaseData && (
                              <>
                                   item table data:
                                   {databaseData}
                              </>
                         )}
                         {/* Parsed Data: {JSON.stringify(globalFileContent)} */}
                    </Text>
               </ScrollView>
          </View>
     );
}
