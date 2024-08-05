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

function FormField(variable, variableName, setVariable) {
     return (
          <>
               <View style={styles.card}>
                    <ScrollView>
                         <Text style={styles.cardTextHeading}>{variableName}: </Text>
                         <TextInput
                              multiline={true}
                              placeholder={`${variable}`}
                              textAlignVertical="top"
                              numberOfLines={4}
                              style={styles.input}
                              value={variable}
                              onChangeText={(change) => {
                                   setVariable(change);
                              }}
                         />
                    </ScrollView>
               </View>
          </>
     );
}

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

     for (const key in correspondingRow) {
          // console.log(`${key}: ${correspondingRow[key]}`)
     }

     const [Description, set_Description] = useState(correspondingRow?.Description)
     const [Unit_of_Measure, set_Unit_of_Measure] = useState(correspondingRow?.Unit_of_Measure)
     const [Unit_Value, set_Unit_Value] = useState(correspondingRow?.Unit_Value)
     const [Quantity_per_Property_Card, set_Quantity_per_Property_Card] = useState(correspondingRow?.Quantity_per_Property_Card)
     const [Quantity_per_Physical_Count, set_Quantity_per_Physical_Count] =useState(correspondingRow?.Quantity_per_Physical_Count)
     const [Location_Whereabouts, set_Location_Whereabouts] = useState(correspondingRow?.Location_Whereabouts)
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
                                                  {FormField(Unit_of_Measure, "Unit of Measure", set_Unit_of_Measure)}
                                                  {FormField(Unit_Value, "Unit Value", set_Unit_Value)}
                                                  {FormField(Quantity_per_Property_Card, "Quantity per Property Card", set_Quantity_per_Property_Card)}
                                                  {FormField(Quantity_per_Physical_Count, "Quantity per Physical Count", set_Quantity_per_Physical_Count)}
                                                  {FormField(Location_Whereabouts, "Location Whereabouts", set_Location_Whereabouts)}
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
                                                       Unit_of_Measure,
                                                       Unit_Value,
                                                       Quantity_per_Property_Card,
                                                       Quantity_per_Physical_Count,
                                                       Location_Whereabouts,
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
