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

export default function TestParsePage() {
     const db = SQLite.openDatabaseSync("test.db");
     const initDb = () => {
          console.log(db);
          db.execSync(`
    CREATE TABLE IF NOT EXISTS item (Article_Item TEXT,
    Description TEXT,
    Old_Property_Number INTEGER,
    New_Property_Number INTEGER PRIMARY KEY,
    Unit_of_Measure TEXT,
    Unit_Value TEXT,
    Quantity_per_Property_Card TEXT,
    Quantity_per_Physical_Count INTEGER,
    Location_Whereabouts TEXT,
    Condition TEXT,
    Remarks TEXT
    );
   `);
     };
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
     const insertDataDbSingle = (
          articleItem: any,
          Desc: any,
          Old_Prop_Num: number,
          New_Prop_Num: number,
          Unit_of_Measure: string,
          Unit_Value: string,
          Quantity_per_Property_Card: string,
          Quantity_per_Physical_Count: number,
          Location_Whereabouts: string,
          Condition: string,
          Remarks: string
     ) => {
          db.execSync(`INSERT INTO item (
                    Article_Item,
                    Description,
                    Old_Property_Number,
                    New_Property_Number,
                    Unit_of_Measure,
                    Unit_Value,
                    Quantity_per_Property_Card,
                    Quantity_per_Physical_Count,
                    Location_Whereabouts,
                    Condition,
                    Remarks
                )
                VALUES (
                    "${articleItem}",
                    "${Desc}",
                    ${Old_Prop_Num},
                    ${New_Prop_Num},
                    "${Unit_of_Measure}",
                    "${Unit_Value}",
                    "${Quantity_per_Property_Card}",
                    "${Quantity_per_Physical_Count}",
                    "${Location_Whereabouts}",
                    "${Condition}",
                    "${Remarks}"
                );`);
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
                          const allData = db.getAllSync(`SELECT * FROM item;`);
                          let processedCsv = Papa.unparse(allData)
                              await FileSystem.writeAsStringAsync(
                                   uri,
                                   processedCsv,
                                   {
                                    encoding: FileSystem.EncodingType.UTF8,
                                   }
                              );
                              console.log("Finished Execution","CSV String: " + processedCsv);
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
               //  console.log(docRequest.output);
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
          // const base64 = await FileSystem.readAsStringAsync(
          //     String(fileLocation),
          //     {
          //       encoding: FileSystem.EncodingType.Base64
          //     }
          //   );
          // Replace with an actual string composed of papaparse data

          // Uncomment Below later on
          //   await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/example.db', base64, { encoding: FileSystem.EncodingType.Base64 });
          //   (await db).closeAsync
          //   setDb(SQLite.openDatabaseAsync('example.db'));
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
