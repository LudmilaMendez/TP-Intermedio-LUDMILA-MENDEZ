## 📚 CURLS (Linux) :

- GET (Obtener todas las categorías)

  curl -X GET http://localhost:5000/api/categoria

-  GET (Obtener una categoría por ID)
  
     curl -X GET http://localhost:5000/api/categoria/6983f8a27e60b1278e28e6ae

- POST (Crear una nueva categoría)
  
  curl -X POST http://localhost:5000/api/categoria \
     -H "Content-Type: application/json" \
     -d '{"name": "Tecnología y Audio"}'

- PUT (Actualizar una categoría existente)
  
    curl -X PUT http://localhost:5000/api/categoria/6983f8a27e60b1278e28e6ae \
     -H "Content-Type: application/json" \
     -d '{"name": "Computación y Gaming"}'
     
- DELETE (Eliminar categoria existente)

  curl -X DELETE http://localhost:5000/api/categoria/6983f8a27e60b1278e28e6ae
  
## 📚 CURLS (Powershell) :

- GET (Obtener todas las categorías)
  
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria" -Method Get

- GET (Obtener una categoría por ID)
  
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria/{id}" -Method Get

Ej con categoria con id 10: Invoke-RestMethod -Uri "http://localhost:5000/api/categoria/10" -Method Get

- POST (Crear una nueva categoría)
  
Ej con categoria "Limpieza":
$body = @{ name = "Limpieza" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria" -Method Post -Body $body -ContentType "application/json"

>> Ej para evitar errores por UTF-8:
>>
>>$body = @{ name = "Tecnología y Audio" } | ConvertTo-Json -Compress
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria" `
                  -Method Post `
                  -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) `
                  -ContentType "application/json; charset=utf-8"

- PUT (Actualizar una categoría existente)
  
Ej con categoria "Limpieza":

$body = @{ name = "Limpieza" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria/{id}" -Method Put -Body $body -ContentType "application/json"

- DELETE (Eliminar categoria existente)
  
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria/{id}" -Method Delete

Ej con categoria 10:
Invoke-RestMethod -Uri "http://localhost:5000/api/categoria/10" -Method Delete
