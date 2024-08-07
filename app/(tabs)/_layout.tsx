import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
     Button,
     PermissionsAndroid,
     StatusBar,
     StyleSheet,
     Text,
     View,
} from "react-native";

export default () => {
     return (
          <>
               <Tabs
                    screenOptions={{
                         headerStyle: { backgroundColor: "coral" },
                         headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
                    }}
               >
                    <Tabs.Screen
                         name="Home"
                         options={{
                              title: "Scanner",
                              headerTitle: "PSALM Barcode Scanner",
                              tabBarIcon: ({ color }) => (
                                   <FontAwesome
                                        size={25}
                                        name="camera"
                                        color={color}
                                   />
                              ),
                         }}
                    />
                    <Tabs.Screen
                         name="InventoryList"
                         options={{
                              title: "Recently Scanned",
                              tabBarIcon: ({ color }) => (
                                   <FontAwesome
                                        size={25}
                                        name="list"
                                        color={color}
                                   />
                              ),
                         }}
                    />
                    <Tabs.Screen
                         name="TestParsePage"
                         options={{
                              title: "Main",
                              tabBarIcon: ({ color }) => (
                                   <FontAwesome
                                        size={25}
                                        name="folder"
                                        color={color}
                                   />
                              ),
                         }}
                    />
               </Tabs>
          </>
     );
};
