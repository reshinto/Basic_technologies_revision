# Works only if react app is created using create-react-app

1. Setup .gitignore file
2. Ensure either package-lock.json or yarn.lock is deleted, only can have 1
3. Init with git, ignore if already done
   > git init
4. Add and commit
   > git add . && git commit -m "initial commit"
5. Login to Heroku
   > heroku login
6. Create heroku project with buildpack (project name will be the url)
   > heroku create project_name -b https://github.com/mars/create-react-app-buildpack.git
   - url will be https://project_name.herokuapp.com
   - if project_name is not given, random name will be given
7. Set heroku environment variables
   - view all configs
     > heroku config
   - set environment variable if required
     > heroku config:set MY_KEY=KEY_VALUE
8. Push to heroku
   > git push heroku master
9. Open website
   > heroku open
10. Check releases for version to rollback if required
    > heroku releases
11. Rollback if neccessary
    > heroku rollback vxxx
    - example
      > heroku rollback v2
