import { Button, Text, View } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"black"
      }}
    >
      <Text style={{color:"white"}}>Edit app/index.tsx to edit this screen.</Text>
      {/* <Link href={"/Home"}>
        <Pressable>
          <Button title="Homepage" />
        </Pressable>
      </Link> */}
      <Button title="Homepage" onPress={()=>{router.push("Home")}}></Button>
      <Button title="Test Page" onPress={()=>{router.push("/pages/testpage")}}></Button>
    </View>
  );
}
