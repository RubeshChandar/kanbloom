#! /bin/sh

cd ./frontend
npm run build
cd ..
mkdir -p ./backend/dist
mv ./frontend/dist ./backend/

echo "Done with npm build process Moving onto pushing to docker hub"

docker build -t rubeshchandar/kanbloom ./backend
docker push rubeshchandar/kanbloom:latest