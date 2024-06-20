import { Text, View } from "react-native";
import Button from "../styled-components/Button";

export default function Home() {
  return (
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
      <Button title="Scan Barcode"></Button>
      <Button title="Import CSV"></Button>
      </View>
    </View>
  );
}
