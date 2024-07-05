import { FlatList, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Button from "../styled-components/Button";
import { startDb, initDb } from "../DatabaseFunctions";
import ItemCard  from "../styled-components/ItemCard";
import { dbEntry } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InventoryList() {
     // const [display, setDisplay] = useState<string>("");
     const db = startDb();
     initDb();
     let allData = db.getAllSync(`SELECT * FROM recent_items`);
     const showData = () => {
           allData = db.getAllSync(`SELECT * FROM recent_items`);
     };
     useFocusEffect(()=>{
          showData();
     })
     return (
          <View style={{flex:1,justifyContent:"center", width:"100%"}}>
               <ScrollView>
                    <Text style={{ color: "black" }}></Text>
                    <View style={{alignItems:"center"}}>
                    <View style={{width:"80%"}}>
                    {allData.map((item) => (
                         <>
                         <ItemCard items={item} onClick={showData}/>
                         </>
                    ))}
                     </View>
                     </View>
               </ScrollView>
          </View>
     );
}
