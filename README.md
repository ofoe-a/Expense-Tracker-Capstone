# Expense Tracker App

A simple and responsive web application built with **React**, **Vite**, and **Tailwind CSS** that helps users record, categorize, and manage daily expenses.  
The app stores all data locally in the browser, making it fast, private, and easy to use without any backend setup.

---

## Features

- **Add, Edit, and Delete Expenses:**  
  Track spending by entering a title, amount, category, date, and optional notes.

- **Summary Overview:**  
  Displays total spending, number of entries, and top spending categories dynamically.

- **Search and Filter:**  
  Filter expenses by category or search by title/note in real time.

- **Local Storage Persistence:**  
  All expense data is saved automatically in the browser and remains even after page reloads.

- **Responsive Design:**  
  The layout adjusts seamlessly across desktop, tablet, and mobile devices.

- **Live Exchange Rate (Bonus Feature, still working on this):**  
  Optionally fetches the latest exchange rate data (e.g., USD to GHS).  
  If unavailable, a clear error message is displayed.

---

## Tech

- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect)
- **Data Storage:** LocalStorage
- **API:** Exchange Rate API (for live rate updates)

---

---

## How to Run the Project

1. Clone the repository:
    git clone https://github.com/ofoe-a/Expense-Tracker-Capstone.git

2. Navigate into the folder:
    cd Expense-Tracker-Capstone

3. Install Dependencies:
    npm install

4. Start the development server:
    npm run dev

5. Open the app in your browser at: 
    http://localhost:5173

## How it Works 
    1. Users can add expense entries with a title, amount, date, and category.
	2. Each entry is stored in the browser’s local storage.
	3. The summary section updates automatically to reflect total spend and category breakdowns.
	4. Expenses can be searched, edited, or deleted at any time.
	5. The app works offline and loads instantly on future visits.

## Future Improvements
    1. Fixing exchange rate to pick directly from live sources 
    2. Visual representation of expenditure 
    3. AI Integration of how expenditure 