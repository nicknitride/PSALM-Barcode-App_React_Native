import { Text, View } from "react-native";

export default function InventoryList() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
      }}
    >
      <Text style={{color:"black"}}>Scanned Items Will Appear Here</Text>
    </View>
  );
}
