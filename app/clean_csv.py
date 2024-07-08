import pandas as pd

csv_file ='Master-List-of-PPEs-for-CBK-HEPPs.xlsx - Botocan.csv' # put csv file here
"""
csv_file must either be:
* a path to a file (a str, pathlib.Path, or py:py._path.local.LocalPath)
* URL (including http, ftp, and S3 locations)
* any object with a read() method (such as an open file or StringIO).
"""

# creates DataFrame object, ignoring PSALM template header and footer
df = pd.read_csv(csv_file, skiprows = 8, skipfooter=10)
db_fields = {'Article / Item': 'Article_Item',
            'Old Property No. assigned': 'Old_Property_Number',
             'New Property No. assigned (To be filled up during validation)': 'New_Property_Number',
             'Unit of Measure': 'Unit_of_Measure',
             'Unit Value': 'Unit_Value',
             'Quantity per Property Card': 'Quantity_per_Property_Card',
             'Quantity per Physical Count': 'Quantity_per_Physical_Count',
             'Location / Whereabouts': 'Location_Whereabouts',
            }
df.rename(columns= db_fields, inplace=True)
last = ""
def fill_empty_property_number(row):
    if row['Article_Item'] == 'MAIN POWER HOUSE':
        return last
    else:
        last = row['New_Property_Number']
        return last  # Otherwise, return the current value of column 'A'
df['New_Property_Number'] = df.apply(fill_empty_property_number, axis=1)
df.to_csv(csv_file, index=False)