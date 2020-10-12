set -e

# clean
echo "Clean es dir"
rm -rf es

#compile ts
echo "Compile ts..."
tsc

#compole css
echo "Compile style & copy image dir"
sass --update ./src/allStyle/index.scss:./es/allStyle/index.css --sourcemap=none --no-cache --style compressed
cp -r ./src/allStyle/images ./es/allStyle/images

#babel change import style suffix 
echo ".scss to .css..."  # 待废弃
babel ./es -d ./es --verbose --keep-file-extension