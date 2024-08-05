import {
     ScrollView,
     Text,
     View,
     Pressable,
     TextInput,
     StyleSheet,
} from "react-native";
import * as dbFunc from "../DatabaseFunctions";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Button from "../styled-components/Button";
export default function addItemPage() {
     const db = dbFunc.startDb();
     dbFunc.initDb();
     const { id } = useLocalSearchParams();
     const [new_id, set_new_id] = useState(id ? id : "");
     const [Article_Item, set_Article_Item] = useState("");
     const [Description, set_Description] = useState("");
     const [Old_Property_Number, set_Old_Property_Number] = useState("");
     const [Unit_of_Measure, set_Unit_of_Measure] = useState("");
     const [Unit_Value, set_Unit_Value] = useState("");
     const [Quantity_per_Property_Card, set_Quantity_per_Property_Card] =
          useState("");
     const [Quantity_per_Physical_Count, set_Quantity_per_Physical_Count] =
          useState("");
     const [Location_Whereabouts, set_Location_Whereabouts] = useState("");
     const [Condition, set_Condition] = useState("");
     const [Remarks, set_Remarks] = useState("");

     return (
          <>
               <View style={styles.outerContainer}>
                    <View style={styles.innerContainer}>
                         <View>
                              <Stack.Screen
                                   options={{ headerTitle: "Add an Entry" }}
                              />
                              <View style={styles.card}>
                                   {id ? (
                                        <Text style={styles.cardTextBody}>
                                             ID Number Detected: {id}
                                        </Text>
                                   ) : (
                                        <Text style={styles.cardTextBody}>
                                             Enter New Property Number:
                                        </Text>
                                   )}
                                   <TextInput
                                        value={new_id}
                                        onChangeText={(change) => {
                                             set_new_id(change);
                                        }}
                                        style={styles.idTextInput}
                                   />
                              </View>
                              <ScrollView>
                                   <Text style={{ color: "black" }}>
                                        We got {id}
                                   </Text>
                                   <View style={{ alignItems: "center" }}>
                                        <View style={{ width: "100%" }}>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Article Item:
                                                  </Text>
                                                  <TextInput
                                                       value={Article_Item}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            set_Article_Item(
                                                                 change
                                                            );
                                                       }}
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Description:
                                                  </Text>
                                                  <TextInput
                                                       value={Description}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            set_Description(
                                                                 change
                                                            );
                                                       }}
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Unit of Measure:
                                                  </Text>
                                                  <TextInput
                                                       value={Unit_of_Measure}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            set_Unit_of_Measure(
                                                                 change
                                                            );
                                                       }}
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Unit Value:
                                                  </Text>
                                                  <TextInput
                                                       value={Unit_Value}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            set_Unit_Value(
                                                                 change
                                                            );
                                                       }}
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Quantity per Property
                                                       Card:
                                                  </Text>
                                                  <TextInput
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
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Quantity per Physical
                                                       Count:
                                                  </Text>
                                                  <TextInput
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
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Location Whereabouts:
                                                  </Text>
                                                  <TextInput
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
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Condition:
                                                  </Text>
                                                  <TextInput
                                                       value={Condition}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            set_Condition(
                                                                 change
                                                            );
                                                       }}
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                             <View style={styles.card}>
                                                  <Text
                                                       style={
                                                            styles.cardTextHeading
                                                       }
                                                  >
                                                       Remarks:
                                                  </Text>
                                                  <TextInput
                                                       value={Remarks}
                                                       onChangeText={(
                                                            change
                                                       ) => {
                                                            set_Remarks(change);
                                                       }}
                                                       style={styles.input}
                                                       multiline={true}
                                                       textAlignVertical="top"
                                                       numberOfLines={2}
                                                  />
                                             </View>
                                        </View>
                                   </View>
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
                                                  dbFunc.insertToRecent(
                                                       Article_Item,
                                                       Description,
                                                       Old_Property_Number,
                                                       new_id,
                                                       Unit_of_Measure,
                                                       Unit_Value,
                                                       Quantity_per_Property_Card,
                                                       Quantity_per_Physical_Count,
                                                       Location_Whereabouts,
                                                       Condition,
                                                       Remarks
                                                  );
                                                  router.push("/Home");
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
          marginBottom: 10,
          height: 5,
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
     idTextInput: {
          borderWidth: 1,
          borderColor: "black",
          padding: 4,
          margin: 5,
          backgroundColor: "white",
          width: "70%",
          borderRadius: 20,
          paddingVertical: 5,
          paddingHorizontal: 3,
          marginVertical: 5,
     },
     // input: {
     //      borderWidth: 1,
     //      borderRadius: 10,
     //      padding: 10,
     //      marginTop: 18,
     //      borderColor: "black",
     //      backgroundColor: "white",
     //      marginBottom: 18,
     //      height: 150,
     // },
     scratch: {
          backgroundColor: "#0000FF",
          color: "white",
     },
});
