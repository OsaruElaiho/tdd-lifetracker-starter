📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

# Week 3 Assignment: Life Tracker

Submitted by: **Osaru Elaiho**

Deployed Application: [Lifetracker Deployed Site](https://harsh-top.surge.sh/E)

## Application Features

### Core Features

- [x] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [x] If the user is logged in, it should display a **Sign Out** button. 
  - [x] If no user is logged in, it should display **Login** and **Register** buttons
  - [x] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [x] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [x] **Login Page:** A form that allows users to login with email and password.
- [x] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [x] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [x] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [x] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [x] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [x] Deployed website with Heroku & Surge. 

**Detailed Activity Page:**
- [ ] The detailed activity page should display a feed of all previous tracked activities.
- [ ] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [ ] The activity tracked should be given a unique id for easy lookup.
  `TODO://` Add link to table schema in the link code below. Your file should end in `.sql` and show your schema for the detailed activities table. (🚫 Remove this paragraph after adding schema link)
  * [Table Schema](📝ADD LINK TO TABLE SCHEMA.sql HERE!) 

### Stretch Features

Implement any of the following features to improve the application:
- [ ] Each model (`nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource. Create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video
Week 4:
https://www.loom.com/share/49bede1c49b9418c9037d423043ae300

Week 5: 
https://www.loom.com/share/be3b899b4e124cd4b947483e395f3f1f

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete? 
    - The vaccine hub lab and the videos associated with it were extremely helpful in getting started on this project and making sure that I wasn't missing
    any important steps along the way. 

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
    - If I had more time, I would've spent longer reading and watching videos to supplement the material we covered in lab so that I would be even more         comfortable implenting them in the project.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?
    - I think my project demo went better than previous demos because I was more prepared and had more work to show. Although I was missing some core         features, I was still largely on track with other interns as far as the progress they had made so far.

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

- TA Roy, Daniel Jonas, & Hayley Simmons

