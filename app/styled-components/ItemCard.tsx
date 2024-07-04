import { View,ScrollView, Text,StyleSheet,Pressable } from "react-native";

interface Items {
     items: {Article_Item: string;
     Description: string;
     Old_Property_Number: string;
     New_Property_Number: string;
     Unit_of_Measure: string;
     Unit_Value: string;
     Quantity_per_Property_Card: string;
     Quantity_per_Physical_Count: string;
     Location_Whereabouts: string;
     Condition: string;
     Remarks: string;}
}

export default function ItemCard(items: Items) {
     console.log(items)
     console.log(items["items"]["Article_Item"])
     return (
          <>
               <View style={cardstyle.card}>
                    <Text>Item Name: {items["items"]["Article_Item"]}</Text>
                    <Text>Description: {items["items"]["Description"]}</Text>
                    <Text>Old. Prop. Number: {items["items"]["Old_Property_Number"]}</Text>
                    <Text>New. Prop. Number: {items["items"]["New_Property_Number"]}</Text>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20}}>
                    <Pressable style={({ pressed }) => [
                              cardstyle.button,
                              pressed && cardstyle.buttonPressed
                              ]}>
                         <Text style={{color:"white"}} 
                         >Edit</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [
                              cardstyle.button,
                              pressed && cardstyle.buttonPressed
                              ]}>
                         <Text style={{color:"white"}} 
                         >Delete</Text>
                    </Pressable>
                    </View>

               </View>
          </>
     );
}

const cardstyle = StyleSheet.create(
     {
          card:{
               backgroundColor:"gray",
               marginBottom:5,
               width:"80%",
               borderRadius:20,
               padding:10
          },
          button:{
               padding:10,
               backgroundColor:"black",
               color:"white",
               borderRadius:15,
               marginVertical: 5,
               paddingHorizontal:15,
               paddingVertical:10
          },
          buttonPressed: {
               backgroundColor: 'gray',  // Change to a different color when pressed
          }
     }
)