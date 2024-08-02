import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import * as dbFunc from "../DatabaseFunctions";
import { router } from "expo-router";

interface Items {
     items: {
          Article_Item: string;
          Description: string;
          Old_Property_Number: string;
          New_Property_Number: string;
          Unit_of_Measure: string;
          Unit_Value: string;
          Quantity_per_Property_Card: string;
          Quantity_per_Physical_Count: string;
          Location_Whereabouts: string;
          Condition: string;
          Remarks: string;
     };
}
interface ItemCardProps {
     items: Items;
     onClick: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ items, onClick }) => {
     console.log(items);
     // console.log(items["items"]["Article_Item"])
     return (
          <>
               <View style={cardstyle.card} key={items.New_Property_Number}>
                    <Text style={[cardstyle.textStyle, cardstyle.header]}>
                         {items.Article_Item}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Old. Prop. Number: {items.Old_Property_Number}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         New. Prop. Number: {items.New_Property_Number}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Description: {items.Description}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Unit of Measure: {items.Unit_of_Measure}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Unit Value: {items.Unit_Value}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Quantity per Property Card: {items.Quantity_per_Property_Card}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Quantity per Physical Count: {items.Quantity_per_Physical_Count}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Condition: {items.Condition}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Remarks: {items.Remarks}
                    </Text>

                    <View
                         style={{
                              flexDirection: "row",
                              justifyContent: "space-around",
                              paddingTop: 14,
                         }}
                    >
                         <Pressable
                              style={({ pressed }) => [
                                   cardstyle.button,
                                   pressed && cardstyle.buttonPressed,
                              ]}
                              onPress={() => {
                                   console.log("\n \n \n Description In Item Card (Inventory List Card): -------"+items.Description+"\n \n \n")
                                   router.push({
                                       pathname: `/itemview/recent/${items.New_Property_Number}`,
                                       params: {desc: `${items.Description}`}
                                   });
                              }}
                         >
                              <Text style={{ color: "black" }}>Edit</Text>
                         </Pressable>
                         <Pressable
                              style={({ pressed }) => [
                                   cardstyle.button,
                                   pressed && cardstyle.buttonPressed,
                              ]}
                              onPress={() => {
                                   console.log(
                                        "Prop Num: ",
                                        items.New_Property_Number
                                   );
                                   console.log("Delete clicked");
                                   dbFunc.deleteItem(items.New_Property_Number,items.Description);
                                   onClick();
                              }}
                         >
                              <Text style={{ color: "black" }}>Delete</Text>
                         </Pressable>
                    </View>
               </View>
          </>
     );
};

const cardstyle = StyleSheet.create({
     card: {
          backgroundColor: "black",
          marginBottom: 15,
          width: "100%",
          borderRadius: 20,
          padding: 20,
          marginRight: 15,
     },
     button: {
          padding: 10,
          backgroundColor: "white",
          color: "white",
          borderRadius: 15,
          marginVertical: 5,
          paddingHorizontal: 15,
          paddingVertical: 10,
     },
     buttonPressed: {
          backgroundColor: "gray", // Change to a different color when pressed
     },
     textStyle: {
          color: "white",
          paddingBottom: 5,
     },
     header: {
          fontSize: 20,
          fontWeight: "bold",
     },
});
export default ItemCard;
