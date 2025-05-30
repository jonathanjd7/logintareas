# Gestor de Tareas

Una aplicación web full-stack para gestionar tareas personales, construida con Next.js, Flask y Tailwind CSS.

## Características

- Autenticación de usuarios (registro e inicio de sesión)
- Creación, edición y eliminación de tareas
- Interfaz moderna y responsiva
- Diseño con Tailwind CSS
- API RESTful con Flask
- Almacenamiento de datos en memoria

## Requisitos Previos

- Node.js (v18 o superior)
- Python (v3.8 o superior)
- npm o yarn

## Instalación

### Backend (Flask)

1. Navega al directorio del backend:
```bash
cd backend
```

2. Instala las dependencias de Python:
```bash
pip install flask flask-cors pyjwt
```

3. Inicia el servidor de desarrollo:
```bash
python app.py
```

El servidor backend se ejecutará en `http://localhost:5000`

### Frontend (Next.js)

1. Navega al directorio del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El servidor frontend se ejecutará en `http://localhost:3000`

## Uso

1. Abre tu navegador y ve a `http://localhost:3000`
2. Regístrate con un nuevo usuario o inicia sesión si ya tienes una cuenta
3. Una vez autenticado, podrás:
   - Crear nuevas tareas
   - Ver tu lista de tareas
   - Marcar tareas como completadas
   - Eliminar tareas
   - Cerrar sesión

## Estructura del Proyecto

```
.
├── backend/
│   ├── app.py              # Aplicación principal de Flask
│   ├── managers.py         # Lógica de negocio
│   ├── models.py           # Modelos de datos
│   └── utils.py            # Utilidades y validaciones
│
└── frontend/
    ├── src/
    │   ├── app/           # Páginas de la aplicación
    │   ├── components/    # Componentes reutilizables
    │   └── utils/         # Utilidades y configuración
    ├── public/            # Archivos estáticos
    └── package.json       # Dependencias y scripts
```

## Tecnologías Utilizadas

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - Axios
  - React Toastify

- **Backend**:
  - Flask
  - Flask-CORS
  - PyJWT

## Notas de Desarrollo

- El backend utiliza un almacenamiento en memoria, por lo que los datos se perderán al reiniciar el servidor
- Los tokens JWT expiran después de 24 horas
- La aplicación está configurada para desarrollo local

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 