# paint-company-app-frontend

This project was created using the [Angular](https://www.angular.io) framework.

This is the frontend component of the project. The code for the backend can be found in the [paint-company-app-backend](https://www.github.com/matt-marko/paint-company-app-backend) repository.

## Links 

Link to application: https://paint-company-matt.netlify.app/

## Information

This app was developed to satisfy the requirements of _A Paint Company_. It lets users view and edit the availability for each of the five colours of paint they use. When launching the application, the user can log in with different users. By default, John and Painter have view permissions, Jane has edit permissions, and Adam has Admin permissions. 

- A user with view permissions may see the status of all the paints but cannot edit them.

- A user with edit permissions can drag and drop the paints to different columns in order to update their availability. After making changes, press the "Save Changes" button to submit your changes to the server.

- A user with admin permissions may edit the paint statuses too, and they also have access to the "Admin Settings" button which lets them set the roles for the different users.

- A user with disabled permissions is not allowed to log in and view the orders.

## Project Structure

The source code is contained within the `src/app` folder. Within are the following folders:

- The `components` folder contains the Angular UI components.
- The `services` folder contains the Angular services, which are responsible for handling data sent to and from the backend.
- The `environments` folder contains the URLs used to communicate with the backend for both the local and production environments.

## DevOps Pipeline

A CI pipeline exists for this projects, which uses GitHub Actions. It deploys the application to Netlify. The pipeline runs when making changes to the main branch, or when ran manually. The workflow file may be found in `.github/workflows/main.yml`.
