# Installation of the Data Enriching Platform

## Data Matching Module

### Windows
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

### Linux 
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

### macOS 
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

## Database Processing Module
Pre-requisites:
  - Install Python (according to your operating system, see [Data Matching Module section](#Data-Matching-Module)

1. Clone this repository
   ```sh
   git clone https://github.com/SaraCaste/Appendix/Appendix-A/data-enriching-platform
   cd data-enriching-platform
   cd database-processing-module
   ```

2. Open and run the [updateOFF.py](https://github.com/SaraCaste/data-enriching-platform/tree/main/database-processing-module) code in your prefered interface. But [Visual Studio Code](https://code.visualstudio.com/Download) is recomended for running, testing and adjusting.








