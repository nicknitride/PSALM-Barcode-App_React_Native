import { FlatList, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect, useCallback } from "react";
import Button from "../styled-components/Button";
import { startDb, initDb } from "../DatabaseFunctions";
import ItemCard from "../styled-components/ItemCard";
import { dbEntry } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";

export default function InventoryList() {
     // const [display, setDisplay] = useState<string>("");
     const db = startDb();
     initDb();
     const [allData, setAllData] = useState(
          db.getAllSync(`SELECT * FROM recent_items`)
     );
     // Function to fetch data from database
     const fetchData = () => {
          console.log("Parent fetch triggered");
          // const data = ;
          setAllData(db.getAllSync(`SELECT * FROM recent_items`));
     };

     // Fetch data on component mount
     useEffect(() => {
          fetchData(); // Fetch initial data
     }, []); // Empty dependency array ensures this runs only once on mount

     // Fetch data on screen focus
     useFocusEffect(
          useCallback(() => {
               fetchData(); // Fetch data every time the screen gains focus
          }, [])
     );
     return (
          <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
               <View
                    style={{
                         width: "90%",
                         marginLeft: "auto",
                         marginRight: "auto",
                         marginTop: 1,
                    }}
               >
                    <Button
                         title="Add New Item"
                         onPress={() => router.push(`itemview/create`)}
                    ></Button>
               </View>
               <ScrollView>
                    <Text style={{ color: "black" }}></Text>
                    <View style={{ alignItems: "center" }}>
                         <View style={{ width: "80%" }}>
                              {allData.map((item) => (
                                   <>
                                        <ItemCard
                                             items={item}
                                             onClick={fetchData}
                                        />
                                   </>
                              ))}
                         </View>
                    </View>
               </ScrollView>
          </View>
     );
}
