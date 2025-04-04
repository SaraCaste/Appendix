# 4. Application Implementation

## 4.1	Data Donation Platform (DDP)
The Data Donation Platform was developed as a web application using React.js for the frontend along with Bootstrap library for the User Interface, which provides a clear and simple design framework. For the backend, the platform uses Supabase, an open-source backend-as-a-service (BaaS) platform to handle file storage. For Supabase, the free version of this tool is used, which comes with some restrictions like limiting to 1GB of file storage. However, researchers that want to use the DDP are encouraged to choose their preferred storage solution and modify the code to fit the new tool.

- Keep Supabase as Storage solution
In Appendix A/data-donation-platform/src the file SupabaseClient.jsx contains the credentials to connect with Supabase and that account is the one that receives the Loyalty Card data files that are donated. Adjust this file with your Supabase credentials.

See Supabase plans and restrictions: https://supabase.com/pricing

- Use another Storage solution
In Appendix A/data-donation-platform/src the file Donation.jsx adjust the following:
  - Eliminate Supabase credentials 
  https://github.com/SaraCaste/Appendix/blob/8e3c6388d257ae4b61b5d98e478c5f9b03f27286/Appendix%20A/data-donation-platform/src/Donation.jsx#L2 
  - Change the uploadFileSupabase() arrow function for a fuction that aligns with your Storage solution. 
  https://github.com/SaraCaste/Appendix/blob/6b6661e31ccd9f55616992bdae41322432830887/Appendix%20A/data-donation-platform/src/Donation.jsx#L135C9-L135C27
  - Update the call to the uploadFileSupabase() arrow function
  https://github.com/SaraCaste/Appendix/blob/6b6661e31ccd9f55616992bdae41322432830887/Appendix%20A/data-donation-platform/src/Donation.jsx#L253
