# covid19-visualizer-vinay

TASK: COVID19 India Dashboard
Design an Angular Dashboard UI to show the statistics of India COVID-19.
TASK DETAILS:

1. What is a Dashboard?
   A dashboard is a type of graphical user interface that often provides at-a-glance
   views of key performance indicators relevant to a particular objective or business process.
2. How do I design a UI?
   ● The dashboard access can be granted only if the user is validated, your design should
   have the functionality of Register, Login, Logout.
   ● In the process of authentication, you can use the API given below for Login and
   Register.
   ○ Login: https://zen-user-api.herokuapp.com/users/authenticate
   ○ Register: https://zen-user-api.herokuapp.com/users/register
   ● To maintain the authenticity of the user, after login store the token generated in local
   storage. And once user logout local storage should be cleared.
   ● Display the response message accordingly returned by the APIs.
   ● Construct a Dashboard which should display both statistics in numbers and graphs.
   ● In the Dashboard display, the overall count of COVID19 confirmed cases, deceased
   cases, recovered cases as shown in the example Figure.1
   ● Design your application which uses various types of charts(Bar / Line Chart /
   Time-series / Pie / Combo / Doughnut) to display the data accordingly.
   ● Example Figure.2 for the different types of charts.
   ● Another page should display the state-wise data with active, confirmed, deceased,
   recovered in tabular(data table) as shown in the example Figure.3
   ● If any state is selected in tabular data show particular state-wise details another page
3. How do I process the output?
   ● Use the API URL to process and display the data in the UI.
   ● Here are the URLs for retrieving the JSON data.
   ○ https://api.covid19india.org/
   ○ https://github.com/covid19india/api
   ○ https://covid19.mathdro.id/api/countries/india
4. Any specification on UI?
   Preferred framework: Angular
   Requirements:
   ■ Use Angular Framework to develop the application
   ■ Use Bootstrap / ng-bootstrap / Angular Material for UI design.
   ■ Use fonts if it’s required in the design.
   ■ Use icons if it’s required in the design.
   ■ This is a front-end task
5. How do I submit my work?
   Preferred:
   ○ Push all your work files to your Github(https://github.com/) and name your
   repository as covid19-visualizer-yourname.
   ○ In a text file add Netlify URL, Github repository URL, and last committed hash ID.
   ○ URL format has to be followed for both Github and Netlify.
   ■ https://github.com/username/covid19-visualizer-yourname
   ■ https://covid19-visualizer-yourname.netlify.app
   ○ Deploy your Angular COVID19 visualizer app in Netlify (https://www.netlify.com).
   Bonus:
6. Usage of ngx-toastr in the required place will be awarded extra marks.
7. Developing the application with interactive UI will be awarded extra marks.
8. Usage of various chats will be awarded extra marks.
9. Any basic hints and reference sites to solve?
   UI references:
   ● https://angular.io/docs
   ● https://material.angular.io/
   ● https://ng-bootstrap.github.io/#/home
   ● https://getbootstrap.com/docs/4.4/getting-started/introduction/
   ● https://www.chartjs.org/
   ● https://jwt.io/introduction/
   API for Authentication:
   ● Login: https://zen-user-api.herokuapp.com/users/authenticate
   ● Register: https://zen-user-api.herokuapp.com/users/register
   API references:
   ● https://api.covid19india.org/ (preferable for Indian COVID19 data)
   ● https://github.com/covid19india/api
   ● https://covid19api.com/

   Working Example websites:
   ● https://www.covid19india.org/ (working example of Indian COVID19 data)
   ● https://corona-virus-stats.now.sh/#/
   ● https://coronnavirusapp.firebaseapp.com/global
   ● https://cov1d9.web.app/world
   ● https://corona-tracker-2020.netlify.app/
