# Hiring Blocks API

## `/api/students`

### GET `/api/students`

Return details of all the users.

### GET `/api/students/:id`

Return details of the specific user.

### GET `/api/students/:id/applications`

Return details of all the applications submitted by the specific user.

### POST `/api/students/add`

Add a new user and Return details of the user.

### POST `/api/students/:id/edit`

Edit a specific user and Return details of the updated user.

## `/api/companies`

### GET `/api/companies`

Return details of all the companies.

### GET `/api/companies/:id`

Return details of the specific company.

### GET `/api/companies/:id/jobs`

Return details of all the jobs created by the specific company.

### GET `/api/companies/:id/applications`

Return details of all the applications for the jobs of the specific company.

### POST `/api/companies/add`

Add a new company and Return details of the user.

### POST `/api/companies/:id/edit`

Edit a specific company and Return details of the updated company.

## `/api/jobs`

### GET `/api/jobs`

Return details of all the users.

### GET `/api/jobs/:id`

Return details of the specific job.

### POST `/api/jobs/add`

Add a new job and Return details of the job.

### POST `/api/jobs/:id/apply`

Apply for a specific job and Return details of the application.
