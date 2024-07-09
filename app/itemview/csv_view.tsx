import {ScrollView, Text,View, Pressable} from 'react-native'
import Button from '../styled-components/Button'
import { ItemNoButton } from '../styled-components/ItemNoButton'
import * as dbFunc from '../DatabaseFunctions'
import { Stack } from 'expo-router'
export default function CsvView(){
    const db = dbFunc.startDb();

    const allData = db.getAllSync('SELECT * FROM item');
    console.log("\n"+"All Data: ------------------"+`\n ${JSON.stringify(allData)}`+"-----------------")

    return(<>
        <Stack.Screen  options={{headerTitle:"CSV Preview"}} />
              <View style={{flex:1,justifyContent:"center", width:"100%"}}>
               <ScrollView>
                    <Text style={{ color: "black" }}></Text>
                    <View style={{alignItems:"center"}}>
                    <View style={{width:"80%"}}>
                    {allData.map((item) => (
                         <>
                         <ItemNoButton items={item} key={`${item.New_Property_Number}${item.Description}`} />
                         </>
                    ))}
                     </View>
                     </View>
               </ScrollView>
          </View>
    </>);
}
