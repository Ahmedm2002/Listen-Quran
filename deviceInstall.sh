#!/bin/bash

echo "📂 Navigating to Android folder..."
cd android/

echo "🏗️ Building APK release..."
./gradlew assembleRelease

echo "📁 Navigating to release folder..."
cd ./app/build/outputs/apk/release/


echo "Built Success"
#echo "📱 Installing the app on the connected device..."
#adb install app-release.apk

echo "✅ All tasks finished successfully!"
