#!/bin/bash
echo "Downloading index file..."
curl -sSL "https://github.com/zaikawouwuu/zfetch/raw/main/index.js" -o "file.js"
echo "Formatting index file..."
fold -w 160 -s file.js > formatted_file.js
rm file.js
mv formatted_file.js file.js
echo "-> Index file formatting complete."
echo "Starting npm..."
npm init -y
echo "Downloading dependencies..."
npm i terminal-kit systeminformation
echo "Creating other dependencies..."
mkdir cfg
echo "arch = 23 147 209;
debian = 215 10 83;" >> ./cfg/colors.txt
mkdir logos
echo "debian logo here" >> ./logos/debian_logo.txt
echo "arch logo here" >> ./logos/arch_logo.txt
