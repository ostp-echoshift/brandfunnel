# BrandFunnel 🚀

**Embudos de marca que conectan, convierten y construyen lealtad.**

---

## 📋 Descripción

BrandFunnel es un sitio web profesional diseñado para ofrecer servicios de branding estratégico, embudos de venta y automatización inteligente. Construido con HTML5, CSS3 y JavaScript vanilla, siguiendo los principios OSTP de presencia, resonancia y permanencia.

---

## 🏗️ Estructura del Proyecto


BrandFunnel/
├── 📄 index.html # Página principal
├── 📄 servicios.html # Catálogo de servicios
├── 📄 captura.html # Formulario de diagnóstico
├── 📄 gracias.html # Confirmación post-envío
├── 📄 404.html # Página de error
├── 📁 assets/
│ ├── 📁 css/ # Estilos (main.css unificado)
│ ├── 📁 js/ # Scripts (main.js, utils.js, engine.js)
│ ├── 📁 img/ # Imágenes (8 archivos)
│ ├── 📁 icon/ # Favicons (9 archivos + manifest)
│ └── 📁 logo/ # Logo en SVG y PNG
├── 📁 docs/ # Documentación
├── 📄 README.md # Este archivo
├── 📄 .gitignore # Exclusiones Git
├── 📄 package.json # Configuración npm
├── 📄 config.json # Configuración general
└── 📄 project-config.json # Configuración del proyecto



---

## 🎨 Servicios

| Servicio | Precio | Duración |
|----------|--------|----------|
| Branding Estratégico | $8,500 MXN | 2-3 semanas |
| Embudos de Venta | $12,000 MXN | 3-4 semanas |
| Automatización Inteligente | $9,500 MXN | 2-3 semanas |
| Paquete Completo | $24,500 MXN | 6-8 semanas |

---

## 📞 Contacto

| Vía | Información |
|-----|-------------|
| WhatsApp | [33 1757 5573](https://wa.me/523317575573) |
| Email | [hola@brandfunnel.com](mailto:hola@brandfunnel.com) |
| Web | [https://ostp-echoshift.github.io/BrandFunnel/](https://ostp-echoshift.github.io/BrandFunnel/) |

---

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla
- Font Awesome 6
- Git + GitHub Pages

---

## 🚀 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/ostp-echoshift/BrandFunnel.git

# Navegar al directorio
cd BrandFunnel

# Abrir en navegador
start index.html

```

✅ Estructura de carpetas: 10
✅ Archivos HTML: 5
✅ Archivos CSS: 1 (unificado)
✅ Archivos JS: 3
✅ Imágenes: 8
✅ Iconos: 9
✅ Git: Inicializado
✅ GitHub: Conectado




---

## 📄 **7. .GITIGNORE**

```console
# ==============================================
# BrandFunnel - GitIgnore
# ==============================================

# Sistema operativo
Thumbs.db
.DS_Store
*.swp
*.swo
*~

# Editores
.vscode/
.idea/
*.iml
*.sublime-*

# Dependencias
node_modules/
package-lock.json

# Logs
*.log
logs/
npm-debug.log*

# Configuración sensible
.env
.env.local
*.key
*.pem
secrets/
config/credentials.json

# Datos de clientes
data/leads/
conversiones/
*.leads.log

# Respaldos
*.backup
*.bak
*.orig
backups/

# Archivos locales
config.local.json
project-config.local.json

# ===== EXCEPCIONES =====
!.env.example
!config.example.json
!README.md
```

{
  "name": "brandfunnel",
  "version": "1.0.0",
  "description": "Embudos de marca que conectan, convierten y construyen lealtad",
  "main": "index.html",
  "scripts": {
    "dev": "live-server --port=3000",
    "start": "live-server --port=3000 --open=index.html"
  },
  "keywords": ["funnel", "branding", "automatizacion", "marketing"],
  "author": "BrandFunnel · OSTP",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/ostp-echoshift/BrandFunnel.git"
  },
  "homepage": "https://ostp-echoshift.github.io/BrandFunnel/",
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}