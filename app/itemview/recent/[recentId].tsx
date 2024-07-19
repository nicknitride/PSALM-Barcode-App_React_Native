import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
// import Button from "../../styled-cmponents/FullWidthButton";
import Button from "../../styled-components/FullWidthButton";
import { Stack, useLocalSearchParams } from "expo-router";
import * as dbfunc from "../../DatabaseFunctions";
import * as SQLite from "expo-sqlite";
import { dbEntry } from "../../types";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as dbFunc from "../../DatabaseFunctions";

// https://stackoverflow.com/questions/78246345/react-native-usesearchparams-hook-from-expo-router
// SQLITE Expo tutorial: https://github.com/chelseafarley/expo-sqlite-tutorial/blob/main/App.js

export default function itemEditView() {
     const db = dbfunc.startDb();
     dbfunc.initDb();
     const { recentId, desc } = useLocalSearchParams();
     console.log("Desc: ----------" + desc);
     const [sqlString, setSqlString] = useState<string>();

     let correspondingRow: any = "";
     const multiItemRow = db.getFirstSync<dbEntry>(
          `SELECT * FROM recent_items WHERE New_Property_Number = $new_property_number AND Description = $description`,
          { $new_property_number: `${recentId}`, $description: `${desc}` }
     );
     const singleItemRow = db.getFirstSync<dbEntry>(
          `SELECT * FROM recent_items WHERE New_Property_Number = $new_property_number`,
          { $new_property_number: `${recentId}` }
     );

     if (desc === undefined) {
          correspondingRow = singleItemRow;
     } else {
          correspondingRow = multiItemRow;
     }

     const [condition, setCondition] = useState(correspondingRow?.Condition);
     const [remark, setRemark] = useState(correspondingRow?.Remarks);

     console.log("Corresponding Row: " + JSON.stringify(correspondingRow));
     return (
          <>
               <View style={styles.outerContainer}>
                    <View style={styles.innerContainer}>
                         <View>
                              <Stack.Screen
                                   options={{
                                        headerTitle: "Update Entry View",
                                   }}
                              />
                              <View style={styles.card}>
                                   <Text style={styles.cardTextBody}>
                                        <Text style={styles.cardTextHeading}>
                                             Editing Item:{" "}
                                        </Text>{" "}
                                        {recentId}
                                   </Text>
                              </View>

                              <ScrollView>
                                   {correspondingRow !== null && (
                                        <>
                                             <View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextBody
                                                            }
                                                       >
                                                            <Text
                                                                 style={
                                                                      styles.cardTextHeading
                                                                 }
                                                            >
                                                                 Article Item:{" "}
                                                                 {
                                                                      correspondingRow.Article_Item
                                                                 }
                                                            </Text>
                                                       </Text>
                                                       <Text
                                                            style={
                                                                 styles.cardTextBody
                                                            }
                                                       >
                                                            <Text
                                                                 style={
                                                                      styles.cardTextHeading
                                                                 }
                                                            >
                                                                 Description:{" "}
                                                            </Text>
                                                            {
                                                                 correspondingRow.Description
                                                            }
                                                       </Text>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextHeading
                                                            }
                                                       >
                                                            Condition:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${condition}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={
                                                                      condition
                                                                 }
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      setCondition(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <ScrollView>
                                                            <Text
                                                                 style={
                                                                      styles.cardTextHeading
                                                                 }
                                                            >
                                                                 Remarks:{" "}
                                                            </Text>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${remark}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={remark}
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      setRemark(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                             </View>
                                        </>
                                   )}
                              </ScrollView>
                              <View
                                   style={{
                                        flexDirection: "row",
                                   }}
                              >
                                   <View style={{width:"50%"}}>
                                        <Button
                                             title="Cancel"
                                             onPress={() => {
                                                  router.navigate("/Home");
                                             }}
                                        ></Button>
                                   </View>
                                   <View style={{width:"50%"}}>
                                        <Button
                                             title="Update Item"
                                             onPress={(data: any) => {
                                                  console.log("Submit Clicked");
                                                  console.log(data);
                                                  dbFunc.updateRecentTable(
                                                       correspondingRow?.Article_Item,
                                                       correspondingRow?.Description,
                                                       correspondingRow?.Old_Property_Number,
                                                       correspondingRow?.New_Property_Number,
                                                       correspondingRow?.Unit_of_Measure,
                                                       correspondingRow?.Unit_Value,
                                                       correspondingRow?.Quantity_per_Property_Card,
                                                       correspondingRow?.Quantity_per_Physical_Count,
                                                       correspondingRow?.Location_Whereabouts,
                                                       condition,
                                                       remark
                                                  );
                                                  router.push(
                                                       "/(tabs)/InventoryList"
                                                  );
                                             }}
                                        />
                                   </View>
                              </View>
                         </View>
                    </View>
               </View>
          </>
     );
}

const styles = StyleSheet.create({
     input: {
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginTop: 18,
          borderColor: "black",
          backgroundColor: "white",
          marginBottom: 18,
          height: 150,
     },
     outerContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
     },
     innerContainer: {
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
     },
     card: {
          backgroundColor: "black",
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 20,
          marginVertical: 10,
     },
     cardTextHeading: {
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
     },
     cardTextBody: {
          color: "white",
          fontSize: 19,
          paddingBottom: 10,
     },
});
