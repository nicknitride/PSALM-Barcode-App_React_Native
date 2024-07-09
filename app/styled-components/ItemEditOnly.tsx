import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import * as dbFunc from "../DatabaseFunctions";
import { router } from "expo-router";
import { Button } from "react-native";

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

interface ItemEditOnlyProps {
     items: Items,
     onClick: () => void;
}

export const ItemEditOnly: React.FC<ItemEditOnlyProps> = ({ items, onClick }) => {
     const db = dbFunc.startDb();
     console.log(
          "JSON of Items---------------------------",
          JSON.stringify(items)
     );
     const recents = db.getFirstSync(
          `SELECT * FROM recent_items WHERE New_Property_Number="${items.New_Property_Number}" AND Description="${dbFunc.quoter(items.Description)}";`
     );

     console.log("Recent DB Item Entry: ---------------------------------"+JSON.stringify(recents));
     return (
          <>
          {console.log("Item Entry: -----------"+JSON.stringify(items))}
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
                    { (!recents || recents===null) && <>
                    <Text style={cardstyle.textStyle}>
                         Condition: {items.Condition}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Remarks: {items.Remarks}
                    </Text>
                    </>}
                    { (recents!==null || recents) && <>
                    <Text style={cardstyle.textStyle}>
                         Condition: {recents.Condition}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Remarks: {recents.Remarks}
                    </Text>
                    </>}
                    
                    <Button
                         title="edit"
                         onPress={() => {
                              if (recents) {
                                   router.push({
                                       pathname: `/itemview/recent/${items.New_Property_Number}`,
                                       params: {desc: `${items.Description}`}
                                   });
                              } else {
                                   router.push({
                                        pathname: `/itemview/${items.New_Property_Number}`,
                                        params: {desc: `${items.Description}`}
                                    });
                              }
                         }}
                    ></Button>
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
export default ItemEditOnly;
