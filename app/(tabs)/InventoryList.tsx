import { FlatList, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Button from "../styled-components/Button";
import { startDb, initDb } from "../DatabaseFunctions";

export default function InventoryList() {
     const [display, setDisplay] = useState<string>("");
     useEffect(() => {
          showData();
     }, []);
     const db = startDb();
     initDb();
     const showData = () => {
          const allData = db.getAllSync(`SELECT * FROM recent_items`);
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
               <FlatList></FlatList>
          </View>
     );
}
