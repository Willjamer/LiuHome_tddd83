# liuHome – Student Apartment Rental Marketplace - TDDD83 Grupp 2

liuHome is a **student-to-student** apartment rental marketplace.  
### **🔹Git cheat sheet**
https://education.github.com/git-cheat-sheet-education.pdf  

## SETUP GUIDE

### **🔹 Step 1: WSL skip this step if linux/mac**
Inside Powershell 
```bash
wsl --install
```
Follow instructions given

### **🔹 Step 2: Clone the Repository**
```bash
git clone <your-repo-url>
cd liuHome
```
---
### **🔹 Step 3: Set Up & Run the backend**
Do this in a new Visualstudio code terminal
```bash
cd /backend
python3 -m venv venv       
source venv/bin/activate    
pip install -r requirements.txt 

```

### **🔹 Step 4: Setup swish server**
```bash
cd ../swishServer
npm install
```
---
### **🔹 Step 5: Set Up & Run the Frontend (Flask)**
```bash
cd ../frontend
npm install    
npm run dev
```


---
### **🔹 Troubleshoot**
in frontend
```bash
lsof -ti :3000 | xargs kill -9 & lsof -ti :3001 | xargs kill -9 & lsof -ti :3005 | xargs kill -9 & clear & npm run dev
```



---
