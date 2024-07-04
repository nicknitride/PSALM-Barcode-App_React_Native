import { View, Text } from "react-native";
import Button from "./Button";

interface Items {
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
}

export default function ItemCard(items: Items) {
     return (
          <>
               <View>
                    <Text>{items.Article_Item}</Text>
                    <Text>{items.Description}</Text>
                    <Text>{items.Old_Property_Number}</Text>
                    <Text>{items.New_Property_Number}</Text>
                    <Button
                    title="Edit"></Button>
                    <Button title="Delete"></Button>
               </View>
          </>
     );
}
