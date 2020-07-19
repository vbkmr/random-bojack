# Random bojack app
![image](https://user-images.githubusercontent.com/6745332/85291585-a5263600-b4d5-11ea-85c1-54372d339a4f.png)

# Deployment
- Dev: auto-deploy develop branch using github-actions at 
http://www.bojack-app.vaibhavkumar.me/

# Local build (without docker)

1. Clone the repo
2. Get access to the CLIENT_ID or create your own `https://unsplash.com/documentation` 
3. Create `.env` file and put the value of CLIENT_ID there like CLIENT_ID=xyz
4. Include `.env` file in `.gitigonore `

# Local build (with docker)

1. Download `docker` in your local machine. https://www.docker.com/get-started
2. Clone the repo
3. Run: `docker-compose up -d`
