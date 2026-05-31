# mern-learn

Small MERN sample app (client + server). This README explains how to run locally and deploy to an EC2 instance.

## Quick local setup

Install both server and client deps from the repo root:

```bash
npm run install
```

Run dev servers (open two terminals):

```bash
npm run dev:server   # runs server (nodemon)
npm run dev:client   # runs Vite dev server
```

Build and start production (server will run after client build):

```bash
npm run start
```

## Deploy to EC2 (high-level)

1. Provision an Ubuntu EC2 instance and add a Security Group allowing TCP 22 (SSH), 80 (HTTP), 443 (HTTPS).
2. SSH to the instance and install Node, Git, Nginx and PM2 (see deployment script below).
3. Clone this repo on the instance and create a `.env` file under `server/` with `MONGODB_URI` and `PORT`.
4. Run the included deploy script to pull, build, and restart services.

## Deploy script (on server)

We've added `scripts/deploy.sh` to automate pulling latest changes, installing dependencies, building the client, copying static files to Nginx, and restarting the backend with PM2.

Usage on the EC2 instance (run from `/home/ubuntu` or your clone path):

```bash
# make executable once
chmod +x scripts/deploy.sh

# run the deploy script (assumes client is in `client/`)
./scripts/deploy.sh /home/ubuntu/mern-learn
```

The script expects a single argument: the path to the cloned repo on the server.

## Notes
- Keep your `.env` file out of version control.
- Use MongoDB Atlas for production or follow MongoDB docs to install on your server.
- If you want me to add CI/CD (GitHub Actions) to automatically deploy on push, I can add that.
