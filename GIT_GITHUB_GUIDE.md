# Git & GitHub Submission Guide

## 1. Install and configure Git
Download Git from https://git-scm.com/downloads and install it. Open VS Code Terminal in the project folder.

Run these commands once on your computer (use your own GitHub name/email):
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 2. Initialize and commit the project
Run each command from the project folder:
```bash
git init
git status
git add .
git status
git commit -m "Initial commit: add PennyWise project structure"
```

After making a meaningful improvement, commit again:
```bash
git add .
git commit -m "Build responsive dashboard layout"
git add .
git commit -m "Add transaction management and validation"
git add .
git commit -m "Add search filters and spending chart"
git add .
git commit -m "Prepare project documentation"
git log --oneline
```
Do not create fake commit history. These commits should be made as you actually complete the corresponding work.

## 3. Create a GitHub repository
1. Sign in at https://github.com.
2. Click **New repository**.
3. Repository name: `pennywise-expense-tracker`
4. Choose **Public**.
5. Do not initialize with a README (this project already has one).
6. Create the repository.

## 4. Connect and push
Copy the HTTPS repository URL shown by GitHub, then run (replace the example URL):
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pennywise-expense-tracker.git
git push -u origin main
```
If Git says `origin` already exists, use:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/pennywise-expense-tracker.git
git push -u origin main
```

## 5. Publish with GitHub Pages
1. Open the repository on GitHub.
2. Select **Settings → Pages**.
3. Set Source to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait for deployment, then open the published URL shown on the Pages screen.

## 6. Final checks
- Open the live URL on desktop and mobile.
- Add one income and two expenses.
- Check totals, category chart, edit, delete, search and filters.
- Refresh the page and confirm localStorage retains entries.
- Confirm no broken links or missing files.
- Capture actual screenshots and add them to `screenshots/`.
- Update the repository and live links in `PROJECT_REPORT.md`.
