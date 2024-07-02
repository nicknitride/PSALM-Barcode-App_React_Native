import { StyleSheet, Text, View, TextInput, Button, Platform, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import * as Sharing from 'expo-sharing';
import {router} from 'expo-router';

export default function TestParsePage(){
    const [db, setDb] = useState(SQLite.openDatabaseAsync('example.db'));
    const [globalFileContent, SetGlobalFileContent] = useState();
    const [fileLocation, setFileLocation] = useState();
    const [docReqResult, setDocRequest] = useState<DocumentPicker.DocumentPickerResult>()

    const exportDb = async () => {
        if (Platform.OS === "android") {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(
              FileSystem.documentDirectory + 'SQLite/example.db',
              {
                encoding: FileSystem.EncodingType.Base64
              }
            );
    
            await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'example.db', 'application/octet-stream')
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
            })
            .catch((e) => console.log(e));
          } else {
            console.log("Permission not granted");
          }
        } else {
          await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/exported.csv');
        }
      }

    const getFile = async () =>{
        try{
            const docRequest = await DocumentPicker.getDocumentAsync({type:"text/comma-separated-values",copyToCacheDirectory:true});
            setDocRequest(docRequest)
            console.log(docRequest)
            console.log(docRequest.output)
            console.log(docRequest.assets[0].uri)
            if (docRequest.assets[0].uri !== null){
                setFileLocation(docRequest.assets[0].uri)
                console.log("File Location: "+fileLocation)
                const fileContent = await FileSystem.readAsStringAsync(docRequest.assets[0].uri)
                // console.log("File Content: ",fileContent)
                const parsedData = Papa.parse(fileContent,{
                    header:true,
                    transformHeader: (header:any) => header.trim(), // trim trailing spaces from header
                    skipEmptyLines: true,
                    complete:(results:any)=>{
                        console.log("Parsed Data: ", results)
                        SetGlobalFileContent(results.data)
                    }, //Use  a for each to insert into the sqlite db
                    error:()=>{console.log("CSV Could not be read")}
                })
            }
            else {
                console.log("File Picker Cancelled")
            }
        }
        catch(error){
            console.log(error)
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
    }
    return(
        <View>
            <Button title="Import CSV" onPress={()=>{
                getFile()
                console.log("Import clicked")
                }}></Button>
            <Button title='Export CSV' onPress={()=>{exportDb()}} />
            <Button title = 'Open Database Creation/Test Page' onPress={()=>{
                router.push("/testing/dbtestpage")
            }}/>
            <ScrollView>
            <Text>Parsed JSON: {JSON.stringify(docReqResult?.assets)}</Text>
            <Text>Parsed Data: {JSON.stringify(globalFileContent)}</Text>
            </ScrollView>
        </View>
    );
}