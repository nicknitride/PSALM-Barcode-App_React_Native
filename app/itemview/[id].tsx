import {View,Text} from 'react-native'
import Button from '../styled-components/Button'
import {Stack, useLocalSearchParams} from 'expo-router'
// https://stackoverflow.com/questions/78246345/react-native-usesearchparams-hook-from-expo-router

export default function itemEditView(){
    const {id} = useLocalSearchParams();
    // SQLITE Expo tutorial: https://github.com/chelseafarley/expo-sqlite-tutorial/blob/main/App.js
    return(
        <>
        <View>
            <Stack.Screen options={{headerTitle:"Edit View"}}/>
            <Text style={{fontWeight:'bold'}}>Editing Item: {id}</Text>
            {/* TODO: ONCE BACKEND IS FINISHED ADD SQLITE CODE TO PULL DATA AND TURN THIS INTO A FORM THAT EDITS IT */}
            {/* THEN PUSH THE EDITED ITEM TO THE TABLE DISPLAYED IN THE INVENTORY LIST */}
            {/* SQLITE Implementation Idea:
                1. Papaparse - Parse the CSV generated for the singular table and convert to JSON
                2. Write a command that creates the tables if it doesn't exist given the inventory structure
                    2.a Recents table - this table is what you display in the inventory tab (only display rows with changed values)
                    2.b General table - this table holds the imported data 
                    Install command: npx install papaparse
                    Github for Expo SQLite YT Tutorial: https://github.com/chelseafarley/expo-sqlite-tutorial/blob/main/App.js
                    YT Video: https://www.youtube.com/watch?v=1kSLd9oQX7c&t=90s
                    The YT Video includes the import function and export function
                3. Write a custom function that takes the exported db and converts it back into a CSV or another usable format
            */}
            {/* General Implementation Idea:
                1. Inventory requires a function to display the recently edited table in reverse chronological order
                2. A clickable card that reopens an 'itemview/[id]' that allows editing 
            */}
        </View>
        </>
    );
}