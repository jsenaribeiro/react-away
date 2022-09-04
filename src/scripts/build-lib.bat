@echo off

echo COMPILING LIBRARY

echo - removing current files
rd out /q /s 

echo - compiling typescript
call npx tsc -p ./lib/tsconfig.json