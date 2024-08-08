import { router, Stack, useLocalSearchParams } from "expo-router";
import * as dbFunc from "../DatabaseFunctions";
import { dbEntry } from "../types";
import { View, Text, StyleSheet } from "react-native";
import Button from "../styled-components/Button";
import ItemNoButton from "../styled-components/ItemNoButton";

export default function confirm_change() {
     const { id, action } = useLocalSearchParams();
     const db = dbFunc.startDb();
     dbFunc.initDb();
     console.log(id);
     const row = db.getFirstSync<dbEntry>(
          `SELECT * FROM recent_items WHERE New_Property_Number = $new_property_number`,
          { $new_property_number: `${id}` }
     );
     return (
          <>
               <View style={styles.outerContainer}>
                    <View style={styles.innerContainer}>
                         <View>
                              <Stack.Screen
                                   options={{
                                        headerTitle: "Entry Confirmation",
                                   }}
                              />
                              <View style={styles.card}>
                                   <Text style={styles.cardTextBody}>
                                        Successfully {action} the entry!
                                   </Text>
                              </View>
                              <ItemNoButton
                                   items={row}
                                   key={`${row?.New_Property_Number}`}
                              ></ItemNoButton>
                         </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                         <View style={{ width: "50%" }}>
                              <Button
                                   title="Go to List"
                                   onPress={() => {
                                        router.navigate("/InventoryList");
                                   }}
                              ></Button>
                         </View>
                         <View style={{ width: "50%" }}>
                              <Button
                                   title="Scan Another"
                                   onPress={() => {
                                        router.push("/Home");
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
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginTop: 18,
          borderColor: "black",
          backgroundColor: "white",
          marginBottom: 10,
          height: 55,
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
});
