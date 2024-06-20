import { Text, View } from "react-native";

export default function testpage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"black"
      }}
    >
      <Text style={{color:"white"}}>This is the TestPage</Text>
    </View>
  );
}
