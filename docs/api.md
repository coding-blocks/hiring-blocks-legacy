# Hiring Blocks API

## `/api/students`

### GET `/api/students`

Return details of all the users.
Sample JSON
[
  {
    "id": 1,
    "firstname": "Apoorvaa",
    "lastname": "Gupta",
    "email": "apoorvaagupta01@gmail.com",
    "password": "$2a$10$dhaZ2h4H77C3sbXGR/EP5O3824fcOLCu3zJmLz1okAxSqHpICUGjm",
    "contact": "123456789",
    "pincode": 110001,
    "education": {
      "school": "Bal Bharti"
    },
    "skills": [
      "Web Development",
      "Algorithmic Programming"
    ],
    "languages": [
      "C++",
      "Java",
      "HTML",
      "CSS",
      "JS",
      "NodeJS"
    ],
    "projects": {
      "Hiring Blocks": "With Coding Blocks"
    },
    "trainings": {
      "Crux": "Java",
      "Elixir": "Web Development"
    },
    "cbStudent": true,
    "cbCourses": [
      "Crux",
      "Elixir"
    ],
    "createdAt": "2017-06-05T15:09:07.168Z",
    "updatedAt": "2017-06-05T15:46:53.170Z"
  }
]

### GET `/api/students/:id`

Return details of the specific user.
Sample JSON
{
  "id": 1,
  "firstname": "Apoorvaa",
  "lastname": "Gupta",
  "email": "apoorvaagupta01@gmail.com",
  "password": "$2a$10$dhaZ2h4H77C3sbXGR/EP5O3824fcOLCu3zJmLz1okAxSqHpICUGjm",
  "contact": "123456789",
  "pincode": 110001,
  "education": {
    "school": "Bal Bharti"
  },
  "skills": [
    "Web Development",
    "Algorithmic Programming"
  ],
  "languages": [
    "C++",
    "Java",
    "HTML",
    "CSS",
    "JS",
    "NodeJS"
  ],
  "projects": {
    "Hiring Blocks": "With Coding Blocks"
  },
  "trainings": {
    "Crux": "Java",
    "Elixir": "Web Development"
  },
  "cbStudent": true,
  "cbCourses": [
    "Crux",
    "Elixir"
  ],
  "createdAt": "2017-06-05T15:09:07.168Z",
  "updatedAt": "2017-06-05T15:46:53.170Z"
}

### GET `/api/students/:id/applications`

Return details of all the applications submitted by the specific user.
Sample JSON
[
  {
    "id": 2,
    "status": "none",
    "date": null,
    "app": "Apply for the position of full stack Web Developer Intern",
    "createdAt": "2017-06-05T16:45:35.190Z",
    "updatedAt": "2017-06-05T16:45:35.190Z",
    "studentId": 1,
    "jobId": 4,
    "job": {
      "id": 4,
      "title": "Summer Intern",
      "description": "Full stack web developer",
      "skills": [
        "HTML",
        "CSS",
        "JS",
        "NodeJS"
      ],
      "jobType": "Internship",
      "location": "Pitampura",
      "stipend": "10000",
      "active": true,
      "startDate": "05/06/17",
      "endDate": "04/07/17",
      "createdAt": "2017-06-04T19:21:10.929Z",
      "updatedAt": "2017-06-04T19:21:10.929Z",
      "companyId": 2
    }
  }
]

### POST `/api/students/add`

Add a new user and Return details of the user.
Sample JSON
{
  "cbStudent": false,
  "id": 1,
  "firstname": "Apoorvaa",
  "lastname": "Gupta",
  "email": "apoorvaagupta01@gmail.com",
  "password": "$2a$10$dhaZ2h4H77C3sbXGR/EP5O3824fcOLCu3zJmLz1okAxSqHpICUGjm",
  "updatedAt": "2017-06-05T15:09:07.168Z",
  "createdAt": "2017-06-05T15:09:07.168Z",
  "contact": null,
  "pincode": null,
  "education": null,
  "skills": null,
  "languages": null,
  "projects": null,
  "trainings": null,
  "cbCourses": null
}

### POST `/api/students/:id/edit`

Edit a specific user and Return details of the updated user.
Sample JSON
{
  "id": 1,
  "firstname": "Apoorvaa",
  "lastname": "Gupta",
  "email": "apoorvaagupta01@gmail.com",
  "password": "$2a$10$dhaZ2h4H77C3sbXGR/EP5O3824fcOLCu3zJmLz1okAxSqHpICUGjm",
  "contact": "123456789",
  "pincode": 110001,
  "education": {
    "school": "Bal Bharti"
  },
  "skills": [
    "Web Development",
    "Algorithmic Programming"
  ],
  "languages": [
    "C++",
    "Java",
    "HTML",
    "CSS",
    "JS",
    "NodeJS"
  ],
  "projects": {
    "Hiring Blocks": "With Coding Blocks"
  },
  "trainings": {
    "Crux": "Java",
    "Elixir": "Web Development"
  },
  "cbStudent": true,
  "cbCourses": [
    "Crux",
    "Elixir"
  ],
  "createdAt": "2017-06-05T15:09:07.168Z",
  "updatedAt": "2017-06-05T15:46:53.170Z"
}

