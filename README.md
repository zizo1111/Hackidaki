# Hackidaki
This repository contains the source code related to the SulliOne chrome extension
which uses tools to combat hate speech in the webpages you enter.

It will hide messages and images that contain hate speech and will also identify it in messages you write

It contains to parts:
 + Frontend: The code for the extension, in Javascript, html and css.
 + Backend: the code that analyzes the text to find if it contains hate speech
   and an api to communicate with the frontend. Written in python.


# How to Install

## Backend
Enter the backend folder
``` sh
python -m venv venv
source venv/activate.sh
pip install -r requirements.txt
python censor_server/server.py
```

The api will be running on ```http://127.0.0.1:5000/api```

## Frontend

 + Go to ```chrome://extensions/```
 + Activate developer mode
 + Click Load Unpacked and select the frontend folder
 
 Your chrome extension should be activated and will work autimatically the next
 time you open a webpage (e.g. Twitter). 


