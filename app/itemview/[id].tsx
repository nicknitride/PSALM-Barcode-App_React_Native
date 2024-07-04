import {View,Text, ScrollView} from 'react-native'
import Button from '../styled-components/Button'
import {Stack, useLocalSearchParams} from 'expo-router'
import * as dbfunc from '../DatabaseFunctions';
import * as SQLite from 'expo-sqlite'
import {dbEntry} from '../types'
import { router } from 'expo-router';
// https://stackoverflow.com/questions/78246345/react-native-usesearchparams-hook-from-expo-router
// SQLITE Expo tutorial: https://github.com/chelseafarley/expo-sqlite-tutorial/blob/main/App.js




export default function itemEditView(){
    const db = dbfunc.startDb();
    dbfunc.initDb();

    const {id} = useLocalSearchParams();
    const correspondingRow = db.getFirstSync<dbEntry>(`SELECT * FROM item WHERE New_Property_Number = ${id}`);
    console.log(correspondingRow)
    return(
        <>
        <View>
            <Stack.Screen options={{headerTitle:"Edit View"}}/>
            <Text style={{fontWeight:'bold',fontSize:20}}>Editing Item: {id}</Text>
            <ScrollView>
                {(correspondingRow !==null) && <>
                <View>
                    <Text>Article Item: {correspondingRow.Article_Item}</Text>
                    <Text>Description: {correspondingRow.Description}</Text>
                    <Text>Condition: {correspondingRow.Condition}</Text>
                    <Text>Remarks: {correspondingRow.Remarks}</Text>
                </View>
                </>}
            </ScrollView>
            <Button title="Cancel" onPress={()=>{router.navigate('/Home')}}></Button>
            <Button title="Submit" onPress={()=>{console.log("Submit Clicked")}} />
        </View>
        </>
    );
}