/**
 * Código fuente completo de los 4 archivos Razor y CSS listos para copiar y pegar.
 */

export interface RazorFileInfo {
  id: string;
  path: string;
  title: string;
  language: string;
  description: string;
  code: string;
}

export const RAZOR_FILES: RazorFileInfo[] = [
  {
    id: "layout",
    path: "Views/Shared/_Layout.cshtml",
    title: "1. Views/Shared/_Layout.cshtml",
    language: "razor",
    description: "Plantilla maestra institucional: Top Bar Contract de 3 zonas, cinta cronoestratigráfica superior, Bootstrap 5 + Google Fonts y pie con créditos legales CC BY 4.0 (PBDB), CC BY-SA 4.0 (Wikipedia) y Wikimedia Commons.",
    code: `@*
    =============================================================================
    Web_Dinosaurios — Views/Shared/_Layout.cshtml
    Catálogo Estratigráfico de Dinosaurios del Mesozoico
    Compatibilidad: ASP.NET Core 8 MVC · Bootstrap 5 · HTML5 Semántico
    =============================================================================
*@
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@(ViewData["Title"] != null ? $"{ViewData["Title"]} — " : "")Dinosaurios del Mesozoico</title>
    <meta name="description" content="Registro estratigráfico y taxonómico de 1.617 dinosaurios del Mesozoico. Datos de la Paleobiology Database y Wikipedia en español." />

    <!-- Google Fonts: Fraunces (titular orgánico/editorial), Cinzel (monumental/estratigráfico), Plus Jakarta Sans (prosa), JetBrains Mono (cifras tabulares) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Bootstrap 5 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <!-- Estilos específicos de Web_Dinosaurios -->
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body class="dino-body d-flex flex-column min-vh-100">
    <!-- Barra superior institucional (Top Bar Contract: 3 zonas delimitadas) -->
    <header class="dino-header border-bottom sticky-top">
        <div class="container-xxl">
            <div class="d-flex align-items-center justify-content-between py-3 gap-3">
                <!-- Zona 1: Identificador institucional de una sola línea -->
                <a asp-controller="Dinosaurios" asp-action="Index" class="dino-brand text-decoration-none">
                    <span class="dino-brand-sub">Archivo Paleobiológico</span>
                    <span class="dino-brand-title">Dinosaurios del Mesozoico</span>
                </a>

                <!-- Zona 2: Enlaces canónicos concisos -->
                <nav class="dino-nav d-none d-md-flex align-items-center gap-4" aria-label="Navegación principal">
                    <a asp-controller="Dinosaurios" asp-action="Index" class="dino-nav-link text-decoration-none">
                        Catálogo de Especies
                    </a>
                    <a href="#escala-mesozoica" class="dino-nav-link text-decoration-none">
                        Escala Estratigráfica
                    </a>
                    <a href="#acerca-fuentes" class="dino-nav-link text-decoration-none">
                        Fuentes &amp; Metodología
                    </a>
                </nav>

                <!-- Zona 3: Acción primaria contextual -->
                <div class="d-flex align-items-center gap-2">
                    <a asp-controller="Dinosaurios" asp-action="Index" class="btn dino-btn-primary btn-sm">
                        Explorar Catálogo
                    </a>
                </div>
            </div>
        </div>

        <!-- Cinta de Referencia Cronoestratigráfica Rápida -->
        <aside class="dino-strata-strip" aria-label="Cronoestratigrafía del Mesozoico">
            <div class="container-xxl">
                <div class="d-flex align-items-center justify-content-between py-1 small">
                    <div class="dino-strip-item dino-strip-cretacico">
                        <span class="dino-strip-dot"></span>
                        <strong class="fw-semibold">Cretácico</strong>
                        <span class="text-muted d-none d-sm-inline">145–66 Ma</span>
                    </div>
                    <div class="dino-strip-divider" aria-hidden="true">/</div>
                    <div class="dino-strip-item dino-strip-jurasico">
                        <span class="dino-strip-dot"></span>
                        <strong class="fw-semibold">Jurásico</strong>
                        <span class="text-muted d-none d-sm-inline">201,4–145 Ma</span>
                    </div>
                    <div class="dino-strip-divider" aria-hidden="true">/</div>
                    <div class="dino-strip-item dino-strip-triasico">
                        <span class="dino-strip-dot"></span>
                        <strong class="fw-semibold">Triásico</strong>
                        <span class="text-muted d-none d-sm-inline">251,9–201,4 Ma</span>
                    </div>
                    <div class="d-none d-lg-block text-muted text-uppercase tracking-wider dino-mono-num small">
                        1.617 Taxones Registrados
                    </div>
                </div>
            </div>
        </aside>
    </header>

    <!-- Contenido Principal -->
    <main id="main-content" class="flex-grow-1" role="main">
        @RenderBody()
    </main>

    <!-- Pie de Página Institucional y Créditos de Licenciamiento Obligatorios -->
    <footer class="dino-footer border-top mt-auto" id="acerca-fuentes">
        <div class="container-xxl py-5">
            <div class="row g-4 justify-content-between">
                <div class="col-12 col-md-5">
                    <div class="dino-footer-brand mb-2">
                        <span class="dino-brand-title">Dinosaurios del Mesozoico</span>
                    </div>
                    <p class="text-muted small mb-3">
                        Catálogo taxonómico, cronológico y morfológico estructurado para la divulgación paleobiológica.
                        Los registros fósiles están ordenados según la Escala Cronoestratigráfica Internacional (ICS),
                        desde las capas más jóvenes del Cretácico terminal (66 Ma) hasta el Triásico inferior (251,9 Ma).
                    </p>
                    <p class="text-muted small mb-0">
                        ASP.NET Core (.NET 8) · Dapper · SQLite · Interfaz tipográfica de museo.
                    </p>
                </div>

                <div class="col-12 col-md-6 col-lg-5">
                    <h2 class="h6 text-uppercase tracking-wider fw-bold text-dark mb-3">Fuentes de Datos &amp; Licenciamiento</h2>
                    <ul class="list-unstyled small text-muted mb-0 d-flex flex-column gap-2">
                        <li class="d-flex align-items-start gap-2">
                            <span class="dino-bullet text-amber" aria-hidden="true">&bull;</span>
                            <div>
                                <strong class="text-dark">Paleobiology Database (PBDB):</strong>
                                Datos taxonómicos, estratos geológicos y estimaciones cronológicas provistos bajo licencia
                                <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noopener noreferrer" class="dino-link">Creative Commons Attribution 4.0 (CC BY 4.0)</a>.
                            </div>
                        </li>
                        <li class="d-flex align-items-start gap-2">
                            <span class="dino-bullet text-amber" aria-hidden="true">&bull;</span>
                            <div>
                                <strong class="text-dark">Wikipedia en español:</strong>
                                Sinopsis introductorias y descripciones bajo licencia
                                <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener noreferrer" class="dino-link">Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)</a>.
                            </div>
                        </li>
                        <li class="d-flex align-items-start gap-2">
                            <span class="dino-bullet text-amber" aria-hidden="true">&bull;</span>
                            <div>
                                <strong class="text-dark">Wikimedia Commons:</strong>
                                Fotografías y paleoarte de especies semilla bajo sus respectivas licencias libres especificadas en cada ficha.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="dino-footer-bottom border-top pt-3 mt-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-muted">
                <div>
                    &copy; @DateTime.UtcNow.Year Dinosaurios del Mesozoico. Consulta científica abierta.
                </div>
                <div>
                    Estratigrafía ICS v2024/05
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>`,
  },
  {
    id: "index",
    path: "Views/Dinosaurios/Index.cshtml",
    title: "2. Views/Dinosaurios/Index.cshtml",
    language: "razor",
    description: "Catálogo estratigráfico: Escala interactiva, formulario GET, agrupación por épocas (Model.GroupBy), fichas para especies ilustradas vs placas de huella fósil, estados vacíos y paginación con gaps.",
    code: `@*
    =============================================================================
    Web_Dinosaurios — Views/Dinosaurios/Index.cshtml
    Catálogo Estratigráfico y Taxonómico de Dinosaurios del Mesozoico
    Modelo: IReadOnlyList<Web_Dinosaurios.Models.Dinosaurio>
    =============================================================================
*@
@model IReadOnlyList<Web_Dinosaurios.Models.Dinosaurio>
@{
    ViewData["Title"] = "Catálogo Estratigráfico";

    var nombreActual = ViewData["NombreActual"] as string ?? string.Empty;
    var periodoActual = ViewData["PeriodoActual"] as string ?? string.Empty;
    var periodosValidos = ViewData["PeriodosValidos"] as string[] ?? Array.Empty<string>();
    var dietaActual = ViewData["DietaActual"] as string ?? string.Empty;
    var dietasValidas = ViewData["DietasValidas"] as string[] ?? Array.Empty<string>();
    var conImagenActual = ViewData["ConImagenActual"] as bool? ?? false;

    var pagina = ViewData["Pagina"] as int? ?? 1;
    var totalPaginas = ViewData["TotalPaginas"] as int? ?? 1;
    var total = ViewData["Total"] as int? ?? 0;
    var tamanoPagina = ViewData["TamanoPagina"] as int? ?? 24;

    var hayFiltros = !string.IsNullOrWhiteSpace(nombreActual)
                  || !string.IsNullOrWhiteSpace(periodoActual)
                  || !string.IsNullOrWhiteSpace(dietaActual)
                  || conImagenActual;

    var desde = total == 0 ? 0 : ((pagina - 1) * tamanoPagina) + 1;
    var hasta = Math.Min(pagina * tamanoPagina, total);

    // Agrupación estratigráfica por Época/Período conservando el orden SQL (más reciente a más antiguo)
    var estratos = Model.GroupBy(d => d.Periodo).ToList();
}

<div class="container-xxl py-4 py-lg-5">

    <!-- Encabezado de la Colección y Presentación de la Escala -->
    <section class="dino-hero mb-4 pb-3 border-bottom">
        <div class="row align-items-end g-3">
            <div class="col-12 col-lg-8">
                <span class="dino-kicker text-uppercase tracking-widest text-muted small fw-semibold">
                    Registro Fósil Global · 251,9 a 66 Ma
                </span>
                <h1 class="dino-title display-5 fw-bold text-dark mt-1 mb-2">
                    Fauna Dinosauriana del Mesozoico
                </h1>
                <p class="dino-lede text-muted mb-0">
                    Explora 1.617 taxones ordenados cronoestratigráficamente desde las capas terminales del Cretácico
                    hasta los albores del Triásico. Filtra por época geológica, régimen trófico o presencia de fotografía histórica.
                </p>
            </div>
            <div class="col-12 col-lg-4 text-lg-end">
                <div class="dino-counter-plate d-inline-block text-start text-lg-end">
                    <span class="d-block small text-muted text-uppercase tracking-wider">Muestra en catálogo</span>
                    <span class="dino-counter-num dino-mono-num fw-bold">@total.ToString("N0")</span>
                    <span class="d-block small text-muted">especies clasificadas</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Escala Estratigráfica Interactiva (Selector Visual Rápido) -->
    <section class="dino-scale-section mb-4" id="escala-mesozoica" aria-label="Selector de Período Geológico">
        <div class="dino-scale-bar p-2 rounded-3 border">
            <div class="row g-2 align-items-center">
                <div class="col-6 col-md-3">
                    <a asp-controller="Dinosaurios"
                       asp-action="Index"
                       asp-route-nombre="@nombreActual"
                       asp-route-periodo=""
                       asp-route-dieta="@dietaActual"
                       asp-route-conImagen="@(conImagenActual ? "true" : null)"
                       class="dino-scale-btn w-100 text-decoration-none @(string.IsNullOrEmpty(periodoActual) ? "dino-scale-active" : "")">
                        <span class="dino-scale-tag">Era Completa</span>
                        <span class="dino-scale-name">Mesozoico</span>
                        <span class="dino-scale-ma dino-mono-num">251,9–66 Ma</span>
                    </a>
                </div>
                <div class="col-6 col-md-3">
                    <a asp-controller="Dinosaurios"
                       asp-action="Index"
                       asp-route-nombre="@nombreActual"
                       asp-route-periodo="Cretácico"
                       asp-route-dieta="@dietaActual"
                       asp-route-conImagen="@(conImagenActual ? "true" : null)"
                       class="dino-scale-btn dino-scale-cretacico w-100 text-decoration-none @(periodoActual == "Cretácico" ? "dino-scale-active" : "")">
                        <span class="dino-scale-tag">Último período</span>
                        <span class="dino-scale-name">Cretácico</span>
                        <span class="dino-scale-ma dino-mono-num">145–66 Ma</span>
                    </a>
                </div>
                <div class="col-6 col-md-3">
                    <a asp-controller="Dinosaurios"
                       asp-action="Index"
                       asp-route-nombre="@nombreActual"
                       asp-route-periodo="Jurásico"
                       asp-route-dieta="@dietaActual"
                       asp-route-conImagen="@(conImagenActual ? "true" : null)"
                       class="dino-scale-btn dino-scale-jurasico w-100 text-decoration-none @(periodoActual == "Jurásico" ? "dino-scale-active" : "")">
                        <span class="dino-scale-tag">Apogeo de gigantes</span>
                        <span class="dino-scale-name">Jurásico</span>
                        <span class="dino-scale-ma dino-mono-num">201,4–145 Ma</span>
                    </a>
                </div>
                <div class="col-6 col-md-3">
                    <a asp-controller="Dinosaurios"
                       asp-action="Index"
                       asp-route-nombre="@nombreActual"
                       asp-route-periodo="Triásico"
                       asp-route-dieta="@dietaActual"
                       asp-route-conImagen="@(conImagenActual ? "true" : null)"
                       class="dino-scale-btn dino-scale-triasico w-100 text-decoration-none @(periodoActual == "Triásico" ? "dino-scale-active" : "")">
                        <span class="dino-scale-tag">Radiación basal</span>
                        <span class="dino-scale-name">Triásico</span>
                        <span class="dino-scale-ma dino-mono-num">251,9–201,4 Ma</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Barra de Filtros y Búsqueda GET -->
    <section class="dino-filters-panel p-3 p-md-4 rounded-3 border mb-4" aria-label="Herramientas de filtrado">
        <form method="get" asp-controller="Dinosaurios" asp-action="Index" class="row g-3 align-items-end">
            <!-- Búsqueda por Nombre / Taxón -->
            <div class="col-12 col-md-4 col-lg-3">
                <label for="filtro-nombre" class="form-label dino-label">Nombre científico o género</label>
                <div class="input-group">
                    <input type="text"
                           id="filtro-nombre"
                           name="nombre"
                           value="@nombreActual"
                           class="form-control dino-input"
                           placeholder="p. ej. Tyrannosaurus, Coelophysis..."
                           autocomplete="off" />
                </div>
            </div>

            <!-- Período Geológico -->
            <div class="col-6 col-md-3 col-lg-2">
                <label for="filtro-periodo" class="form-label dino-label">Período</label>
                <select id="filtro-periodo" name="periodo" class="form-select dino-select">
                    <option value="">Todos los períodos</option>
                    @foreach (var p in periodosValidos)
                    {
                        if (string.Equals(p, periodoActual, StringComparison.OrdinalIgnoreCase))
                        {
                            <option value="@p" selected="selected">@p</option>
                        }
                        else
                        {
                            <option value="@p">@p</option>
                        }
                    }
                </select>
            </div>

            <!-- Dieta / Régimen Trófico -->
            <div class="col-6 col-md-3 col-lg-2">
                <label for="filtro-dieta" class="form-label dino-label">Dieta</label>
                <select id="filtro-dieta" name="dieta" class="form-select dino-select">
                    <option value="">Todas las dietas</option>
                    @foreach (var d in dietasValidas)
                    {
                        if (string.Equals(d, dietaActual, StringComparison.OrdinalIgnoreCase))
                        {
                            <option value="@d" selected="selected">@d</option>
                        }
                        else
                        {
                            <option value="@d">@d</option>
                        }
                    }
                </select>
            </div>

            <!-- Checkbox Solo con Fotografía Histórica -->
            <div class="col-12 col-md-4 col-lg-3">
                <div class="form-check dino-check-box py-2">
                    <input class="form-check-input"
                           type="checkbox"
                           id="filtro-con-imagen"
                           name="conImagen"
                           value="true"
                           @(conImagenActual ? "checked=\"checked\"" : "") />
                    <label class="form-check-label dino-label-check" for="filtro-con-imagen">
                        Solo con fotografía (especies ilustradas)
                    </label>
                </div>
            </div>

            <!-- Botones de Acción -->
            <div class="col-12 col-md-8 col-lg-2 d-flex gap-2">
                <button type="submit" class="btn dino-btn-primary flex-grow-1">
                    Filtrar
                </button>
                @if (hayFiltros)
                {
                    <a asp-controller="Dinosaurios"
                       asp-action="Index"
                       class="btn dino-btn-ghost"
                       title="Restablecer todos los filtros"
                       aria-label="Restablecer filtros">
                        Limpiar
                    </a>
                }
            </div>
        </form>

        <!-- Indicador de filtros activos -->
        @if (hayFiltros)
        {
            <div class="dino-active-filters mt-3 pt-2 border-top d-flex flex-wrap align-items-center gap-2 small text-muted">
                <span class="fw-semibold text-dark">Filtros aplicados:</span>
                @if (!string.IsNullOrWhiteSpace(nombreActual))
                {
                    <span class="dino-filter-crumb">Texto: <em>@nombreActual</em></span>
                }
                @if (!string.IsNullOrWhiteSpace(periodoActual))
                {
                    <span class="dino-filter-crumb">Período: @periodoActual</span>
                }
                @if (!string.IsNullOrWhiteSpace(dietaActual))
                {
                    <span class="dino-filter-crumb">Dieta: @dietaActual</span>
                }
                @if (conImagenActual)
                {
                    <span class="dino-filter-crumb">Solo ilustrados</span>
                }
                <a asp-controller="Dinosaurios" asp-action="Index" class="dino-link ms-auto">Quitar todos los filtros</a>
            </div>
        }
    </section>

    <!-- Resumen de Resultados y Paginación Superior -->
    @if (total > 0 && Model.Count > 0)
    {
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center pb-3 mb-4 border-bottom text-muted small">
            <div>
                Mostrando <strong class="text-dark dino-mono-num">@desde–@hasta</strong> de <strong class="text-dark dino-mono-num">@total.ToString("N0")</strong> dinosaurios registrados
            </div>
            <div class="dino-mono-num">
                Página @pagina de @totalPaginas
            </div>
        </div>
    }

    <!-- ========================================================================= -->
    <!-- ESTADOS VACÍOS                                                           -->
    <!-- ========================================================================= -->
    @if (total > 0 && Model.Count == 0)
    {
        <!-- Caso 1: Página fuera de rango -->
        <div class="dino-empty-card p-5 text-center my-5 rounded-3 border">
            <div class="dino-empty-footprint mb-3" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
            </div>
            <h2 class="h4 fw-bold text-dark mb-2">Página fuera de estrato</h2>
            <p class="text-muted mb-4 max-w-prose mx-auto">
                La página solicitada (<span class="dino-mono-num">@pagina</span>) excede los registros disponibles para los filtros actuales.
            </p>
            <a asp-controller="Dinosaurios"
               asp-action="Index"
               asp-route-nombre="@nombreActual"
               asp-route-periodo="@periodoActual"
               asp-route-dieta="@dietaActual"
               asp-route-conImagen="@(conImagenActual ? "true" : null)"
               class="btn dino-btn-primary">
                Regresar a la página 1
            </a>
        </div>
    }
    else if (hayFiltros && total == 0)
    {
        <!-- Caso 2: Búsqueda sin coincidencias -->
        <div class="dino-empty-card p-5 text-center my-5 rounded-3 border">
            <div class="dino-empty-footprint mb-3" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
            </div>
            <h2 class="h4 fw-bold text-dark mb-2">Sin hallazgos fósiles</h2>
            <p class="text-muted mb-4 max-w-prose mx-auto">
                No existen registros que coincidan con los criterios de búsqueda seleccionados. Modifica el término o restablece los filtros estratigráficos.
            </p>
            <div class="d-flex justify-content-center gap-3">
                <a asp-controller="Dinosaurios" asp-action="Index" class="btn dino-btn-primary">
                    Ver todos los 1.617 dinosaurios
                </a>
            </div>
        </div>
    }
    else if (Model.Count == 0)
    {
        <!-- Caso 3: Catálogo vacío -->
        <div class="dino-empty-card p-5 text-center my-5 rounded-3 border">
            <h2 class="h4 fw-bold text-dark mb-2">Catálogo en catalogación</h2>
            <p class="text-muted mb-0">No hay registros paleobiológicos cargados en la base de datos.</p>
        </div>
    }
    else
    {
        <!-- ========================================================================= -->
        <!-- LISTADO AGRUPADO POR ESTRATO GEOLÓGICO                                    -->
        <!-- ========================================================================= -->
        @foreach (var estrato in estratos)
        {
            var epocaClase = Presentacion.ClasesPeriodo(estrato.Key);
            var limitesMa = Presentacion.LimitesEpoca(estrato.Key);

            <section class="dino-stratum-group mb-5" aria-labelledby="stratum-@estrato.Key.Replace(" ", "-").ToLowerInvariant()">
                <!-- Cabecera de Estrato / Época -->
                <header class="dino-stratum-header d-flex flex-wrap align-items-baseline justify-content-between gap-2 pb-2 mb-3 border-bottom @epocaClase">
                    <div class="d-flex align-items-baseline gap-3">
                        <h2 id="stratum-@estrato.Key.Replace(" ", "-").ToLowerInvariant()" class="dino-stratum-title h4 fw-bold text-dark mb-0">
                            @estrato.Key
                        </h2>
                        @if (!string.IsNullOrWhiteSpace(limitesMa))
                        {
                            <span class="dino-stratum-badge dino-mono-num">
                                @limitesMa
                            </span>
                        }
                    </div>
                    <span class="text-muted small">
                        @estrato.Count() @(estrato.Count() == 1 ? "género en este bloque" : "géneros en este bloque")
                    </span>
                </header>

                <!-- Cuadrícula de Dinosaurios de este Estrato -->
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
                    @foreach (var dino in estrato)
                    {
                        var esIcono = Presentacion.EsIcono(dino.ImagenUrl);
                        var datosBreves = Presentacion.DatosBreves(dino.Dieta, dino.Region);
                        var cardPeriodoClases = Presentacion.ClasesPeriodo(dino.Periodo);

                        <div class="col">
                            <article class="card dino-card h-100 border rounded-3 @(esIcono ? "dino-card-plate" : "dino-card-illustrated") @cardPeriodoClases">
                                
                                <!-- Zona Visual: Fotografía de alta resolución o Ficha de Campo con Huella -->
                                @if (!esIcono)
                                {
                                    <!-- Especie con Foto (Wikimedia Commons) -->
                                    <div class="dino-card-media-wrapper position-relative overflow-hidden">
                                        <img src="@dino.ImagenUrl"
                                             alt="Reconstrucción fósil de @dino.Nombre"
                                             class="dino-card-img w-100 object-fit-cover"
                                             loading="lazy"
                                             referrerpolicy="no-referrer" />
                                        <span class="dino-card-photo-tag position-absolute top-0 end-0 m-2 badge">
                                            Foto Archivo
                                        </span>
                                    </div>
                                }
                                else
                                {
                                    <!-- Especie Fósil Documentada (PBDB / Wikipedia sin foto) -->
                                    <div class="dino-card-plate-seal d-flex align-items-center justify-content-between p-3 border-bottom">
                                        <div class="dino-plate-footprint" aria-hidden="true">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C10.5 4 8.5 7.5 7 10c-1 1.6-1.5 3-1.5 4.5 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-1.5-.5-2.9-1.5-4.5-1.5-2.5-3.5-6-5-8zm-5 7c-.6 0-1.1-.4-1.3-.9L5 6.5C4.7 5.7 5.2 4.9 6 4.6c.8-.3 1.7.2 2 1l.7 1.6c.3.8-.1 1.8-.7 1.8zm10 0c-.6 0-1-.8-.7-1.8l.7-1.6c.3-.8 1.2-1.3 2-1 .8.3 1.3 1.1 1 1.9l-.7 1.6c-.2.5-.7.9-1.3.9z"/>
                                            </svg>
                                        </div>
                                        <span class="dino-plate-code dino-mono-num text-muted small">
                                            PBDB @(dino.PbdbId?.ToString() ?? $"#{dino.Id:D4}")
                                        </span>
                                    </div>
                                }

                                <div class="card-body d-flex flex-column p-3">
                                    <!-- Cronología y Época -->
                                    <div class="d-flex align-items-center justify-content-between gap-1 mb-1 small text-muted">
                                        <span class="dino-card-period text-truncate fw-semibold">
                                            @dino.Periodo
                                        </span>
                                        <span class="dino-mono-num dino-card-age text-nowrap">
                                            @dino.Antiguedad
                                        </span>
                                    </div>

                                    <!-- Nombre Científico (SIEMPRE EN CURSIVA) -->
                                    <h3 class="card-title h5 mb-2">
                                        <a asp-controller="Dinosaurios"
                                           asp-action="Detalle"
                                           asp-route-id="@dino.Id"
                                           class="dino-taxon-link text-decoration-none">
                                            <em>@dino.Nombre</em>
                                        </a>
                                    </h3>

                                    <!-- Datos Breves (Dieta, Región omitiendo Sin datos) -->
                                    <div class="dino-brief-meta text-muted small mb-2">
                                        @datosBreves
                                    </div>

                                    <!-- Sinopsis Introductoria -->
                                    <p class="card-text dino-card-desc text-muted small flex-grow-1 mb-3">
                                        @dino.Descripcion
                                    </p>

                                    <!-- Pie de Tarjeta con Enlace de Detalle -->
                                    <div class="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                                        <a asp-controller="Dinosaurios"
                                           asp-action="Detalle"
                                           asp-route-id="@dino.Id"
                                           class="dino-action-link text-decoration-none small fw-semibold">
                                            Ver ficha estratigráfica &rarr;
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    }
                </div>
            </section>
        }

        <!-- ========================================================================= -->
        <!-- PAGINACIÓN PRESERVANDO PARÁMETROS DE BÚSQUEDA                             -->
        <!-- ========================================================================= -->
        @if (totalPaginas > 1)
        {
            <nav class="dino-pagination-nav mt-5 pt-4 border-top" aria-label="Navegación de páginas del catálogo">
                <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                    <!-- Resumen de Rango Inferior -->
                    <div class="dino-pagination-info small text-muted">
                        Del <strong class="text-dark dino-mono-num">@desde</strong> al <strong class="text-dark dino-mono-num">@hasta</strong> de <strong class="text-dark dino-mono-num">@total.ToString("N0")</strong> dinosaurios
                    </div>

                    <!-- Controles de Páginas -->
                    <ul class="pagination dino-pagination mb-0 flex-wrap justify-content-center">
                        <!-- Botón Anterior -->
                        @if (pagina > 1)
                        {
                            <li class="page-item">
                                <a class="page-link"
                                   asp-controller="Dinosaurios"
                                   asp-action="Index"
                                   asp-route-nombre="@nombreActual"
                                   asp-route-periodo="@periodoActual"
                                   asp-route-dieta="@dietaActual"
                                   asp-route-conImagen="@(conImagenActual ? "true" : null)"
                                   asp-route-pagina="@(pagina == 2 ? null : (pagina - 1))"
                                   aria-label="Página anterior">
                                    &larr; Anterior
                                </a>
                            </li>
                        }
                        else
                        {
                            <li class="page-item disabled" aria-disabled="true">
                                <span class="page-link">&larr; Anterior</span>
                            </li>
                        }

                        <!-- Primera Página -->
                        <li class="page-item @(pagina == 1 ? "active" : "")">
                            <a class="page-link dino-mono-num"
                               asp-controller="Dinosaurios"
                               asp-action="Index"
                               asp-route-nombre="@nombreActual"
                               asp-route-periodo="@periodoActual"
                               asp-route-dieta="@dietaActual"
                               asp-route-conImagen="@(conImagenActual ? "true" : null)"
                               aria-label="Página 1">
                                1
                            </a>
                        </li>

                        <!-- Elipsis si hay salto antes de la ventana central -->
                        @if (pagina > 4)
                        {
                            <li class="page-item disabled" aria-disabled="true">
                                <span class="page-link">&hellip;</span>
                            </li>
                        }

                        <!-- Ventana Central de Páginas (±2) -->
                        @{
                            var inicioVentana = Math.Max(2, pagina - 2);
                            var finVentana = Math.Min(totalPaginas - 1, pagina + 2);
                        }
                        @for (int p = inicioVentana; p <= finVentana; p++)
                        {
                            <li class="page-item @(p == pagina ? "active" : "")">
                                <a class="page-link dino-mono-num"
                                   asp-controller="Dinosaurios"
                                   asp-action="Index"
                                   asp-route-nombre="@nombreActual"
                                   asp-route-periodo="@periodoActual"
                                   asp-route-dieta="@dietaActual"
                                   asp-route-conImagen="@(conImagenActual ? "true" : null)"
                                   asp-route-pagina="@p"
                                   aria-label="Página @p"
                                   aria-current="@(p == pagina ? "page" : null)">
                                    @p
                                </a>
                            </li>
                        }

                        <!-- Elipsis si hay salto tras la ventana central -->
                        @if (pagina < totalPaginas - 3)
                        {
                            <li class="page-item disabled" aria-disabled="true">
                                <span class="page-link">&hellip;</span>
                            </li>
                        }

                        <!-- Última Página -->
                        @if (totalPaginas > 1)
                        {
                            <li class="page-item @(pagina == totalPaginas ? "active" : "")">
                                <a class="page-link dino-mono-num"
                                   asp-controller="Dinosaurios"
                                   asp-action="Index"
                                   asp-route-nombre="@nombreActual"
                                   asp-route-periodo="@periodoActual"
                                   asp-route-dieta="@dietaActual"
                                   asp-route-conImagen="@(conImagenActual ? "true" : null)"
                                   asp-route-pagina="@totalPaginas"
                                   aria-label="Página @totalPaginas">
                                    @totalPaginas
                                </a>
                            </li>
                        }

                        <!-- Botón Siguiente -->
                        @if (pagina < totalPaginas)
                        {
                            <li class="page-item">
                                <a class="page-link"
                                   asp-controller="Dinosaurios"
                                   asp-action="Index"
                                   asp-route-nombre="@nombreActual"
                                   asp-route-periodo="@periodoActual"
                                   asp-route-dieta="@dietaActual"
                                   asp-route-conImagen="@(conImagenActual ? "true" : null)"
                                   asp-route-pagina="@(pagina + 1)"
                                   aria-label="Página siguiente">
                                    Siguiente &rarr;
                                </a>
                            </li>
                        }
                        else
                        {
                            <li class="page-item disabled" aria-disabled="true">
                                <span class="page-link">Siguiente &rarr;</span>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        }
    }

</div>`,
  },
  {
    id: "detalle",
    path: "Views/Dinosaurios/Detalle.cshtml",
    title: "3. Views/Dinosaurios/Detalle.cshtml",
    language: "razor",
    description: "Ficha de detalle: Acceso monográfico, visualizador de espécimen, crédito obligatorio de Wikimedia Commons para fotos, placa testimonial para fósiles sin foto (icono.svg), grilla de metadatos biológicos y enlace a fuente primaria.",
    code: `@*
    =============================================================================
    Web_Dinosaurios — Views/Dinosaurios/Detalle.cshtml
    Ficha Paleobiológica y Estratigráfica de Detalle
    Modelo: Web_Dinosaurios.Models.Dinosaurio
    =============================================================================
*@
@model Web_Dinosaurios.Models.Dinosaurio
@{
    ViewData["Title"] = Model.Nombre;

    var esIcono = Presentacion.EsIcono(Model.ImagenUrl);
    var clasesPeriodo = Presentacion.ClasesPeriodo(Model.Periodo);
    var limitesEpoca = Presentacion.LimitesEpoca(Model.Periodo);
    var textoFuente = Presentacion.TextoFuente(Model.FuenteUrl);
}

<article class="dino-detail-page py-4 py-lg-5" aria-labelledby="dino-taxon-heading">
    <div class="container-xxl">

        <!-- Barra de Navegación Retrospectiva (Volver al Catálogo) -->
        <nav class="dino-breadcrumbs mb-4" aria-label="Migas de pan">
            <div class="d-flex align-items-center justify-content-between">
                <a asp-controller="Dinosaurios"
                   asp-action="Index"
                   class="dino-back-link text-decoration-none d-inline-flex align-items-center gap-2 small fw-semibold">
                    <span aria-hidden="true">&larr;</span> Volver al catálogo cronoestratigráfico
                </a>
                <span class="dino-mono-num text-muted small">
                    Ficha ID: #@Model.Id.ToString("D4")
                </span>
            </div>
        </nav>

        <!-- Cabecera Taxonómica Principal -->
        <header class="dino-detail-header pb-4 mb-4 border-bottom @clasesPeriodo">
            <div class="row align-items-start g-3">
                <div class="col-12 col-lg-8">
                    <!-- Época y Rango Cronológico -->
                    <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                        <span class="dino-badge-epoch fw-semibold">
                            @Model.Periodo
                        </span>
                        @if (!string.IsNullOrWhiteSpace(limitesEpoca))
                        {
                            <span class="dino-mono-num text-muted small">
                                (@limitesEpoca)
                            </span>
                        }
                        <span class="text-muted" aria-hidden="true">·</span>
                        <span class="dino-mono-num text-muted small">
                            @Model.Antiguedad
                        </span>
                    </div>

                    <!-- Nombre del Género / Especie (Siempre en cursiva) -->
                    <h1 id="dino-taxon-heading" class="dino-detail-title display-4 fw-bold text-dark mb-2">
                        <em>@Model.Nombre</em>
                    </h1>

                    <p class="dino-detail-subtitle text-muted mb-0">
                        Clasificación de dinosaurio no aviano registrado en los estratos del período @Model.Periodo.
                    </p>
                </div>

                <!-- Placa de Contexto Geocronológico -->
                <div class="col-12 col-lg-4 text-lg-end">
                    <div class="dino-age-card p-3 rounded-3 border d-inline-block text-start text-lg-end">
                        <span class="d-block small text-muted text-uppercase tracking-wider">Antigüedad Estratigráfica</span>
                        <span class="dino-age-value dino-mono-num fw-bold d-block">
                            @(Model.EdadMaxMa.HasValue ? $"~{Model.EdadMaxMa.Value:F1} Ma" : Model.Antiguedad)
                        </span>
                        <span class="d-block small text-muted">
                            Límite geológico máximo
                        </span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Bloque Central: Ficha Visual + Prosa Curatorial -->
        <div class="row g-4 g-xl-5">

            <!-- Columna Izquierda: Imagen de Reconstrucción o Placa Fósil de Campo -->
            <div class="col-12 col-lg-6">
                <div class="dino-specimen-display border rounded-3 overflow-hidden">
                    @if (!esIcono)
                    {
                        <!-- Especie con Fotografía Histórica / Paleoarte (Wikimedia Commons) -->
                        <figure class="m-0 position-relative">
                            <div class="dino-media-frame bg-light text-center p-2">
                                <img src="@Model.ImagenUrl"
                                     alt="Reconstrucción fósil o paleoartística de @Model.Nombre"
                                     class="dino-detail-img img-fluid rounded"
                                     loading="eager"
                                     referrerpolicy="no-referrer" />
                            </div>
                            <!-- Crédito obligatorio de la imagen para Wikimedia Commons -->
                            @if (!string.IsNullOrWhiteSpace(Model.CreditoImagen))
                            {
                                <figcaption class="dino-media-caption p-3 border-top small text-muted">
                                    <strong class="d-block text-dark fw-semibold mb-1">Crédito de la ilustración / fotografía:</strong>
                                    <span>@Model.CreditoImagen</span>
                                </figcaption>
                            }
                        </figure>
                    }
                    else
                    {
                        <!-- Especie Fósil sin Imagen Individual (PBDB / Wikipedia) -->
                        <div class="dino-plate-specimen p-4 p-md-5 text-center">
                            <div class="dino-fossil-stamp mx-auto mb-4" aria-hidden="true">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C10.5 4 8.5 7.5 7 10c-1 1.6-1.5 3-1.5 4.5 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-1.5-.5-2.9-1.5-4.5-1.5-2.5-3.5-6-5-8zm-5 7c-.6 0-1.1-.4-1.3-.9L5 6.5C4.7 5.7 5.2 4.9 6 4.6c.8-.3 1.7.2 2 1l.7 1.6c.3.8-.1 1.8-.7 1.8zm10 0c-.6 0-1-.8-.7-1.8l.7-1.6c.3-.8 1.2-1.3 2-1 .8.3 1.3 1.1 1 1.9l-.7 1.6c-.2.5-.7.9-1.3.9z"/>
                                </svg>
                            </div>
                            <h2 class="h5 fw-bold text-dark mb-2">Ficha Taxonómica de Registro Paleobiológico</h2>
                            <p class="text-muted small mb-3 max-w-prose mx-auto">
                                Este taxón cuenta con registro catalogado en la <em>Paleobiology Database</em> (PBDB) y en la enciclopedia libre, pero no dispone aún de una fotografía con licencia libre en el archivo de Wikimedia Commons.
                            </p>
                            <div class="dino-specimen-id-box d-inline-block py-2 px-3 rounded border text-muted small dino-mono-num">
                                Colección PBDB: @(Model.PbdbId?.ToString() ?? "Sin identificador numérico")
                            </div>
                        </div>
                    }
                </div>

                <!-- Placa de Atributos Paleobiológicos -->
                <div class="dino-attributes-card mt-4 p-3 p-md-4 rounded-3 border">
                    <h2 class="h6 text-uppercase tracking-wider fw-bold text-dark mb-3">
                        Ficha Biológica y Geográfica
                    </h2>
                    <dl class="dino-meta-list mb-0">
                        <!-- Régimen Trófico -->
                        <div class="dino-meta-row py-2 border-bottom d-flex justify-content-between align-items-center">
                            <dt class="text-muted small fw-medium mb-0">Régimen Trófico (Dieta)</dt>
                            <dd class="text-dark fw-semibold small mb-0">@Model.Dieta</dd>
                        </div>

                        <!-- Distribución Paleogeográfica -->
                        <div class="dino-meta-row py-2 border-bottom d-flex justify-content-between align-items-center">
                            <dt class="text-muted small fw-medium mb-0">Región de Hallazgo</dt>
                            <dd class="text-dark fw-semibold small mb-0">@Model.Region</dd>
                        </div>

                        <!-- Época ICS -->
                        <div class="dino-meta-row py-2 border-bottom d-flex justify-content-between align-items-center">
                            <dt class="text-muted small fw-medium mb-0">Época Estratigráfica</dt>
                            <dd class="text-dark fw-semibold small mb-0">@Model.Periodo</dd>
                        </div>

                        <!-- Antigüedad estimada -->
                        <div class="dino-meta-row py-2 border-bottom d-flex justify-content-between align-items-center">
                            <dt class="text-muted small fw-medium mb-0">Antigüedad Aproximada</dt>
                            <dd class="text-dark dino-mono-num small mb-0">@Model.Antiguedad</dd>
                        </div>

                        <!-- Identificador PBDB -->
                        @if (Model.PbdbId.HasValue)
                        {
                            <div class="dino-meta-row py-2 border-bottom d-flex justify-content-between align-items-center">
                                <dt class="text-muted small fw-medium mb-0">Referencia Paleobiology Database</dt>
                                <dd class="text-dark dino-mono-num small mb-0">#@Model.PbdbId.Value</dd>
                            </div>
                        }

                        <!-- Edad Máxima Ma -->
                        @if (Model.EdadMaxMa.HasValue)
                        {
                            <div class="dino-meta-row py-2 d-flex justify-content-between align-items-center">
                                <dt class="text-muted small fw-medium mb-0">Límite Superior (EdadMaxMa)</dt>
                                <dd class="text-dark dino-mono-num small mb-0">@Model.EdadMaxMa.Value.ToString("F2") Ma</dd>
                            </div>
                        }
                    </dl>
                </div>
            </div>

            <!-- Columna Derecha: Sinopsis Monográfica y Fuente de Consulta -->
            <div class="col-12 col-lg-6">
                <section class="dino-essay-section" aria-labelledby="heading-sinopsis">
                    <span class="dino-kicker text-uppercase tracking-widest text-muted small fw-semibold">
                        Registro Monográfico
                    </span>
                    <h2 id="heading-sinopsis" class="h3 fw-bold text-dark mt-1 mb-3">
                        Descripción Paleontológica
                    </h2>

                    <!-- Texto con Medida de Lectura Editorial (65–75ch) -->
                    <div class="dino-prose mb-4">
                        <p class="dino-lead-paragraph">
                            @Model.Descripcion
                        </p>
                    </div>

                    <!-- Caja de Fuente Científica y Lectura Externa -->
                    <div class="dino-source-card p-4 rounded-3 border bg-white mb-4">
                        <div class="d-flex align-items-start gap-3">
                            <div class="dino-source-icon mt-1" aria-hidden="true">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                                </svg>
                            </div>
                            <div class="flex-grow-1">
                                <h3 class="h6 fw-bold text-dark mb-1">Fuente y documentación primaria</h3>
                                <p class="small text-muted mb-3">
                                    Para acceder a la bibliografía completa, sinapomorfias morfológicas y coordenadas estratigráficas de los yacimientos:
                                </p>
                                @if (!string.IsNullOrWhiteSpace(Model.FuenteUrl))
                                {
                                    <a href="@Model.FuenteUrl"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       class="btn dino-btn-primary btn-sm d-inline-flex align-items-center gap-2">
                                        <span>@textoFuente</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                            <polyline points="15 3 21 3 21 9"/>
                                            <line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                    </a>
                                }
                                else
                                {
                                    <span class="text-muted small">Fuente primaria no enlazada en la base de datos.</span>
                                }
                            </div>
                        </div>
                    </div>

                    <!-- Enlace Rápido de Regreso -->
                    <div class="pt-3 border-top">
                        <a asp-controller="Dinosaurios"
                           asp-action="Index"
                           class="btn dino-btn-secondary">
                            &larr; Explorar más dinosaurios del catálogo
                        </a>
                    </div>
                </section>
            </div>

        </div>

    </div>
</article>`,
  },
  {
    id: "css",
    path: "wwwroot/css/site.css",
    title: "4. wwwroot/css/site.css",
    language: "css",
    description: "Hoja de estilos completa: Paleta calcárea, tipografía Fraunces/Cinzel/Jakarta/JetBrains, código de color ICS para Cretácico, Jurásico y Triásico, tarjetas de fósiles, accesibilidad WCAG AA y prefers-reduced-motion.",
    code: `/*
=============================================================================
Web_Dinosaurios — wwwroot/css/site.css
Diseño Editorial de Museo Paleobiológico y Estratigrafía Mesozoica
Compatibilidad: ASP.NET Core 8 MVC · Bootstrap 5 · WCAG AA
=============================================================================
*/

/* -------------------------------------------------------------------------
   1. VARIABLES DE DISEÑO & TOKENS PALEONTOLÓGICOS
   ------------------------------------------------------------------------- */
:root {
    /* Tipografía Curatorial */
    --dino-font-display: 'Fraunces', Georgia, serif;
    --dino-font-strata: 'Cinzel', Georgia, serif;
    --dino-font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    --dino-font-mono: 'JetBrains Mono', SFMono-Regular, Consolas, monospace;

    /* Lienzo y Superficies Calcáreas */
    --dino-bg: #F8F6F0;
    --dino-surface: #FFFFFF;
    --dino-surface-subtle: #F2EFE7;
    --dino-border: #E5DFC9;
    --dino-border-subtle: #ECE8DC;

    /* Tintas Paleontológicas (Contraste estricto WCAG AA) */
    --dino-ink: #1F1B18;
    --dino-ink-muted: #645C52;
    --dino-ink-faint: #8E8476;

    /* Acentos Primarios de Campo (Ocre y Terracota) */
    --dino-amber: #B45309;
    --dino-amber-dark: #92400E;
    --dino-amber-light: #FEF3C7;
    --dino-terracotta: #9A3412;

    /* Códigos Cronoestratigráficos Internacionales (ICS) */
    /* Cretácico (145–66 Ma): Verde Tiza Continental */
    --dino-cretacico-base: #166534;
    --dino-cretacico-bg: #F0FDF4;
    --dino-cretacico-border: #BBF7D0;
    --dino-cretacico-text: #14532D;

    /* Jurásico (201,4–145 Ma): Azul Marino Estratigráfico */
    --dino-jurasico-base: #1E3A8A;
    --dino-jurasico-bg: #EFF6FF;
    --dino-jurasico-border: #BFDBFE;
    --dino-jurasico-text: #1E40AF;

    /* Triásico (251,9–201,4 Ma): Rojo Arcilloso Basal */
    --dino-triasico-base: #991B1B;
    --dino-triasico-bg: #FEF2F2;
    --dino-triasico-border: #FECACA;
    --dino-triasico-text: #991B1B;

    /* Sombras Naturales y Transiciones */
    --dino-shadow-sm: 0 1px 3px rgba(31, 27, 24, 0.05);
    --dino-shadow-md: 0 4px 12px rgba(31, 27, 24, 0.07);
    --dino-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

/* -------------------------------------------------------------------------
   2. ESTILOS GLOBALES & TIPOGRAFÍA BASE
   ------------------------------------------------------------------------- */
html {
    scroll-behavior: smooth;
}

body.dino-body {
    background-color: var(--dino-bg);
    color: var(--dino-ink);
    font-family: var(--dino-font-sans);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Cifras Tabulares Monospaciadas */
.dino-mono-num {
    font-family: var(--dino-font-mono);
    font-feature-settings: "tnum" 1, "zero" 1;
    letter-spacing: -0.02em;
}

/* Títulos y Nombres Científicos */
.dino-title,
.dino-detail-title,
.dino-card-title,
.dino-taxon-link {
    font-family: var(--dino-font-display);
    font-feature-settings: "liga" 1;
}

/* -------------------------------------------------------------------------
   3. CABECERA & CINTA ESTRATIGRÁFICA
   ------------------------------------------------------------------------- */
.dino-header {
    background-color: rgba(248, 246, 240, 0.95);
    backdrop-filter: blur(8px);
    border-color: var(--dino-border) !important;
    z-index: 1020;
}

.dino-brand-sub {
    display: block;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 700;
    color: var(--dino-amber);
}

.dino-brand-title {
    font-family: var(--dino-font-strata);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dino-ink);
    letter-spacing: 0.04em;
}

.dino-nav-link {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--dino-ink-muted);
    transition: color 0.15s ease;
}

.dino-nav-link:hover {
    color: var(--dino-amber);
}

.dino-strata-strip {
    background-color: var(--dino-surface);
    border-top: 1px solid var(--dino-border-subtle);
    border-bottom: 1px solid var(--dino-border);
    font-size: 0.8125rem;
}

.dino-strip-item {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.dino-strip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
}

.dino-strip-cretacico .dino-strip-dot { background-color: var(--dino-cretacico-base); }
.dino-strip-jurasico .dino-strip-dot { background-color: var(--dino-jurasico-base); }
.dino-strip-triasico .dino-strip-dot { background-color: var(--dino-triasico-base); }

.dino-strip-divider {
    color: var(--dino-border);
}

/* -------------------------------------------------------------------------
   4. BOTONES & CONTROLES
   ------------------------------------------------------------------------- */
.btn.dino-btn-primary {
    background-color: var(--dino-ink);
    color: #FFFFFF;
    border: 1px solid var(--dino-ink);
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.15s var(--dino-ease);
}

.btn.dino-btn-primary:hover,
.btn.dino-btn-primary:focus {
    background-color: var(--dino-amber-dark);
    border-color: var(--dino-amber-dark);
    color: #FFFFFF;
}

.btn.dino-btn-secondary {
    background-color: transparent;
    color: var(--dino-ink);
    border: 1px solid var(--dino-border);
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.15s var(--dino-ease);
}

.btn.dino-btn-secondary:hover {
    background-color: var(--dino-surface);
    border-color: var(--dino-ink);
    color: var(--dino-ink);
}

.btn.dino-btn-ghost {
    background-color: transparent;
    color: var(--dino-ink-muted);
    border: 1px solid transparent;
    font-weight: 600;
    padding: 0.5rem 0.875rem;
}

.btn.dino-btn-ghost:hover {
    color: var(--dino-ink);
    background-color: rgba(0, 0, 0, 0.04);
}

.dino-link {
    color: var(--dino-amber);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.15s ease;
}

.dino-link:hover {
    color: var(--dino-amber-dark);
}

/* -------------------------------------------------------------------------
   5. ESCALA ESTRATIGRÁFICA INTERACTIVA (SELECTOR VISUAL)
   ------------------------------------------------------------------------- */
.dino-scale-bar {
    background-color: var(--dino-surface);
    border-color: var(--dino-border) !important;
}

.dino-scale-btn {
    display: flex;
    flex-direction: column;
    padding: 0.625rem 0.875rem;
    border-radius: 6px;
    background-color: var(--dino-surface);
    border: 1px solid var(--dino-border-subtle);
    color: var(--dino-ink);
    transition: all 0.15s var(--dino-ease);
    text-align: left;
}

.dino-scale-btn:hover {
    border-color: var(--dino-ink);
    transform: translateY(-1px);
    box-shadow: var(--dino-shadow-sm);
}

.dino-scale-tag {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--dino-ink-muted);
    font-weight: 600;
}

.dino-scale-name {
    font-family: var(--dino-font-strata);
    font-size: 1rem;
    font-weight: 700;
    margin-top: 2px;
}

.dino-scale-ma {
    font-size: 0.75rem;
    color: var(--dino-ink-muted);
}

/* Estados activos por período */
.dino-scale-btn.dino-scale-active {
    background-color: var(--dino-ink);
    border-color: var(--dino-ink);
    color: #FFFFFF;
}

.dino-scale-btn.dino-scale-active .dino-scale-tag,
.dino-scale-btn.dino-scale-active .dino-scale-ma {
    color: rgba(255, 255, 255, 0.75);
}

.dino-scale-cretacico.dino-scale-active {
    background-color: var(--dino-cretacico-base);
    border-color: var(--dino-cretacico-base);
}

.dino-scale-jurasico.dino-scale-active {
    background-color: var(--dino-jurasico-base);
    border-color: var(--dino-jurasico-base);
}

.dino-scale-triasico.dino-scale-active {
    background-color: var(--dino-triasico-base);
    border-color: var(--dino-triasico-base);
}

/* -------------------------------------------------------------------------
   6. PANEL DE FILTROS & BÚSQUEDA
   ------------------------------------------------------------------------- */
.dino-filters-panel {
    background-color: var(--dino-surface);
    border-color: var(--dino-border) !important;
    box-shadow: var(--dino-shadow-sm);
}

.dino-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--dino-ink);
    margin-bottom: 0.375rem;
}

.dino-input,
.dino-select {
    border-color: var(--dino-border);
    background-color: #FFFFFF;
    color: var(--dino-ink);
    font-size: 0.875rem;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
}

.dino-input:focus,
.dino-select:focus {
    border-color: var(--dino-amber);
    box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.15);
}

.dino-label-check {
    font-size: 0.8125rem;
    color: var(--dino-ink);
    font-weight: 500;
    cursor: pointer;
}

.dino-filter-crumb {
    background-color: var(--dino-surface-subtle);
    border: 1px solid var(--dino-border);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    color: var(--dino-ink);
}

.dino-counter-plate {
    background-color: var(--dino-surface);
    border: 1px solid var(--dino-border);
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
}

.dino-counter-num {
    font-size: 1.75rem;
    color: var(--dino-ink);
    line-height: 1.1;
}

/* -------------------------------------------------------------------------
   7. CABECERAS DE ESTRATO & CLASES DE PERÍODO (Presentacion.ClasesPeriodo)
   ------------------------------------------------------------------------- */
.dino-stratum-header {
    border-bottom: 2px solid var(--dino-border) !important;
}

.dino-stratum-title {
    font-family: var(--dino-font-strata);
    letter-spacing: 0.03em;
}

.dino-stratum-badge {
    background-color: var(--dino-surface);
    border: 1px solid var(--dino-border);
    color: var(--dino-ink-muted);
    font-size: 0.8125rem;
    padding: 0.25rem 0.625rem;
    border-radius: 4px;
}

/* Resaltado de Estratos según ICS */
.dino-stratum-header.dino-cretacico {
    border-bottom-color: var(--dino-cretacico-base) !important;
}
.dino-stratum-header.dino-cretacico .dino-stratum-title {
    color: var(--dino-cretacico-text);
}

.dino-stratum-header.dino-jurasico {
    border-bottom-color: var(--dino-jurasico-base) !important;
}
.dino-stratum-header.dino-jurasico .dino-stratum-title {
    color: var(--dino-jurasico-text);
}

.dino-stratum-header.dino-triasico {
    border-bottom-color: var(--dino-triasico-base) !important;
}
.dino-stratum-header.dino-triasico .dino-stratum-title {
    color: var(--dino-triasico-text);
}

/* -------------------------------------------------------------------------
   8. TARJETAS DE DINOSAURIO (ILUSTRADAS VS PLACAS FÓSILES DE CAMPO)
   ------------------------------------------------------------------------- */
.dino-card {
    background-color: var(--dino-surface);
    border-color: var(--dino-border) !important;
    transition: transform 0.2s var(--dino-ease), box-shadow 0.2s var(--dino-ease);
}

.dino-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--dino-shadow-md);
    border-color: var(--dino-amber) !important;
}

/* Especies Ilustradas con Foto */
.dino-card-media-wrapper {
    height: 180px;
    background-color: #EFECE6;
}

.dino-card-img {
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease;
}

.dino-card:hover .dino-card-img {
    transform: scale(1.03);
}

.dino-card-photo-tag {
    background-color: rgba(31, 27, 24, 0.85);
    color: #FFFFFF;
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

/* Especies sin Foto: Placas Fósiles de Campo Intencionales */
.dino-card-plate {
    background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F3 100%);
}

.dino-card-plate-seal {
    background-color: var(--dino-surface-subtle);
    border-color: var(--dino-border-subtle) !important;
}

.dino-plate-footprint {
    color: var(--dino-amber);
    opacity: 0.85;
}

.dino-taxon-link {
    color: var(--dino-ink);
    font-weight: 700;
    transition: color 0.15s ease;
}

.dino-taxon-link:hover {
    color: var(--dino-amber);
}

.dino-taxon-link em {
    font-style: italic;
}

.dino-card-desc {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
}

.dino-action-link {
    color: var(--dino-amber);
}

.dino-action-link:hover {
    color: var(--dino-amber-dark);
}

/* -------------------------------------------------------------------------
   9. VISTA DE DETALLE & ACCESIÓN MONOGRÁFICA
   ------------------------------------------------------------------------- */
.dino-back-link {
    color: var(--dino-ink-muted);
    transition: color 0.15s ease;
}

.dino-back-link:hover {
    color: var(--dino-ink);
}

.dino-detail-header.dino-cretacico { border-bottom-color: var(--dino-cretacico-border) !important; }
.dino-detail-header.dino-jurasico  { border-bottom-color: var(--dino-jurasico-border) !important; }
.dino-detail-header.dino-triasico  { border-bottom-color: var(--dino-triasico-border) !important; }

.dino-badge-epoch {
    background-color: var(--dino-surface-subtle);
    border: 1px solid var(--dino-border);
    color: var(--dino-ink);
    font-size: 0.8125rem;
    padding: 0.25rem 0.625rem;
    border-radius: 4px;
}

.dino-age-card {
    background-color: var(--dino-surface);
    border-color: var(--dino-border) !important;
}

.dino-age-value {
    font-size: 1.5rem;
    color: var(--dino-amber-dark);
}

.dino-specimen-display {
    background-color: var(--dino-surface);
    border-color: var(--dino-border) !important;
}

.dino-media-frame {
    background-color: #FAF8F4;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dino-detail-img {
    max-height: 480px;
    object-fit: contain;
}

.dino-plate-specimen {
    background: radial-gradient(circle at center, #FFFFFF 0%, #F5F1E8 100%);
}

.dino-fossil-stamp {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background-color: var(--dino-surface-subtle);
    border: 2px dashed var(--dino-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dino-amber);
}

.dino-attributes-card {
    background-color: var(--dino-surface);
    border-color: var(--dino-border) !important;
}

.dino-meta-row {
    border-color: var(--dino-border-subtle) !important;
}

.dino-lead-paragraph {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--dino-ink);
    max-width: 68ch;
}

.dino-lead-paragraph::first-letter {
    font-family: var(--dino-font-display);
    font-size: 3.5rem;
    line-height: 0.85;
    float: left;
    margin-right: 0.5rem;
    color: var(--dino-amber-dark);
    font-weight: 700;
}

.dino-source-card {
    border-color: var(--dino-border) !important;
    background-color: var(--dino-surface);
}

.dino-source-icon {
    color: var(--dino-amber);
}

/* -------------------------------------------------------------------------
   10. PAGINACIÓN ACCESIBLE
   ------------------------------------------------------------------------- */
.dino-pagination .page-item .page-link {
    color: var(--dino-ink);
    background-color: var(--dino-surface);
    border-color: var(--dino-border);
    font-size: 0.875rem;
    padding: 0.45rem 0.85rem;
    transition: all 0.15s ease;
}

.dino-pagination .page-item:hover .page-link {
    color: var(--dino-amber);
    border-color: var(--dino-ink);
}

.dino-pagination .page-item.active .page-link {
    background-color: var(--dino-ink);
    border-color: var(--dino-ink);
    color: #FFFFFF;
    font-weight: 700;
}

.dino-pagination .page-item.disabled .page-link {
    color: var(--dino-ink-faint);
    background-color: var(--dino-surface-subtle);
    border-color: var(--dino-border-subtle);
}

/* -------------------------------------------------------------------------
   11. ACCESIBILIDAD, FOCO & REDUCED MOTION
   ------------------------------------------------------------------------- */
:focus-visible {
    outline: 2px solid var(--dino-amber) !important;
    outline-offset: 2px !important;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    .dino-card:hover {
        transform: none;
    }

    .dino-card:hover .dino-card-img {
        transform: none;
    }
}
`,
  },
];
