# angularjsPlusWebApi
entity framework code first PLUS web api PLUS angularjs

Introduction:       

	I created a SPA Demo using ASP.NET MVC, Entity Framework Code First, WEB API and Angular.js. 
	Angular.js is a Model-View-* JavaScript based framework for developing SPA applications. 
	Similarly ASP.NET Web API is a good fit for providing data for these type of applications. 

Responsibility:

•	Entity Framework Code first model.
•	Create data context and initialize default data by migration.
•	Create Web API RESTful service for Data CRUD manipulation.
•	Create Web API service for files uploading function.
•	Frontend Angularjs framework design pattern.
•	Create angularjs controller, factory and customer filter.
•	Async call Web API RESTful service by angular factory.
•	Nest ng-repeat.
•	Create reusable views and controllers, such as file upload, notice board dialogue.
•	Structuring Angular applications following Johnpapa style.
	

Database: SQL-SERVER express 2014

Backend:  Entity Framework code first
          Web API 2.0 RESTful service
          Object model

Frontend: Angularjs framework (factory,controller,customer filter)
          Bootstrap
          ng-file-upload
		  		  
          
There are 4 objects in this demo.
    1. Group
    2. Nation
    3. Match
    4. PlayedMatch
    
Each group has 4 nations and you could add or update nation information.

Each nation could has 3 matches and nations were awarded three points for a win and one for a draw.

The related played matches will be removed while doing nation deleting operation.



          
          


