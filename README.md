# Hiring Blocks

CB Placements web portal for jobs and internships

# Setup

## Clone the repository and install node packages
> Please ensure you have the latest version of Nodejs and Node Package Manager (NPM) installed
```
git clone https://github.com/coding-blocks/hiring-blocks
cd hiring-blocks
npm install
```
## Setting Up Postgres

### Configure the Database
> Install Postgres, and use the following commands to setup the database and new role. The following commands are written as per the default configuration specified in secrets.json. You can change secrets.json to fit your preferences and modify the commands accordingly.
```
createdb hb
createuser cbuser
psql cbuser
```
> Once the psql shell comes up, change the password for the role 'cbuser' by typing the following
```
\password cbuser
```
> Enter "cbpass" (without quotes) to change the password to "cbpass" for the role "cbuser". Then, type \quit to exit the shell.
---
# Running the app
```
npm start
```







