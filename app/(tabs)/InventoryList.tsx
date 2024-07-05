import { FlatList, ScrollView, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Button from "../styled-components/Button";
import { startDb, initDb } from "../DatabaseFunctions";
import ItemCard  from "../styled-components/ItemCard";
import { dbEntry } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

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
          <View style={{flex:1,justifyContent:"center", width:"100%"}}>
               <ScrollView>
                    <Text style={{ color: "black" }}></Text>
                    <View style={{alignItems:"center"}}>
                    <View style={{width:"80%"}}>
                    {allData.map((item) => (
                         <>
                         {/* <Text>{JSON.stringify(item)}</Text> */}
                         <ItemCard items={item}></ItemCard>
                         </>
                    ))}
                     </View>
                     </View>
               </ScrollView>
          </View>

     );
}
