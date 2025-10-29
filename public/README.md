# ⚽ Soccer Knockout Challenge 2025 – Team Registration Website

A modern, responsive one-page website for **Soccer Knockout Challenge 2025**, built using **HTML, CSS (Bootstrap)**, and **JavaScript**.  
It features an interactive **team registration modal form** that automatically stores all registrations in **Google Sheets** using **Google Apps Script** — no backend server required.

---

## 🚀 Features

- 🎨 **Bootstrap-based responsive design**
- 🧑‍🤝‍🧑 **Team Registration Modal Form**
- 🔗 **Google Sheets Integration** (via Apps Script)
- ⏰ **Automatic timestamping** in Google Sheets
- 🧾 **Easily customizable** for any college or sports event

---

## 🧩 Technologies Used

| Technology | Purpose |
|-------------|----------|
| HTML5 | Page structure |
| CSS3 / Bootstrap 5 | Styling & layout |
| JavaScript (ES6) | Form submission & animations |
| Google Apps Script | Backend logic |
| Google Sheets | Database for storing submissions |

---

## 🧠 Google Sheets Integration – Step-by-Step

### 1️⃣ Create a Google Sheet
1. Go to Google Sheets → Create a new sheet  
2. Add this header row:
### 2️⃣ Add Google Apps Script

1. In your Google Sheet → **Extensions → Apps Script**
2. Paste this code:
   function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.team_name,
    data.college_name,
    data.captain_name,
    data.contact,
    data.email,
    data.players
  ]);

  return ContentService.createTextOutput("Success");
}


Click Deploy → New Deployment

Select Web app

Under settings:

Execute as: Me

Who has access: Anyone

 Copy your Web App URL
Inside your JavaScript

