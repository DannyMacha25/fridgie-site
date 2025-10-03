@echo off
setlocal

REM Set your branch names here
set MAIN_BRANCH=main
set BUILD_BRANCH=digital-ocean

echo Running build...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo Build failed. Aborting.
    exit /b %ERRORLEVEL%
)

echo Switching to %BUILD_BRANCH% branch...
git checkout %BUILD_BRANCH% 2>NUL
IF %ERRORLEVEL% NEQ 0 (
    echo Creating orphan branch %BUILD_BRANCH%...
    git checkout --orphan %BUILD_BRANCH%
)

echo Removing all tracked files...
git rm -rf . >nul 2>&1

echo Copying build output...
xcopy build\* . /E /H /Y >nul

echo Adding and committing...
git add .
git commit -m "Deploy build"

echo Pushing to origin/%BUILD_BRANCH%...
git push origin %BUILD_BRANCH% --force

echo Switching back to %MAIN_BRANCH%...
git checkout %MAIN_BRANCH%

echo Done.
