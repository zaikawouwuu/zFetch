#!/bin/bash
echo "Downloading index file..."
curl -sSL "https://github.com/zaikawouwuu/zFetch/raw/main/index.js" -o "file.js"
echo "Formatting index file..."
fold -w 160 -s file.js > formatted_file.js
rm file.js
mv formatted_file.js index.js
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
curl -sSL "https://github.com/zaikawouwuu/zFetch/raw/main/debian_logo.txt" -o "./logos/debian_logo.txt"
curl -sSL "https://github.com/zaikawouwuu/zFetch/raw/main/arch_logo.txt" -o  "./logos/arch_logo.txt"
cd ~/.config
mkdir zfetch
cd zfetch
touch zfetch.conf
echo "DISPLAYED_LOGO = auto;
LOGO_COLOR = auto;
GET_INFO = auto;
" >> zfetch.conf
