import pandas as pd
import numpy as np


# rename fields
# {field_in_excel: program_compatible_field_name}
df = pd.read_csv('Master-List-of-PPEs-for-CBK-HEPPs.xlsx - Botocan.csv', skiprows = 8, skipfooter=10)
db_fields = {'Article / Item': 'Article_Item',
            'Old Property No. assigned': 'Old_Property_Number',
             'New Property No. assigned (To be filled up during validation)': 'New_Property_Number',
             'Unit of Measure': 'Unit_of_Measure',
             ' Unit  Value': 'Unit_Value',
             'Quantity per Property Card': 'Quantity_per_Property_Card',
             'Quantity per Physical Count': 'Quantity_per_Physical_Count',
             'Location / Whereabouts': 'Location_Whereabouts',
            }    
df.rename(columns= db_fields, inplace=True)

# ignore all without property numbers
df = df.dropna(subset=['New_Property_Number'])
df = df.fillna("")

file_name = input("Name the exported file: ")
df.to_csv(file_name)