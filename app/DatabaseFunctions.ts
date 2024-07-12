import Papa from "papaparse";
import * as SQLite from "expo-sqlite";

export const startDb = () =>{
    const db = SQLite.openDatabaseSync('test.db'); 
    return db
}

export const initDb = async () => {
    const db = startDb();
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS item (Article_Item TEXT,
        Description TEXT,
        Old_Property_Number TEXT,
        New_Property_Number TEXT,
        Unit_of_Measure TEXT,
        Unit_Value TEXT,
        Quantity_per_Property_Card TEXT,
        Quantity_per_Physical_Count TEXT,
        Location_Whereabouts TEXT,
        Condition TEXT,
        Remarks TEXT,
        PRIMARY KEY (New_Property_Number, Description)
        );
        CREATE TABLE IF NOT EXISTS recent_items (Article_Item TEXT,
        Description TEXT,
        Old_Property_Number TEXT,
        New_Property_Number TEXT,
        Unit_of_Measure TEXT,
        Unit_Value TEXT,
        Quantity_per_Property_Card TEXT,
        Quantity_per_Physical_Count TEXT,
        Location_Whereabouts TEXT,
        Condition TEXT,
        Remarks TEXT,
        PRIMARY KEY (New_Property_Number, Description)
        );
        `);
};

export function escapeQuotes(inputString:any) {
    if (typeof inputString !== 'string') {
        throw new Error('Input should be a string');
    }

    // Use regex to find all occurrences of double quotes and single quotes inside the string and escape them with a backslash
    // return inputString.replace(/(?<!\\)"/g, '\\"').replace(/'/g, "\\'");
    let changedString = inputString.split("\"").join("\\\"");
    let finalString = changedString.split("\'").join("\\\'");
    return finalString
}


export const quoter = (stringy: string) => {
    return stringy.replace("'","''").replace('"', '""');
}

export function escapeSingleQuotes(input) {
    return input.replace(/'/g, "\\'");
}

export function toTemplateLiteral(input) {
    const escapedInput = escapeSingleQuotes(input);
    return `\`${escapedInput}\``;
}

export const insertDataDbSingle = (
    articleItem: string,
    Desc: string,
    Old_Prop_Num: string,
    New_Prop_Num: string,
    Unit_of_Measure: string,
    Unit_Value: string,
    Quantity_per_Property_Card: string,
    Quantity_per_Physical_Count: string,
    Location_Whereabouts: string,
    Condition: string,
    Remarks: string
) => {
    const db = startDb();
    // let editedDesc = escapeQuotes(`${Desc}`);
    // console.log(editedDesc)
    db.execSync(`INSERT INTO item (
              Article_Item,
              Description,
              Old_Property_Number,
              New_Property_Number,
              Unit_of_Measure,
              Unit_Value,
              Quantity_per_Property_Card,
              Quantity_per_Physical_Count,
              Location_Whereabouts,
              Condition,
              Remarks
          )
          VALUES (
              "${articleItem}",
              "${Desc}",
              "${Old_Prop_Num}",
              "${New_Prop_Num}",
              "${Unit_of_Measure}",
              "${Unit_Value}",
              "${Quantity_per_Property_Card}",
              "${Quantity_per_Physical_Count}",
              "${Location_Whereabouts}",
              "${Condition}",
              "${Remarks}"
          );`);
};

export const insertToRecent = (
    articleItem: string,
    Desc: string,
    Old_Prop_Num: string,
    New_Prop_Num: string,
    Unit_of_Measure: string,
    Unit_Value: string,
    Quantity_per_Property_Card: string,
    Quantity_per_Physical_Count: string,
    Location_Whereabouts: string,
    Condition: string,
    Remarks: string
) => {
    const db = startDb();
    let editedDesc = escapeQuotes(`${Desc}`);
    console.log(editedDesc)
    db.runSync(`INSERT INTO recent_items (
              Article_Item,
              Description,
              Old_Property_Number,
              New_Property_Number,
              Unit_of_Measure,
              Unit_Value,
              Quantity_per_Property_Card,
              Quantity_per_Physical_Count,
              Location_Whereabouts,
              Condition,
              Remarks
          )
          VALUES (
              "${articleItem}",
              $desc,
              "${Old_Prop_Num}",
              "${New_Prop_Num}",
              "${Unit_of_Measure}",
              "${Unit_Value}",
              "${Quantity_per_Property_Card}",
              "${Quantity_per_Physical_Count}",
              "${Location_Whereabouts}",
              "${Condition}",
              "${Remarks}"
          );`,{$desc:`${Desc}`});
};

export const updateRecentTable = (
    articleItem: string,
    Desc: string,
    Old_Prop_Num: string,
    New_Prop_Num: string,
    Unit_of_Measure: string,
    Unit_Value: string,
    Quantity_per_Property_Card: string,
    Quantity_per_Physical_Count: string,
    Location_Whereabouts: string,
    Condition: string,
    Remarks: string
) => {
    const db = startDb();
    db.runSync(`UPDATE recent_items
              SET
              Article_Item = $Article_Item,
              Old_Property_Number = $Old_Prop_Num,
              Unit_of_Measure = $Unit_of_Measure,
              Unit_Value = $Unit_Value,
              Quantity_per_Property_Card = $Quantity_per_Property_Card,
              Quantity_per_Physical_Count = $Quantity_per_Physical_Count,
              Location_Whereabouts = $Location_Whereabouts,
              Condition = $Condition,
              Remarks = $Remarks
          WHERE New_Property_Number = $New_Prop_Num AND Description = $desc;`, 
          {$Article_Item: `${articleItem}`,
          $desc: `${Desc}`,
        $Old_Prop_Num: `${Old_Prop_Num}`,
        $New_Prop_Num: `${New_Prop_Num}`,
        $Unit_of_Measure: `${Unit_of_Measure}`,
        $Unit_Value: `${Unit_Value}`,
        $Quantity_per_Property_Card: `${Quantity_per_Property_Card}`,
        $Quantity_per_Physical_Count: `${Quantity_per_Physical_Count}`,
        $Location_Whereabouts: `${Location_Whereabouts}`,
        $Condition: `${Condition}`,
        $Remarks: `${Remarks}`});
}; 
// ! TODO: Update this statement to include the item description

export const sqlToCsv = async () => {
   const db = startDb();
    const allData = await db.getAllSync(`SELECT * FROM item`);
    var csv = Papa.unparse(allData);
};

export const deleteItem = (id:any, desc:any) => {
    const db = startDb();
    console.log(id,desc)
    db.runSync(`DELETE FROM recent_items WHERE New_Property_Number= $id AND Description= $desc`, {$id: `${id}`,$desc : `${desc}`})
}