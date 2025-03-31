# Installation of the Data Enriching Platform

## Data Matching Module
### Windows
1. Pre-requisites:
  - Install [Node.js (+ npm)](https://nodejs.org/en/download)
  - Install [Git](https://git-scm.com/downloads/win)
  - Install [Python](https://www.python.org/downloads/)
  - Install [Chrome](https://www.google.com/chrome/)

In Windows PowerShell: 
2. Clone this repository
   ```sh
   git clone https://github.com/SaraCaste/data-enriching-platform
   cd data-enriching-platform
   cd data-matching-module
   ```
3. Inside the Data Matching Module install dependencies
   ```sh
   npm run install-all
   ```
4. Create a virtual environment inside the backend folder and install project requirements
   ```sh
   cd backend
   python -m venv venv
   pip install -r requirements.txt
   ```
5. Run the app in the root folder
   ```sh
   cd ..
   npm run start
   ```
6. Follow instructions and enrich the data!

### Linux 
