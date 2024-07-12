
import { Redirect } from "expo-router";
import {LogBox} from "react-native";


export default function Index() {
  LogBox.ignoreAllLogs()
  return (
    <Redirect href="/Home"/>
  );
}
