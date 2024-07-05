TO-DO LIST:
-    Camera Screen
     -    (itemview/[id].tsx)
     -    add a db query (TABLE item) that retrieves the info based on the scanned id
     -    create a form to edit the scanned info
     -    submit button should save to TABLE recently_scanned
          -    should redirect user to PAGE home
-    Inventory
     -    lists each recently_scanned item (clickable)
     -    Includes:
          -    article item, description, old + new id
          -    Edit/Delete Button
-    New Page
     -    Overview: Querys from TABLE recently_scanned (attached to clickable inventory items)
     -    Note: Edits the scanned items selected from TABLE recently_scanned
-    Import CSV
     -    note that Import CSV clears all tables in db
     -    Create separate button to clear recent items table
-    Export CSV
     -    replace the db being exported with TABLE recently_scanned
     -    modify export name to include date and time
-    GENERAL
     -    clean up UI
     -    create database function javascript page ✅
     -    initialize databases on app load (Home.tsx) ✅
Clarifications:
-    Dropdown menu for "Conditions"
-    Anything else needs to be edited

LIMITATIONS:
-    Import CSV is sensitive to property number. Lack of it breaks importing.



Get index of the last item with a property number
     actual_index = <actual index of the last item>
     counter = 0

     for every empty cell after:
          counter ++
     for (i=last_index; i<(last_index+counter);i++ ):
          index[i] = actual_index
     