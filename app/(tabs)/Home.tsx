import { Text, View,StyleSheet,TouchableOpacity } from "react-native";
import Button from "../styled-components/Button";
import { useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BarcodeScanningResult } from "expo-camera";

export default function Home() {
  const [currentlyScanning, setCurrentlyScanning] = useState(false);
  const [facing, setFacing] = useState('back');
  // const [permission, requestPermission] = useCameraPermissions();

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if(currentlyScanning===false){
  return (
    <>
        <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
      }}
    >
      <View style={{width:300}}>
      <Text style={{color:"black",margin:5}}>Import a copy of your Inventory List to Begin</Text>
      <Text style={{margin:5}}>Note: Importing clears your edit history and resets the app</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Button title="Scan Barcode" onPress={()=>{setCurrentlyScanning(true)}}></Button>
      <Button title="Import CSV"></Button>
      </View>
    </View>
    </>
  );

  }else{
    return(
      <>
      <View>
      <Button title="Stop Scanning" onPress={()=>{setCurrentlyScanning(false)}}></Button>
      </View>
      <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{barcodeTypes:['ean-13','qr']}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});