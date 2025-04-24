# Welcome to the Appendix 
## Enriching Donated Supermarket Loyalty Card Data for Health and Sustainability Research.

### Structure 
Here you can see an overview of the structure of the Appendix with the most important files. Under the structure you can find the installation and adjustment guide for the Data Donation Platform and the Data Enriching Platform (Database Processing Module + Data Macthing Module).

```bash
├───Appendix-A
│   ├───data-donation-platform
│   │   ├───public
│   │   ├───src
│   │   │   ├───App.jsx
│   │   │   ├───Donation.jsx
│   │   │   └───SupabaseClient.jsx
│   │   └───package.json
│   └───data-enriching-platform
│       ├───data-matching-module
│       │   ├───backend
│       │   │   ├───app.py
│       │   │   └───requirements.txt
│       │   ├───frontend
│       │   │   ├───public
│       │   │   ├───src
│       │   │   │   ├───images
│       │   │   │   ├───App.jsx
│       │   │   │   └───Enricher.jsx             
│       │   │   └───package.json
│       │   └───package.json
│       ├───database-processing-module
│       │    └───updateOFF.py
└───README.md
```

# 4. Application Implementation

## 4.1	Data Donation Platform (DDP)
The Data Donation Platform was developed as a web application using React.js for the frontend along with Bootstrap library for the User Interface, which provides a clear and simple design framework. For the backend, the platform uses Supabase, an open-source backend-as-a-service (BaaS) platform to handle file storage. For Supabase, the free version of this tool is used, which comes with some restrictions like limiting to 1GB of file storage. However, researchers that want to use the DDP are encouraged to choose their preferred storage solution and modify the code to fit the new tool.

Options:

- Keep Supabase as Storage solution <br/>
  - In Appendix-A/data-donation-platform/src the file SupabaseClient.jsx contains the credentials to connect with Supabase. Currently that account is the one that receives the Loyalty Card data files that are donated. Adjust this file with your Supabase credentials. 
  - Currently, the bucket that receives the donated file is called "Data Donation Platform". In case you switch this, update it.
  https://github.com/SaraCaste/Appendix/blob/e3f6ba38134ebf485a789dfc117460891fc24273/Appendix-A/data-donation-platform/src/Donation.jsx#L152


See Supabase plans and restrictions: https://supabase.com/pricing

- Use another Storage solution <br/>
In Appendix-A/data-donation-platform/src in the file Donation.jsx adjust the following:
  - Eliminate Supabase credentials import
  https://github.com/SaraCaste/Appendix/blob/8e3c6388d257ae4b61b5d98e478c5f9b03f27286/Appendix%20A/data-donation-platform/src/Donation.jsx#L2 
  - Change the uploadFileSupabase() arrow function for a fuction that aligns with your Storage solution. 
  https://github.com/SaraCaste/Appendix/blob/6b6661e31ccd9f55616992bdae41322432830887/Appendix%20A/data-donation-platform/src/Donation.jsx#L135
  - Update the call to the uploadFileSupabase() arrow function
  https://github.com/SaraCaste/Appendix/blob/6b6661e31ccd9f55616992bdae41322432830887/Appendix%20A/data-donation-platform/src/Donation.jsx#L253

In case the structure of the loyalty card changes, please update the sheet descriptions:
https://github.com/SaraCaste/Appendix/blob/62b28c36324508b98e4456f9026d6043baa6a506/Appendix%20A/data-donation-platform/src/Donation.jsx#L73-L84

## 4.2	Data Enriching Platform (DEP)

### Installation of the Data Enriching Platform

#### Data Matching Module

