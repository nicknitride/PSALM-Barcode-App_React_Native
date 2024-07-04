import {View,Text, ScrollView,TextInput,StyleSheet} from 'react-native'
import Button from '../styled-components/Button'
import {Stack, useLocalSearchParams} from 'expo-router'
import * as dbfunc from '../DatabaseFunctions';
import * as SQLite from 'expo-sqlite'
import {dbEntry} from '../types'
import { router } from 'expo-router';
import {Controller, useForm} from 'react-hook-form';
import { useState } from 'react';

// https://stackoverflow.com/questions/78246345/react-native-usesearchparams-hook-from-expo-router
// SQLITE Expo tutorial: https://github.com/chelseafarley/expo-sqlite-tutorial/blob/main/App.js




export default function itemEditView(){
    const db = dbfunc.startDb();
    dbfunc.initDb();
    const {id} = useLocalSearchParams();
    const correspondingRow = db.getFirstSync<dbEntry>(`SELECT * FROM item WHERE New_Property_Number = "${id}"`);
    const [condition,setCondition] = useState(correspondingRow?.Condition)
    console.log("Corresponding Row: "+JSON.stringify(correspondingRow))
    return(
        <>
        <View style={styles.container}>
            <Stack.Screen options={{headerTitle:"Edit View"}}/>
            <Text style={{fontWeight:'bold',fontSize:20}}>Editing Item: {id}</Text>
            <ScrollView>
                {(correspondingRow !==null) && <>
                <View>
                        <Text>Article Item: {correspondingRow.Article_Item}</Text>
                        <Text>Description: {correspondingRow.Description}</Text>
                        <TextInput placeholder={correspondingRow.Condition} style={styles.input} value={condition} onChangeText={(change)=>{setCondition(change)}}/>
                        <Text>Current Val: {condition}</Text>
                </View>
                </>}
            </ScrollView>
            <View style={{flexDirection:'row'}}>
            <Button title="Cancel" onPress={()=>{router.navigate('/Home')}}></Button>
            <Button title="Submit" onPress={(data:any)=>{
                console.log("Submit Clicked")
                console.log(data)
            }
                } />
            </View>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    input:{
        width:"90%",
        borderWidth:1,
        borderRadius:10,
        padding:10,
        marginTop:18,
        borderColor:"grey"
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})