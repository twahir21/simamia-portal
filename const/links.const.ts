const isPrd = true;

export const SERVER_LINK = isPrd ? 
    'https://simamia.co.tz' 
    : 'http://localhost:3000';


export const PHONE_SUPPORT = "+255 798 700 900"
export const PHONE_LINK = "tel:+255798700900"

export const BRIQ_SMS_LINK = 'https://karibu.briq.tz/v1/message/send-instant';

// how to get direct download from google drive
/* 
1. format of given link is https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view?usp=sharing
this link is marked shared and to everyone but opens google drive preview page

2. reset and do in a format of https://drive.google.com/uc?export=download&id=YOUR_FILE_ID where 
file id here is 1A2B3C4D5E6F7G8H9I0J
*/

// host them in github for simpler and reliable way

export const APK_VERSION = "1.1.2"

export const APK_LINK = "https://github.com/twahir21/simamia_apk/releases/download/v1.1.2/simamia.apk"