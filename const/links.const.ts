const isPrd = true;

export const SERVER_LINK = isPrd ? 
    'https://simamia.co.tz' 
    : 'http://localhost:3000';

// how to get direct download from google drive
/* 
1. format of given link is https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view?usp=sharing
this link is marked shared and to everyone but opens google drive preview page

2. reset and do in a format of https://drive.google.com/uc?export=download&id=YOUR_FILE_ID where 
file id here is 1A2B3C4D5E6F7G8H9I0J
*/

export const APK_LINK = "/"