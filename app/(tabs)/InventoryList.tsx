import { FlatList, ScrollView, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Button from "../styled-components/Button";
import { startDb, initDb } from "../DatabaseFunctions";
import { ItemCard } from "../styled-components";

export default function InventoryList() {
     const [display, setDisplay] = useState<string>("");
     useEffect(() => {
          showData();
     }, []);
     const db = startDb();
     initDb();

     const showData = () => {
          const allData = db.getAllSync(`SELECT * FROM item`);
          console.log(allData);
          setDisplay(JSON.stringify(allData));
     };

     const allData = db.getAllSync(`SELECT * FROM item`);

     return (
          <View
               style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
               }}
          >
               <ScrollView>
                    <Text style={{ color: "black" }}></Text>
                    {allData.map((item) => (
                         <ItemCard items={item}></ItemCard>
                    ))}
                    {/* {display === null && (
                         <>
                              <Text>Scanned Items will appear</Text>
                         </>
                    )}
                    {display && (
                         <>
                              <Text>{display}</Text>
                         </>
                    )} */}
               </ScrollView>
               <Button
                    title="Check Button"
                    onPress={() => {
                         showData();
                    }}
               ></Button>
          </View>
     );
}
