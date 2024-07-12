import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import Button from "../styled-components/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import * as dbfunc from "../DatabaseFunctions";
import { dbEntry } from "../types";
import { router } from "expo-router";
import { useState } from "react";
import * as dbFunc from "../DatabaseFunctions";

// https://stackoverflow.com/questions/78246345/react-native-usesearchparams-hook-from-expo-router
// SQLITE Expo tutorial: https://github.com/chelseafarley/expo-sqlite-tutorial/blob/main/App.js

export default function itemEditView() {
     const db = dbfunc.startDb();
     dbfunc.initDb();
     const { id, desc } = useLocalSearchParams();
     let correspondingRow: any;
     const multiItemRow = db.getFirstSync<dbEntry>(
          `SELECT * FROM item WHERE New_Property_Number = $new_property_number AND Description = $description`,
          { $new_property_number: `${id}`, $description: `${desc}` }
     );
     const singleItemRow = db.getFirstSync<dbEntry>(
          `SELECT * FROM item WHERE New_Property_Number = $new_property_number`,
          { $new_property_number: `${id}` }
     );

     if (desc === undefined) {
          console.log("Description is undefined (inside id.tsx)");
          correspondingRow = singleItemRow;
     } else {
          console.log("Description is defined (inside id.tsx)" + desc);
          correspondingRow = multiItemRow;
     }
     console.log("Corresponding Row: " + correspondingRow);

     const [condition, setCondition] = useState(correspondingRow?.Condition);
     const [remark, SetRemark] = useState(correspondingRow?.Remarks);
     return (
          <>
               <View style={styles.outerContainer}>
                    <View style={styles.innerContainer}>
                         <View>
                              <Stack.Screen
                                   options={{ headerTitle: "Edit View" }}
                              />
                              <View style={styles.card}>
                                   <Text style={styles.cardTextHeading}>
                                        Editing Item: {id} -{" "}
                                        {correspondingRow?.Article_Item}
                                   </Text>
                              </View>

                              <ScrollView>
                                   {correspondingRow !== null && (
                                        <>
                                             <View>
                                                  <View style={styles.card}>
                                                       {/* Contains the db content */}
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
                                                            </Text>
                                                            {"\n"}
                                                            {
                                                                 correspondingRow.Article_Item
                                                            }
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
                                                                 Description:
                                                            </Text>{" "}
                                                            {"\n"}
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
                                                                      SetRemark(
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
                              <View style={{ flexDirection: "row" }}>
                                   <View style={{ width: "50%" }}>
                                        <Button
                                             title="Cancel"
                                             onPress={() => {
                                                  router.navigate("/Home");
                                             }}
                                        ></Button>
                                   </View>
                                   <View style={{ width: "50%" }}>
                                        <Button
                                             title="Submit"
                                             onPress={() => {
                                                  console.log("Submit Clicked");
                                                  console.log(
                                                       condition,
                                                       remark
                                                  );
                                                  dbFunc.insertToRecent(
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
          alignItems: "center",
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