## `/api/companies`

### GET `/api/companies`

Return details of all the companies.
Sample JSON
[
  {
    "id": 1,
    "name": "11",
    "email": "123",
    "password": "$2a$10$cIaU/xRg1TXOFBOugVBJPOfzrtQQyDaJ2BvLQ/4/32GlkP.xdjVci",
    "website": null,
    "locations": null,
    "skills": null,
    "repName": null,
    "repNumber": null,
    "createdAt": "2017-05-29T07:49:31.006Z",
    "updatedAt": "2017-05-29T07:49:31.006Z"
  },
  {
    "id": 2,
    "name": "Coding Blocks",
    "email": "code@codingblocks.com",
    "password": "$2a$10$ASx10poG7TughzJVE/f3v.LYloWsNuSLEEcRJ.NbcmBOMqbtR/6dO",
    "website": "codingblocks.com",
    "locations": [
      "Pitampura",
      "Dwarka",
      "Gurgaon",
      "Greater Noida"
    ],
    "skills": [
      "C++",
      "Java",
      "NodeJS",
      "Android",
      "Python"
    ],
    "repName": "Arnav Bhaiya",
    "repNumber": "123456789",
    "createdAt": "2017-06-04T18:49:54.714Z",
    "updatedAt": "2017-06-04T19:11:09.479Z"
  }
]

### GET `/api/companies/:id`

Return details of the specific company.
Sample JSON
{
  "id": 2,
  "name": "Coding Blocks",
  "email": "code@codingblocks.com",
  "password": "$2a$10$ASx10poG7TughzJVE/f3v.LYloWsNuSLEEcRJ.NbcmBOMqbtR/6dO",
  "website": "codingblocks.com",
  "locations": [
    "Pitampura",
    "Dwarka",
    "Gurgaon",
    "Greater Noida"
  ],
  "skills": [
    "C++",
    "Java",
    "NodeJS",
    "Android",
    "Python"
  ],
  "repName": "Arnav Bhaiya",
  "repNumber": "123456789",
  "createdAt": "2017-06-04T18:49:54.714Z",
  "updatedAt": "2017-06-04T19:11:09.479Z"
}

### GET `/api/companies/:id/jobs`

Return details of all the jobs created by the specific company.
Sample JSON
[
  {
    "id": 4,
    "title": "Summer Intern",
    "description": "Full stack web developer",
    "skills": [
      "HTML",
      "CSS",
      "JS",
      "NodeJS"
    ],
    "jobType": "Internship",
    "location": "Pitampura",
    "stipend": "10000",
    "active": true,
    "startDate": "05/06/17",
    "endDate": "04/07/17",
    "createdAt": "2017-06-04T19:21:10.929Z",
    "updatedAt": "2017-06-04T19:21:10.929Z",
    "companyId": 2
  },{
        "id": 5,
        "title": "Summer Intern",
        "description": "Android developer",
        "skills": [
          "Java",
          "Kotlin",
        ],
        "jobType": "Internship",
        "location": "Pitampura",
        "stipend": "10000",
        "active": true,
        "startDate": "05/06/17",
        "endDate": "04/07/17",
        "createdAt": "2017-06-04T19:25:39.532Z",
        "updatedAt": "2017-06-04T19:25:39.532Z",
        "companyId": 2
      }
]

### GET `/api/companies/:id/applications`

Return details of all the applications for the jobs of the specific company.
Sample JSON
[
  {
    "id": 1,
    "status": "none",
    "date": null,
    "app": "Apply for the position of full stack Web Developer Intern",
    "createdAt": "2017-06-05T16:45:35.190Z",
    "updatedAt": "2017-06-05T16:45:35.190Z",
    "studentId": 1,
    "jobId": 4,
    "student": {
      "id": 1,
      "firstname": "Apoorvaa",
      "lastname": "Gupta",
      "email": "apoorvaagupta01@gmail.com",
      "password": "$2a$10$dhaZ2h4H77C3sbXGR/EP5O3824fcOLCu3zJmLz1okAxSqHpICUGjm",
      "contact": "123456789",
      "pincode": 110001,
      "education": {
        "school": "Bal Bharti"
      },
      "skills": [
        "Web Development",
        "Algorithmic Programming"
      ],
      "languages": [
        "C++",
        "Java",
        "HTML",
        "CSS",
        "JS",
        "NodeJS"
      ],
      "projects": {
        "Hiring Blocks": "With Coding Blocks"
      },
      "trainings": {
        "Crux": "Java",
        "Elixir": "Web Development"
      },
      "cbStudent": true,
      "cbCourses": [
        "Crux",
        "Elixir"
      ],
      "createdAt": "2017-06-05T15:09:07.168Z",
      "updatedAt": "2017-06-05T15:46:53.170Z"
    },
    "job": {
      "id": 4,
      "title": "Summer Intern",
      "description": "Full stack web developer",
      "skills": [
        "HTML",
        "CSS",
        "JS",
        "NodeJS"
      ],
      "jobType": "Internship",
      "location": "Pitampura",
      "stipend": "10000",
      "active": true,
      "startDate": "05/06/17",
      "endDate": "04/07/17",
      "createdAt": "2017-06-04T19:21:10.929Z",
      "updatedAt": "2017-06-04T19:21:10.929Z",
      "companyId": 2
    }
  }
]

