# 🦖 Web_Dinosaurios — Edición Google AI Studio (Vistas Razor de Museo)

Catálogo estratigráfico y taxonómico de **1 617 dinosaurios del Mesozoico** construido con **ASP.NET Core MVC (.NET 8)**, **Dapper** y **SQLite**, integrando las vistas Razor y hojas de estilo diseñadas con **Google AI Studio** sobre el backend completo de [`Web_Dinosaurios`](https://github.com/DanielFalconGuerra/D-Daniel-Desarrollo-Web_Dinosaurios).

---

## ✨ Diseño Editorial de Museo Paleobiológico (Google AI Studio)

Esta versión reemplaza las vistas Razor (`_Layout.cshtml`, `Index.cshtml`, `Detalle.cshtml`) y `wwwroot/css/site.css` por una interfaz curatorial de museo de historia natural conservando el 100 % del contrato C# del backend:

- **Sistema tipográfico:** `Fraunces` (titulares editoriales y nombres científicos en cursiva), `Cinzel` (cabeceras estratigráficas), `Plus Jakarta Sans` (lectura y controles) y `JetBrains Mono` (cifras tabulares en millones de años `Ma` e identificadores PBDB).
- **Cinta y selector cronoestratigráfico interactivo:** acceso rápido a la era completa (`Mesozoico` `251,9–66 Ma`) y a los tres periodos (`Cretácico`, `Jurásico` y `Triásico`) con codificación cromática ICS.
- **Diferenciación entre especies ilustradas y placas fósiles PBDB:**
  - Las **8 especies semilla** con fotografía de Wikimedia Commons se muestran como tarjetas ilustradas con etiqueta `Foto Archivo` y atribución de licencia obligatoria.
  - Los **1 609 géneros de la PBDB** sin foto individual se presentan como **placas de campo** con sello de icnita y código `PBDB #...`.
- **Panel de filtros combinados y migas de filtros activos:** búsqueda por nombre (`nombre`), selector de `periodo`, selector de `dieta` (`Herbívoro`, `Carnívoro`, `Omnívoro`, `Piscívoro`) y casilla `Solo con fotografía (especies ilustradas)` (`conImagen=true`), conservados en toda la paginación.
- **Ficha monográfica (`Detalle.cshtml`):** placa de antigüedad estratigráfica (`~EdadMaxMa`), marco visual o sello taxonómico PBDB, tabla `<dl>` de atributos biológicos/geográficos, sinopsis con capitular editorial (`::first-letter`) y enlace directo a la fuente primaria (Wikipedia en español o Paleobiology Database).

---

## 🗂️ Estructura del Proyecto Integrado

```
Web_Dinosaurios_Razor_AIStudio/
├── Controllers/DinosauriosController.cs  # Index (búsqueda, periodo, dieta, conImagen, paginación) y Detalle
├── Models/Dinosaurio.cs                  # Entidad con las 12 columnas de la tabla Dinosaurios
├── Repositories/                         # IDinosaurioRepository y DinosaurioRepository (Dapper + SQLite)
├── Data/                                 # SqliteConnectionFactory, DatabaseInitializer, schema.sql, seed.sql, paises-es.json
├── Services/                             # PbdbCliente, WikipediaCliente, TextoWikipedia, MapeadorPbdb, ImportadorPbdb
├── Helpers/Presentacion.cs               # ClasesPeriodo, LimitesEpoca, EsIcono, DatosBreves y TextoFuente
├── Views/
│   ├── Shared/_Layout.cshtml             # Cabecera institucional, cinta estratigráfica y pie de licencias (AI Studio)
│   └── Dinosaurios/
│       ├── Index.cshtml                  # Catálogo estratigráfico con selector visual y placas de campo (AI Studio)
│       └── Detalle.cshtml                # Ficha monográfica de espécimen (AI Studio)
├── wwwroot/
│   ├── css/site.css                      # Tokens --dino-* y estilos curatoriales (AI Studio)
│   └── images/dinosaurios/               # 8 fotos de Wikimedia Commons + icono.svg
└── docs/                                 # Contratos de datos e importación PBDB
```

---

## 🚀 Ejecución

Requisitos: SDK de .NET 8 o superior.

```powershell
# Levantar el servidor web (puerto 5290 para poder correr en paralelo con Web_Dinosaurios)
dotnet run --urls "http://localhost:5290"

# (Opcional) Importar o refrescar los 1609 géneros desde la PBDB y Wikipedia en español
dotnet run -- importar-pbdb
```

---

## 📜 Créditos y Licencias

- **Datos paleontológicos:** [Paleobiology Database (PBDB)](https://paleobiodb.org/), bajo licencia **CC BY 4.0**. Nombres de países en español: Unicode CLDR 46.
- **Descripciones:** Extractos de [Wikipedia en español](https://es.wikipedia.org/), bajo licencia **CC BY-SA 4.0**.
- **Fotografías:** [Wikimedia Commons](https://commons.wikimedia.org/), bajo licencias CC BY y CC BY-SA (autor y licencia detallados en el campo `CreditoImagen` de cada ficha).
