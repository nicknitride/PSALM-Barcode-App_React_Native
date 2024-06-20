import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"black"
      }}
    >
      <Text style={{color:"white"}}>This is the Homescreen</Text>
    </View>
  );
}
