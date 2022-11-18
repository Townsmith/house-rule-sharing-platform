# house-rule-sharing-platform

This is the open source repository I created as part of my bachelor thesis and is intended to be used for future research.

To run this project you will need to install node.js and npm. You will also need Angular and Angular CLI.

The project consists of two parts, house-rule-platform and house-rule-data. In both folders you need to execute the command <npm i>.

You will also need to install XAMMP and create a database for strapi to work with. You will have to figure out how to connect the existing strapi project to your new database.

Once everything is installed and setup, the following command start the project:
- Start XAMMP and launch Apache and MySQL there.
- Navigate to house-rule-data and in that folder execute <npm run develop>
- Navigate to house-rule-platform and execute <node bggServer.js>
- Navigate to house-rule-platform and execute <ng serve>

Most likely, something will go wrong during this and the project will not start. If you run into issues contact me under: christopher.adam@townsmith.de
Least I can do is help with the setup.


Inside the house-rule-platform folder, you will find a 'data' folder in which all TS files can be found that define all objects coming from the Strapi API and BGG API. They are currently class based and it might be favorable and cleaner to redo these as interfaces.