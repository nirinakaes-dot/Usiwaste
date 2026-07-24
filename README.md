# Usiwaste
## 📌 GitHub Workflow
### Branches
- main → production-ready code (final submission - all contributors must approve it)
- development → integration branch (at least one contributor must approve)
- feature/* → individual features
### How to work
📌 1. Pick a task from Trello

Each contributor selects a task assigned to them.

📥 2. Sync with latest development
```bash
git checkout development
git pull origin development
```
👉 This ensures you start from the latest stable code.

🌿 3. Create a feature branch
git checkout -b feature/feature-name

Example:
```bash
feature/auth-login
feature/event-crud
```
💻 4. Work on the feature

Make changes normally.

💾 5. Commit changes
```bash
git add .
git commit -m "Add feature description"
```
🔄 6. Keep feature branch updated 

Instead of pulling development directly into feature randomly, do:
```bash
git checkout development
git pull origin development

git checkout feature/feature-name
git merge development
```
🚀 7. Push feature branch
```bash
git push origin feature/feature-name
```
🔁 8. Create Pull Request (PR)
```
Base branch: development
Compare branch: feature/feature-name
```

👀 9. Code review process
Reviewer checks:
- code quality
- bugs
- structure
- naming conventions
Scrum Master or teammate approves
✅ 10. Merge into development
```
feature/* → development
```
🚀 11. Final release

When everything is complete:
```
development → main
```
