@echo off
echo Aktyvuiemo virtualne seredovyshche...
call ..\..\venv\Scripts\activate

echo Zapuskaiemo Flask server...
python app.py

pause