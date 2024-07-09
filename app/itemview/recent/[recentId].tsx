import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import Button from "../../styled-components/Button";
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
     const correspondingRow = db.getFirstSync<dbEntry>(
          `SELECT * FROM recent_items WHERE New_Property_Number = $new_property_number AND Description = $description`,
          { $new_property_number: `${recentId}`, $description: `${desc}` }
     );

     const [condition, setCondition] = useState(correspondingRow?.Condition);
     const [remark, setRemark] = useState(correspondingRow?.Remarks);

     console.log("Corresponding Row: " + JSON.stringify(correspondingRow));
     return (
          <>
               <View style={styles.container}>
                    <View>
                         <Stack.Screen
                              options={{ headerTitle: "Update Entry View" }}
                         />
                         <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                              Editing Item: {recentId}
                         </Text>
                         <ScrollView>
                              {correspondingRow !== null && (
                                   <>
                                        <View>
                                             <Text>
                                                  Article Item:{" "}
                                                  {
                                                       correspondingRow.Article_Item
                                                  }
                                             </Text>
                                             <Text>
                                                  Description:{" "}
                                                  {correspondingRow.Description}
                                             </Text>
                                             <Text>Condition:</Text>
                                             <ScrollView>
                                                  <TextInput
                                                       multiline={true}
                                                       placeholder={`${condition}`}
                                                       textAlignVertical="top"
                                                       numberOfLines={4}
                                                       style={styles.input}
                                                       value={condition}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            setCondition(
                                                                 change
                                                            );
                                                       }}
                                                  />
                                             </ScrollView>
                                             <ScrollView>
                                                  <Text>Remarks: </Text>
                                                  <TextInput
                                                       multiline={true}
                                                       placeholder={`${remark}`}
                                                       textAlignVertical="top"
                                                       numberOfLines={4}
                                                       style={styles.input}
                                                       value={remark}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            setRemark(change);
                                                       }}
                                                  />
                                             </ScrollView>
                                        </View>
                                   </>
                              )}
                         </ScrollView>
                         <View style={{ flexDirection: "row" }}>
                              <Button
                                   title="Cancel"
                                   onPress={() => {
                                        router.navigate("/Home");
                                   }}
                              ></Button>
                              <Button
                                   title="Update Existing Entry"
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
                                        router.push("/(tabs)/InventoryList");
                                   }}
                              />
                         </View>
                    </View>
               </View>
          </>
     );
}

const styles = StyleSheet.create({
     input: {
          width: "90%",
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginTop: 18,
          borderColor: "black",
     },
     largeText: {
          height: 300,
     },
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
});
