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

     const [Description, set_Description] = useState(correspondingRow?.Description)
     const [Unit_of_Measure, set_Unit_of_Measure] = useState(correspondingRow?.Unit_of_Measure)
     const [Unit_Value, set_Unit_Value] = useState(correspondingRow?.Unit_Value)
     const [Quantity_per_Property_Card, set_Quantity_per_Property_Card] = useState(correspondingRow?.Quantity_per_Property_Card)
     const [Quantity_per_Physical_Count, set_Quantity_per_Physical_Count] =useState(correspondingRow?.Quantity_per_Physical_Count)
     const [Location_Whereabouts, set_Location_Whereabouts] = useState(correspondingRow?.Location_Whereabouts)
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
                                                            Description:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${Description}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={
                                                                      Description
                                                                 }
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      set_Description(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextHeading
                                                            }
                                                       >
                                                            Unit of Measure:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${Unit_of_Measure}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={
                                                                      Unit_of_Measure
                                                                 }
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      set_Unit_of_Measure(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextHeading
                                                            }
                                                       >
                                                            Unit Value:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${Unit_Value}`}
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
                                                                      set_Unit_Value(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextHeading
                                                            }
                                                       >
                                                            Quantity per Property Card:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${Quantity_per_Property_Card}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={
                                                                      Quantity_per_Property_Card
                                                                 }
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      set_Quantity_per_Property_Card(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextHeading
                                                            }
                                                       >
                                                            Quantity per Physical Count:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${Quantity_per_Physical_Count}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={
                                                                      Quantity_per_Physical_Count
                                                                 }
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      set_Quantity_per_Physical_Count(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
                                                  </View>
                                                  <View style={styles.card}>
                                                       <Text
                                                            style={
                                                                 styles.cardTextHeading
                                                            }
                                                       >
                                                            Location Whereabouts:
                                                       </Text>
                                                       <ScrollView>
                                                            <TextInput
                                                                 multiline={
                                                                      true
                                                                 }
                                                                 placeholder={`${Location_Whereabouts}`}
                                                                 textAlignVertical="top"
                                                                 numberOfLines={
                                                                      4
                                                                 }
                                                                 style={
                                                                      styles.input
                                                                 }
                                                                 value={
                                                                      Location_Whereabouts
                                                                 }
                                                                 onChangeText={(
                                                                      change
                                                                 ) => {
                                                                      set_Location_Whereabouts(
                                                                           change
                                                                      );
                                                                 }}
                                                            />
                                                       </ScrollView>
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
                                        justifyContent:"space-between"
                                   }}
                              >
                                   <View style={{width:"45%"}}>
                                        <Button
                                             title="Cancel"
                                             onPress={() => {
                                                  router.navigate("/Home");
                                             }}
                                        ></Button>
                                   </View>
                                   <View style={{width:"45%"}}>
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
