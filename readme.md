# Invoice Maker
This is a simple pet project that generates invoices for me. As I haven't found a free invoice generation service I have decided to build it by myself. I have build a golang container that runs on a NAS in my living room and listens to the events on GCP Pubusub, generates a PDF and stores it to the users storage. 

TODO:
    -  set storate rules  
    -  move pubsub handling from main.go
    -  generate invoice from data from databaase
    -  store pdf from invoice creating service to storage  
    -  fix invoices displayment on invoices page
    -  add separate button for invoice generation and downloading
    -  implement date picker inside invoice form
    -  implement invoice generation quota per day
    -  work on fields positioning inside the invoice form
    -  add total field to invoice form

