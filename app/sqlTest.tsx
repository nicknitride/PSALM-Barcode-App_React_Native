import * as dbFunc from "./DatabaseFunctions";
import { View, ScrollView, Text, Button, TextInput } from "react-native";
import { useState } from "react";
export default function sqlTestPage() {
    const db = dbFunc.startDb();
    dbFunc.initDb();
    const [sqlStatement, setSqlStatement] = useState<string>("");
    const [output, setOutput] = useState<string>();
     return (
          <View>
               <Text style={{ fontSize: 20 }}>Enter SQL Statement Here:</Text>
               <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={4}
                    value={sqlStatement}
                    onChangeText={(val) => {
                         setSqlStatement(val);
                    }}
               />
               <Button title="Test SQL Statement" onPress={()=>{
                    const data = db.getAllSync(`${sqlStatement}`)

                    
                    setOutput(JSON.stringify(data))
                    console.log(JSON.stringify(data))
                    
               }} />

               {output && <>
               <ScrollView>
                {JSON.parse(output).map((item)=>(
                    <>
                    <Text selectable={true}>{JSON.stringify(item)}</Text>
                    </>
                ))}
               </ScrollView>
               
               </>}
          </View>
     );
}
