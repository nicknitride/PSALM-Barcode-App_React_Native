import { Tabs } from "expo-router";
import { useState } from "react";
import {
    Button,
    PermissionsAndroid,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';


export default () => {
    const [hasPermission, setHasPermission] = useState(false);
    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Access Request',
              message:
                'Required Permission for Core Functionality',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
    if(hasPermission===false){
        requestCameraPermission()
        setHasPermission(true)
    }
  return (
    <>
      <Tabs
        screenOptions={{headerStyle:{backgroundColor:"coral"},headerTitleStyle:{fontSize:25,fontWeight:"bold"}}}
      >
        <Tabs.Screen name="Home" options={{title:"Home",headerTitle:"Home - PSALM Barcode"}}/>
        <Tabs.Screen name="InventoryList" options={{ title: "Inventory" }} />
      </Tabs>
    </>
  );
};
