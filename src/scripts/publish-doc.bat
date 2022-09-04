@echo off
setlocal enabledelayedexpansion

call src/scripts/publish-lib

echo:
echo PUBLISHING DOC

echo - generating docs 
call jsdoc -c src\jsdoc.json 

echo - copying to jsenaribeiro.github repository
xcopy doc ..\jsenaribeiro.github.io\react-away /E /H /C /I /Y 

echo - commiting and pushing in jsenaribeiro.github
cd ..\jsenaribeiro.github.io && git++ 'react-away documentation'