### POST `/api/companies/add`

Add a new company and Return details of the user.
Sample JSON:
{
  "id": 2,
  "name": "Coding Blocks",
  "email": "code@codingblocks.com",
  "password": "$2a$10$ASx10poG7TughzJVE/f3v.LYloWsNuSLEEcRJ.NbcmBOMqbtR/6dO",
  "updatedAt": "2017-06-04T18:49:54.714Z",
  "createdAt": "2017-06-04T18:49:54.714Z",
  "website": null,
  "locations": null,
  "skills": null,
  "repName": null,
  "repNumber": null
}

### POST `/api/companies/:id/edit`

Edit a specific company and Return details of the updated company.
Sample JSON
{
  "id": 2,
  "name": "Coding Blocks",
  "email": "code@codingblocks.com",
  "password": "$2a$10$ASx10poG7TughzJVE/f3v.LYloWsNuSLEEcRJ.NbcmBOMqbtR/6dO",
  "website": "codingblocks.com",
  "locations": [
    "Pitampura",
    "Dwarka",
    "Gurgaon",
    "Greater Noida"
  ],
  "skills": [
    "C++",
    "Java",
    "NodeJS",
    "Android",
    "Python"
  ],
  "repName": "Arnav Bhaiya",
  "repNumber": "123456789",
  "createdAt": "2017-06-04T18:49:54.714Z",
  "updatedAt": "2017-06-04T19:11:09.479Z"
}

## `/api/jobs`

### GET `/api/jobs`

Return details of all the jobs.
Sample JSON
[
  {
    "id": 3,
    "title": "11",
    "description": null,
    "skills": null,
    "jobType": null,
    "location": null,
    "stipend": null,
    "active": null,
    "startDate": null,
    "endDate": null,
    "createdAt": "2017-05-29T07:55:40.818Z",
    "updatedAt": "2017-05-29T07:55:40.818Z",
    "companyId": 1
  },
  {
    "id": 4,
    "title": "Summer Intern",
    "description": "Full stack web developer",
    "skills": [
      "HTML",
      "CSS",
      "JS",
      "NodeJS"
    ],
    "jobType": "Internship",
    "location": "Pitampura",
    "stipend": "10000",
    "active": true,
    "startDate": "05/06/17",
    "endDate": "04/07/17",
    "createdAt": "2017-06-04T19:21:10.929Z",
    "updatedAt": "2017-06-04T19:21:10.929Z",
    "companyId": 2
  },
  {
    "id": 5,
    "title": "Summer Intern",
    "description": "Android developer",
    "skills": [
      "Java",
      "Kotlin",
    ],
    "jobType": "Internship",
    "location": "Pitampura",
    "stipend": "10000",
    "active": true,
    "startDate": "05/06/17",
    "endDate": "04/07/17",
    "createdAt": "2017-06-04T19:25:39.532Z",
    "updatedAt": "2017-06-04T19:25:39.532Z",
    "companyId": 2
  }
]

### GET `/api/jobs/:id`

Return details of the specific job.
Sample JSON
{
  "id": 4,
  "title": "Summer Intern",
  "description": "Full stack web developer",
  "skills": [
    "HTML",
    "CSS",
    "JS",
    "NodeJS"
  ],
  "jobType": "Internship",
  "location": "Pitampura",
  "stipend": "10000",
  "active": true,
  "startDate": "05/06/17",
  "endDate": "04/07/17",
  "companyId": 2,
  "updatedAt": "2017-06-04T19:21:10.929Z",
  "createdAt": "2017-06-04T19:21:10.929Z"
}

### POST `/api/jobs/add`

Add a new job and Return details of the job.
Sample JSON
{
  "id": 4,
  "title": "Summer Intern",
  "description": "Full stack web developer",
  "skills": [
    "HTML",
    "CSS",
    "JS",
    "NodeJS"
  ],
  "jobType": "Internship",
  "location": "Pitampura",
  "stipend": "10000",
  "active": true,
  "startDate": "05/06/17",
  "endDate": "04/07/17",
  "companyId": 2,
  "updatedAt": "2017-06-04T19:21:10.929Z",
  "createdAt": "2017-06-04T19:21:10.929Z"
}

### POST `/api/jobs/:id/apply`

Apply for a specific job and Return details of the application.
Sample JSON
{
  "id": 2,
  "app": "Apply for the position of full stack Web Developer Intern",
  "status": "none",
  "studentId": 1,
  "jobId": 4,
  "updatedAt": "2017-06-05T16:45:35.190Z",
  "createdAt": "2017-06-05T16:45:35.190Z",
  "date": null
}
