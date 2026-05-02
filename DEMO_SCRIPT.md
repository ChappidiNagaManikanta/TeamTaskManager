# Team Task Manager - Demo Video Script (2-5 minutes)

**[0:00 - 0:30] Introduction**
*Visual: Show the login screen of the application.*
"Hello everyone, today I'll be demonstrating the Team Task Manager application. This is a full-stack web application built with React.js for the frontend, Spring Boot for the backend API, and a MySQL database. It features secure JWT authentication and role-based access control for Admins and Team Members."

**[0:30 - 1:15] Admin Registration & Dashboard**
*Visual: Click "Register here", fill out the form, select "Administrator" role, and submit.*
"First, let's register a new Administrator account. Once we log in, we are greeted by the Admin Dashboard. Here, we can see a quick overview of our statistics: total projects, total tasks, and how many tasks are pending, in progress, completed, or overdue."

**[1:15 - 2:15] Managing Projects & Tasks (Admin View)**
*Visual: Navigate to the "Projects" tab. Click "Add Project" and fill out the form.*
"As an Admin, I have full control over projects. Let's create a new 'Website Redesign' project. Now that it's created, let's head over to the 'Tasks' tab."
*Visual: Navigate to "Tasks". Click "Add Task". Assign it to a project and an assignee (if another user exists).*
"Here I can assign tasks to my team members. I'll create a task called 'Design Mockups', assign it to the 'Website Redesign' project, set the priority to High, and pick a due date."

**[2:15 - 3:15] Member View & Updating Status**
*Visual: Log out. Register/Login as a "Team Member".*
"Now, let's switch perspectives. I'm logging in as a Team Member who was just assigned that task. My dashboard only shows the data relevant to me. When I go to my Tasks, I see 'Design Mockups'."
*Visual: Show the Member Tasks view. Change the status dropdown from 'Pending' to 'In Progress'.*
"Members cannot edit the full task details, but they can update their progress. I'll change the status from 'Pending' to 'In Progress'. This updates the database instantly via the REST API."

**[3:15 - 4:00] Technical Overview & Conclusion**
*Visual: Show the code in VS Code briefly (e.g., Spring Security Config or React Router).*
"Under the hood, the Spring Boot backend secures all endpoints using a custom JWT Authentication Filter. The React frontend uses Axios interceptors to automatically attach this token to every request. Passwords are securely hashed in MySQL using BCrypt.
This application is clean, responsive, and ready to be deployed to platforms like Railway. Thank you for watching!"
