import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import * as dbFunc from "../DatabaseFunctions";
import { router } from "expo-router";
import Button  from "../styled-components/FullWidthWhiteButton";

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
     const recents = db.getFirstSync(
          `SELECT * FROM recent_items WHERE New_Property_Number= $npm AND Description= $desc;`,
          {$npm:`${items.New_Property_Number}`,$desc:`${items.Description}`}
     );
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
                    { (!recents || recents===null) && <>
                    <Text style={cardstyle.textStyle}>Recents is null {JSON.stringify(recents)}</Text>
                    <Text style={cardstyle.textStyle}>
                         Condition: {items.Condition}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Remarks: {items.Remarks}
                    </Text>
                    </>}
                    { (recents!==null || recents) && <>
                         <Text style={cardstyle.textStyle}>Recents is not null</Text>
                    <Text style={cardstyle.textStyle}>
                         Condition: {recents.Condition}
                    </Text>
                    <Text style={cardstyle.textStyle}>
                         Remarks: {recents.Remarks}
                    </Text>
                    </>}
                    
                    <Button
                         title="Edit"
                         onPress={() => {
                              // console.log("Recents is (ItemEdit Only) :"+JSON.stringify(recents))
                              if (recents) {
                                   router.push({
                                       pathname: `/itemview/recent/${items.New_Property_Number}`,
                                       params: {desc: `${recents.Description}`}
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
