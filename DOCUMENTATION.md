## **1. Az alkalmazás célja**

Az alkalmazás feladata, hogy az Annie's Flower webshop adatait nyilvántartsa és kezelje.

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát:

    https://github.com/Ha891209/flower-webshop-admin

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

   `git clone https://github.com/Ha891209/flower-webshop-admin.git`

- Telepíteni kell az alkalmazás függőségeit:

    - Backend

        - A terminálon be kell lépni a /backend mappába és futtatni az `npm i` parancsot.
    
    - Frontend

        - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.  

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.
- A terminálban ki kell adni az `ng build` parancsot.
- A /frontend/dist/admin-frontend mappa tartalmát be kell másolni a /backend/public mappába.

## **3. Az alkalmazás konfigurálása**

A /frontend/environments mappában be kell állítani az API végpont elérési útvonalát: 

  - _environment.ts_ állomány: http://127.0.0.1:3000/api/  
  - _environment.prod.ts_ állomány: http://localhost:3000/api/ 

## **4. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /backend mappába belépve a terminálban ki kell adni az `npm run docker:start` parancsot. 
- A /frontend mappába belépve a terminálban ki kell adni az `npm start` parancsot. 

_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):  

| E-mail                  | Jelszó |
| ----------------------- | ------ |
| dshambroke0@spotify.com | test   |

## **5. A végpontok dokumentációja**

Swagger 
- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api/api-docs

---
---

## **Linkek:**  

- [A User Story (adminisztrátori szerepkör) itt érhető el.](https://github.com/Ha891209/flower-webshop-admin/blob/main/README.md)
