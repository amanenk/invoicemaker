# Invoice Maker
This is a simple pet project that generates invoices for me. As I haven't found a free invoice generation service I have decided to build it by myself. I have build a golang container that runs on a NAS in my living room and listens to the events on GCP Pubusub, generates a PDF and stores it to the users storage. 

TODO:
    -  set database rules  
    -  set storate rules  
    -  build invoice creation page  
    -  build my invoices page  
    -  store pdf from invoice creating service to storage  
    -  use Cloud Firestore  