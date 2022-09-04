@echo off

call src/scripts/build-lib.bat

echo - copy package.json
copy lib\package.json out\package.json

echo - copy README.md
copy lib\README.md out\README.md

echo - publish to NPM
call npm publish .\out