##### Windows
Pre-requisites:
  - Install [Node.js (+ npm)](https://nodejs.org/en/download)
  - Install [Git](https://git-scm.com/downloads/win)
  - Install [Python](https://www.python.org/downloads/)
  - Install [Chrome](https://www.google.com/chrome/)
    
In Windows PowerShell:  

1. Clone this repository
   ```sh
   git clone https://github.com/SaraCaste/Appendix
   cd Appendix
   cd Appendix-A
   cd data-enriching-platform
   cd data-matching-module
   ```
2. Inside the Data Matching Module install dependencies
   ```sh
   npm run install-all
   ```
3. Create a virtual environment inside the backend folder and install project requirements
   ```sh
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. Run the app in the root folder
   ```sh
   cd ..
   npm run start
   ```
5. Follow instructions and enrich the data!

##### Linux 
Pre-requisites:
  - Install Node.js (+ npm)
    ```sh
    sudo apt update
    sudo apt install nodejs npm -y
    ```
  - Install Git
    ```sh
    sudo apt install git -y
    ```
  - Install Python
    ```sh
    sudo apt install python3 python3-pip python3-venv -y
    ```
  - Install [Chrome](https://www.google.com/chrome/)

In the Terminal:  

1. Clone this repository
   ```sh
   git clone https://github.com/SaraCaste/Appendix
   cd Appendix
   cd Appendix-A
   cd data-enriching-platform
   cd data-matching-module
   ```
2. Inside the Data Matching Module install dependencies
   ```sh
   npm run install-all
   ```
3. Create a virtual environment inside the backend folder and install project requirements
   ```sh
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Run the app in the root folder
   ```sh
   cd ..
   npm run start
   ```
5. Follow instructions and enrich the data!

##### macOS 
Pre-requisites:
  - Install Homebrew
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
  - Install Node.js (+ npm), Git and Python
    ```sh
    brew install node git python
    ```
  - Install [Chrome](https://www.google.com/chrome/)

In the Terminal:  

1. Clone this repository
   ```sh
   git clone https://github.com/SaraCaste/Appendix
   cd Appendix
   cd Appendix-A
   cd data-enriching-platform
   cd data-matching-module
   ```
2. Inside the Data Matching Module install dependencies
   ```sh
   npm run install-all
   ```
3. Create a virtual environment inside the backend folder and install project requirements
   ```sh
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Run the app in the root folder
   ```sh
   cd ..
   npm run start
   ```
5. Follow instructions and enrich the data!

#### Database Processing Module
Pre-requisites:
  - Install Python (according to your operating system, see [Data Matching Module section](#Data-Matching-Module))

1. Clone this repository
   ```sh
   git clone https://github.com/SaraCaste/Appendix
   cd Appendix
   cd Appendix-A
   cd data-enriching-platform
   cd database-processing-module
   ```

### 4.2.1	Database Processing Module (DPM)
(...) This module can be programmed to run automatically on a local machine, or it can be runed when the researcher considers it useful. After running it, it uploads the cleaned and updated OFF database to Supabase, where it is always available for use. By running periodically, the module ensures that the product information is not deprecated. For updating the storage solution or the Supabase access information see the following options:

Options:

- Keep Supabase as Storage solution <br/>
  - In Appendix-A/data-enriching-platform/database-processing-module the file updateOFF.py contains the credentials to connect with Supabase. Currently that account is the one that receives the updated Open Food Facts database. Adjust this file with your Supabase credentials.
https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L50-L51
  - Currently, the bucket that receives the updated Open Food Facts database is called "Database Processing Module". In case you switch this, update it.

See Supabase plans and restrictions: https://supabase.com/pricing

- Use another Storage solution <br/>
In Appendix-A/data-enriching-platform/database-processing-module the file updateOFF.py 
  - Eliminate Supabase import
  https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L4 
  - Change this code for one that aligns with your Storage solution. 
https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L46-L82

After updating credentials, open and run the [updateOFF.py](https://github.com/SaraCaste/data-enriching-platform/tree/main/database-processing-module) code in your prefered tool. But [Visual Studio Code](https://code.visualstudio.com/Download) is recomended for running, testing and adjusting.

In case the fields of the Open Food Facts database change, please update them.
  https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L9 

### 4.2.2 Data Matching Module (DMM)
The DDM is the core process in the matching and enriching of the data. It integrates React.js for the frontend and Python (Flask) for the backend. The Python backend processes the uploaded data, matches product information with Open Food Facts, and generates an enriched dataset that researchers can download. For database and storage, Supabase in its free version is used. However, choosing another storage solution is possible and researchers that want to use the DMM can adjust it.

Options:

- Keep Supabase as Storage solution <br/>
  - In Appendix-A/data-enriching-platform/data-matching-module the file app.py contains the credentials to connect with Supabase. Currently that account is the one that receives the updated Open Food Facts database and therefore, the one the DMM uses to download it. Adjust this file with your Supabase credentials.
  https://github.com/SaraCaste/Appendix/blob/e3f6ba38134ebf485a789dfc117460891fc24273/Appendix-A/data-enriching-platform/data-matching-module/backend/app.py#L21-L22
  - Currently, the bucket that receives the updated Open Food Facts database is called "Database Processing Module". In case you switched this in the Database Processing Module, update it.
  https://github.com/SaraCaste/Appendix/blob/a15df562477479122909268ee438dd8bf7bc5ffa/Appendix-A/data-enriching-platform/data-matching-module/backend/app.py#L23

See Supabase plans and restrictions: https://supabase.com/pricing

- Use another Storage solution <br/>
In Appendix-A/data-enriching-platform/data-matching-module in the file app.py 
  - Eliminate Supabase import
  https://github.com/SaraCaste/Appendix/blob/e3f6ba38134ebf485a789dfc117460891fc24273/Appendix-A/data-enriching-platform/data-matching-module/backend/app.py#L9
  - Change this code for one that aligns with your Storage solution. 
https://github.com/SaraCaste/Appendix/blob/e3f6ba38134ebf485a789dfc117460891fc24273/Appendix-A/data-enriching-platform/data-matching-module/backend/app.py#L17-L69
  - Adjust the function
  https://github.com/SaraCaste/Appendix/blob/a15df562477479122909268ee438dd8bf7bc5ffa/Appendix-A/data-enriching-platform/data-matching-module/backend/app.py#L149

In case the fields of the loyalty card need to be updated, change the following line, and update the name callings of the variables:
https://github.com/SaraCaste/Appendix/blob/62b28c36324508b98e4456f9026d6043baa6a506/Appendix-A/data-enriching-platform/data-matching-module/backend/app.py#L159-L160




