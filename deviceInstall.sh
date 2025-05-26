echo "Navigating to android folder"

cd android/ 

echo "Creating apk release"
 ./gradlew assembleRelease 

echo "Navigating to release folder"

cd ./app/build/outputs/apk/release/

echo "Installing the app in the connected device"

adb install app-release.apk

echo "Tasks Fininshed"