# 4	Application Implementation 
## 4.2	Data Enriching Platform (DEP)
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







