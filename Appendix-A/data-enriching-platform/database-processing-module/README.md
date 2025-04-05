# 4	Application Implementation 
## 4.2	Data Enriching Platform (DEP)
### 4.2.1	Database Processing Module (DPM)
(...) This module can be programmed to run automatically on a local machine, or it can be runed when the researcher considers it useful. After running it, it uploads the cleaned and updated OFF database to Supabase, where it is always available for use. By running periodically, the module ensures that the product information is not deprecated. For updating the storage solution or the Supabase access information see the following options:

Options:

- Keep Supabase as Storage solution <br/>
  - In Appendix-A/data-enriching-platform/database-processing-module the file updateOFF.py contains the credentials to connect with Supabase. Currently that account is the one that receives the updated Open Food Facts database. Adjust this file with your Supabase credentials.
https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L50-L51
  - Currently, the bucket that receives the updated Open Food Facts database is called "Database Processing Module". In case you switch this, update it.
s


See Supabase plans and restrictions: https://supabase.com/pricing

- Use another Storage solution <br/>
In Appendix-A/data-enriching-platform/database-processing-module the file updateOFF.py 
  - Eliminate Supabase import
  https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L4 
  - Change this code for one that aligns with your Storage solution. 
https://github.com/SaraCaste/Appendix/blob/0b8fcf0ef629096232f3029c8cf32e9fa7f21678/Appendix-A/data-enriching-platform/database-processing-module/updateOFF.py#L46-L82








