import { Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Button from "../styled-components/Button";

export default function InventoryList() {
     const [display, setDisplay] = useState<string>("");
     useEffect(() => {
          showData();
     }, []);
     const db = SQLite.openDatabaseSync("test.db");
     const initDb = async () => {
          console.log(db);
          try {
               await db.execAsync(`
              CREATE TABLE IF NOT EXISTS recently_scanned (Article_Item TEXT,
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
          } catch (error) {
               setDisplay(String(error));
          }
     };
     initDb();
     const showData = () => {
          const allData = db.getAllSync(`SELECT * FROM recently_scanned`);
          console.log(allData);
          setDisplay(JSON.stringify(allData));
     };
     return (
          <View
               style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
               }}
          >
               <Text style={{ color: "black" }}></Text>
               {display === null && (
                    <>
                         <Text>Scanned Items will appear</Text>
                    </>
               )}
               {display && (
                    <>
                         <Text>{display}</Text>
                    </>
               )}
               <Button
                    title="Check Button"
                    onPress={() => {
                         showData();
                    }}
               ></Button>
          </View>
     );
}
