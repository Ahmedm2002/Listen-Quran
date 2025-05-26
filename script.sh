echo "Removing node modules"

rm -rf node_modules android/.gradle android/build

echo "Installing node modules"

npm install

echo "Clean gradle cache"

cd android && ./gradlew clean && cd ..

echo "Starting Server"

npm start
