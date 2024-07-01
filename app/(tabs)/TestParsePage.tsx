import { StyleSheet, Text, View, TextInput, Button, Platform, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';

export default function TestParsePage(){
    const [globalFileContent, SetGlobalFileContent] = useState()
    const [docReqResult, setDocRequest] = useState<DocumentPicker.DocumentPickerResult>()
    const getFile = async () =>{
        try{
            const docRequest = await DocumentPicker.getDocumentAsync({type:"text/comma-separated-values",copyToCacheDirectory:true});
            setDocRequest(docRequest)
            console.log(docRequest)
            console.log(docRequest.output)
            console.log(docRequest.assets[0].uri)
            if (docRequest.assets[0].uri!==null){
                const fileContent = await FileSystem.readAsStringAsync(docRequest.assets[0].uri)
                console.log("File Content: ",fileContent)
                const parsedData = Papa.parse(fileContent,{
                    header:true,
                    transformHeader: (header:any) => header.trim(), // trim trailing spaces from header
                    skipEmptyLines: true,
                    complete:(results:any)=>{console.log("Parsed Data: ", results.data[0])
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
            setErrorMessage(String(error))
        }
    }
    return(
        <View>
            <Button title="Import CSV" onPress={()=>{
                getFile()
                console.log("Import clicked")
                }}></Button>
            <ScrollView>
            <Text>Parsed JSON: {JSON.stringify(docReqResult?.assets)}</Text>
            <Text>Parsed Data: {JSON.stringify(globalFileContent)}</Text>


            </ScrollView>
        </View>
    );
}