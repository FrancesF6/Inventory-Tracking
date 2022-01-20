Author: Frances F

# Purpose
 - This web application provides the user with functionalities to create inventory items, edit them, delete them, view the list of them, and also allows the user to filter items based on name, the range of cost, or the range of stock.


# STEP 1 - initialize required frameworks

## 1-1 download and install Node.js and npm
 - Go to https://nodejs.org/en and download Node.js version 16.x, then install with all default options.
 - Once installed, open a shell / PowerShell in the working directory (the folder that you find this file), type `node -v`, if you have seen `v16.x`, then type `npm -v`, if you have seen `7.x`, then Node.js and npm have been installed successfully.

## 1-2 download and install MongoDB
 - Go to https://www.mongodb.com/try/download/community and download MongoDB Community Server, then install with all default options except for Install MongoD as a Service (uncheck it).

## 1-3 check environment path settings
 - Find the setting `Edit the system environment variables`, click `Advanced` navbar, then click the `Environment Variables` button (at the bottom), in the box of `System variables`, find a variable named `Path` and `Edit` it, then check if the entries below are in the list (if not, add the corresponding paths):
 <custom_locations>\nodejs\
 <custom_locations>\MongoDB\Server\<verison_number>\bin
 
*Here <custom_locations> refers to the location that you chose to install the softwares, often in Windows it can be something like `C:\Program Files`*


# STEP 2 - start and initialize database with sample data

## 2-1 run the Mongo daemon
 - In this folder, create an empty folder "database", then type the command in the shell / PowerShell: `mongod --dbpath=database`

## 2-2 initialize the database
 - Open another shell / PowerShell, run the command: `npm i`
 - Once the process is done, run the command: `npm run dbinit`
 - Once it said `8 inventory data added.`, the database has been successfully initialized with 8 pieces of data.


# STEP 3 - start the server
 - run the command in shell / PowerShell: `npm start`
 - When it shows `Server listening at port 3000`, the server starts successfully.


# STEP 4 - test the functionalities

 ## Test support for viewing a list of inventory items
 - Open a browser and go to `http://localhost:3000/`. Click "Search", all the inventory items will be listed.

 ## Test support for filtering items
 - Input query information in the form above the "Search" button, then only matched items will be listed on the page.

 ## Test support for editing an inventory item
 - Click any of the item in the list, there will be a form for editing the information of this item. Modify it and click "Save", the modified data will be saved in the server / database.

 ## Test support for creating a new inventory item
 - At the bottom of the page of url `http://localhost:3000/`, there is a form for the information of a new item. Input some data, then click "Submit", and the data will be saved to the server / database. The browser will redirect automatically to the page of the newly created item.

 ## Test support for deleting an inventory item
 - On the webpage of a specific inventory item, click the "Delete" button then "confirm", the item will be deleted from the server / database.
