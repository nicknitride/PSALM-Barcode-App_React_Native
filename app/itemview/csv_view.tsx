import {ScrollView, Text,View, Pressable} from 'react-native'
import Button from '../styled-components/Button'
import ItemCard from '../styled-components/ItemCard'
import * as dbFunc from '../DatabaseFunctions'
import { Stack } from 'expo-router'
export default function CsvView(){
    const db = dbFunc.startDb();

    const allData = db.getAllSync('SELECT * FROM item');

    return(<>
        <Stack.Screen  options={{headerTitle:"CSV Preview"}} />
              <View style={{flex:1,justifyContent:"center", width:"100%"}}>
               <ScrollView>
                    <Text style={{ color: "black" }}></Text>
                    <View style={{alignItems:"center"}}>
                    <View style={{width:"80%"}}>
                    {allData.map((item) => (
                         <>
                         <ItemCard items={item} />
                         </>
                    ))}
                     </View>
                     </View>
               </ScrollView>
          </View>
    </>);
}
