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
        New_Property_Number TEXT PRIMARY KEY,
        Unit_of_Measure TEXT,
        Unit_Value TEXT,
        Quantity_per_Property_Card TEXT,
        Quantity_per_Physical_Count TEXT,
        Location_Whereabouts TEXT,
        Condition TEXT,
        Remarks TEXT
        );
        CREATE TABLE IF NOT EXISTS recent_items (Article_Item TEXT,
        Description TEXT,
        Old_Property_Number TEXT,
        New_Property_Number TEXT PRIMARY KEY,
        Unit_of_Measure TEXT,
        Unit_Value TEXT,
        Quantity_per_Property_Card TEXT,
        Quantity_per_Physical_Count TEXT,
        Location_Whereabouts TEXT,
        Condition TEXT,
        Remarks TEXT
        );
        `);
};

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

export const sqlToCsv = async () => {
   const db = startDb();
    const allData = await db.getAllSync(`SELECT * FROM item`);
    var csv = Papa.unparse(allData);
};