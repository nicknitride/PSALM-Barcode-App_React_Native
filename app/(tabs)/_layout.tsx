import {Tabs} from "expo-router"

export default () =>{
    return(
        <Tabs>
            <Tabs.Screen name="Home"></Tabs.Screen>
            <Tabs.Screen name="InventoryList" options={{title:"Inventory"}}/>
        </Tabs>
    );
}