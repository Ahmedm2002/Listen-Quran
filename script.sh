#!/bin/bash

echo "🧹 Removing old build files and node modules..."
rm -rf node_modules android/.gradle android/build

echo "📦 Installing node modules..."
npm install

echo "🛠️ Cleaning Gradle cache..."
cd android && ./gradlew clean && cd ..

echo "🚀 Starting the development server..."
npm start
