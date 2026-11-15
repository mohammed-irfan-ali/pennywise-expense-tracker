# PennyWise – Personal Expense Tracker
**Final Web Development Project | InternNova Internship**  
**Student:** Mohammed Irfan Ali  
**Repository:** [Add your public GitHub repository URL]  
**Live Website:** [Add your GitHub Pages URL]

## Project Objective
The objective of PennyWise is to develop a responsive and interactive personal finance website using the HTML, CSS and JavaScript concepts learned during the six-week web development internship. The application helps users record daily income and expenses and understand their spending habits through a simple dashboard.

## Project Overview
PennyWise is designed for students and individuals who want to manage everyday money activity. The website provides a dashboard containing total balance, total income, total expenses and transaction count. Users can record each transaction with a description, amount, type, category and date. The interface is organized into a transaction form, spending overview and transaction history. The layout adjusts to desktop, tablet and mobile screen sizes.

## Technologies Used
HTML5 is used to create the semantic page structure and form elements. CSS3 is used for colors, spacing, typography, the box model, Flexbox, Grid and media queries. JavaScript is used to validate form data, store transactions, calculate totals and update the page dynamically. Browser localStorage is used to retain data after refreshing the page.

## Main Features
1. Add income and expense records with category and date.
2. Edit or delete existing transactions.
3. Automatically calculate balance, income and expenses.
4. Search records by description.
5. Filter records by type and category.
6. Display a category-wise expense breakdown.
7. Save records in localStorage.
8. Responsive layout and mobile navigation.

## Challenges Faced and Solutions
One challenge was keeping the dashboard totals, transaction table and category chart updated whenever a record changed. I solved this by using separate JavaScript functions and calling a common render function after adding, editing or deleting a transaction. Another challenge was retaining data after a browser refresh. I used localStorage with JSON conversion to save and retrieve the transaction array. I also added input validation to prevent empty descriptions and invalid amounts.

## Key Learnings
Through this project, I practiced creating a complete webpage with semantic HTML and responsive CSS. I improved my understanding of JavaScript functions, arrays, objects, array methods, event listeners and DOM manipulation. I also learned how Git tracks file changes, how commits preserve project history, how GitHub stores a repository and how GitHub Pages can publish a static website. I understood why it is useful to save work in small commits instead of waiting until the end. Testing different screen sizes also helped me notice layout problems that are not obvious on a laptop.

## Future Improvements
Future versions could include monthly budget limits, downloadable CSV reports, additional charts, recurring transactions and cloud-based user accounts. I would also like to add a monthly comparison so users can understand whether their spending is increasing or decreasing over time.

## Screenshots
Insert actual screenshots of the running website in the `screenshots` folder and include them in the final PDF or repository.
