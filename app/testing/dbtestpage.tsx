import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import Button from "../styled-components/Button";
import Papa from "papaparse";

export default function dbtestpage() {
     const db = SQLite.openDatabaseSync("test.db");
     const initDb = async () => {
          console.log(db);
          await db.execAsync(`
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
     const [display, setDisplay] = useState<any>();

     const addInitial = async () => {
          try {
               await db.execAsync(`
                INSERT INTO item (
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
                    "Test Item",
                    "Description here",
                    1234,
                    5678,
                    "km",
                    "3000",
                    "4",
                    "None",
                    "In the backrooms",
                    "In poor condition",
                    "Need to replace soon"
                );
                INSERT INTO item (
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
                    "Test Item",
                    "Description here",
                    1234,
                    2345,
                    "km",
                    "3000",
                    "4",
                    "None",
                    "In the backrooms",
                    "In poor condition",
                    "Need to replace soon"
                );
            `);
               console.log("Insertion successful");
          } catch (error) {
               setDisplay(JSON.stringify(error));
          }
     };
     // addInitial()

     const showData = () => {
          const allData = db.getAllSync(`SELECT * FROM item`);
          console.log(allData);
          setDisplay(JSON.stringify(allData));
     };

     // const allRows = await db.getAllAsync('SELECT * FROM test');
     // for (const row of allRows) {
     //     console.log(row.id, row.value, row.intValue);
     // }

     //
     const sqlToCsv = async () => {
          const allData = await db.getAllSync(`SELECT * FROM item`);
          var csv = Papa.unparse(allData);
          console.log(csv);
     };

     return (
          <>
               <View>
                    <Stack.Screen
                         options={{ headerTitle: "DB Testing Page" }}
                    />
                    <Button
                         title="Get Items"
                         onPress={() => {
                              showData();
                              sqlToCsv();
                         }}
                    ></Button>
                    <Button
                         title="Insert Data"
                         onPress={() => {
                              addInitial();
                         }}
                    />
                    <ScrollView>
                         <Text>{display}</Text>
                    </ScrollView>
               </View>
          </>
     );
}

/* 
Headers:
Article_Item, Description,Old_Property_Number,New_Property_Number,Unit_of_Measure,Unit_Value,Quantity_per_Property_Card,
Quantity_per_Physical_Count,Location_Whereabouts,Condition,Remarks

*/
