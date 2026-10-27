/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowLeft, 
  Layers, 
  FileCode2, 
  BookOpen, 
  Sparkles,
  Info,
  RotateCcw,
  Footprints
} from 'lucide-react';
import { DINOSAURIOS_SAMPLE, Dinosaurio } from './data/dinosaurios';
import { Presentacion } from './helpers/presentacion';
import { RAZOR_FILES } from './data/razorFiles';

type ActiveView = 'catalog' | 'detail' | 'code-inspector';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('catalog');
  const [selectedDinoId, setSelectedDinoId] = useState<number>(1);
  const [activeCodeFileId, setActiveCodeFileId] = useState<string>('index');
  const [copiedFileId, setCopiedFileId] = useState<string | null>(null);

  // Filtros del Catálogo (simulación exacta de los parámetros GET de DinosauriosController)
  const [filtroNombre, setFiltroNombre] = useState<string>('');
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>('');
  const [filtroDieta, setFiltroDieta] = useState<string>('');
  const [filtroConImagen, setFiltroConImagen] = useState<boolean>(false);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [simularFueraDeRango, setSimularFueraDeRango] = useState<boolean>(false);

  const tamanoPagina = 8; // para paginación interactiva visible con la muestra

  // Lista de dietas y períodos únicos
  const periodosValidos = ['Cretácico', 'Jurásico', 'Triásico'];
  const dietasValidas = ['Carnívoro', 'Herbívoro', 'Piscívoro', 'Omnívoro'];

  // Filtrado de dinosaurios
  const filteredDinos = useMemo(() => {
    return DINOSAURIOS_SAMPLE.filter((d) => {
      if (filtroNombre.trim()) {
        const query = filtroNombre.toLowerCase();
        const matchesNombre = d.nombre.toLowerCase().includes(query);
        const matchesDesc = d.descripcion.toLowerCase().includes(query);
        if (!matchesNombre && !matchesDesc) return false;
      }
      if (filtroPeriodo) {
        if (!d.periodo.toLowerCase().includes(filtroPeriodo.toLowerCase())) {
          return false;
        }
      }
      if (filtroDieta) {
        if (!d.dieta.toLowerCase().includes(filtroDieta.toLowerCase())) {
          return false;
        }
      }
      if (filtroConImagen) {
        if (Presentacion.EsIcono(d.imagenUrl)) {
          return false;
        }
      }
      return true;
    });
  }, [filtroNombre, filtroPeriodo, filtroDieta, filtroConImagen]);

  const totalDinos = filteredDinos.length;
  const totalPaginas = Math.max(1, Math.ceil(totalDinos / tamanoPagina));
  const hayFiltros = Boolean(filtroNombre || filtroPeriodo || filtroDieta || filtroConImagen);

  // Paginación
  const pagedDinos = useMemo(() => {
    if (simularFueraDeRango) return [];
    const startIndex = (paginaActual - 1) * tamanoPagina;
    return filteredDinos.slice(startIndex, startIndex + tamanoPagina);
  }, [filteredDinos, paginaActual, tamanoPagina, simularFueraDeRango]);

  // Agrupación estratigráfica por época (preservando orden SQL más reciente a más antiguo)
  const estratosAgrupados = useMemo(() => {
    const groups: { [key: string]: Dinosaurio[] } = {};
    for (const dino of pagedDinos) {
      if (!groups[dino.periodo]) {
        groups[dino.periodo] = [];
      }
      groups[dino.periodo].push(dino);
    }
    return Object.entries(groups);
  }, [pagedDinos]);

  // Dinosaurio seleccionado para la vista de detalle
  const dinosaurioActual = useMemo(() => {
    return DINOSAURIOS_SAMPLE.find((d) => d.id === selectedDinoId) || DINOSAURIOS_SAMPLE[0];
  }, [selectedDinoId]);

  const handleVerDetalle = (id: number) => {
    setSelectedDinoId(id);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimpiarFiltros = () => {
    setFiltroNombre('');
    setFiltroPeriodo('');
    setFiltroDieta('');
    setFiltroConImagen(false);
    setPaginaActual(1);
    setSimularFueraDeRango(false);
  };

  const handleCopyCode = (fileId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFileId(fileId);
    setTimeout(() => setCopiedFileId(null), 2500);
  };

  const activeCodeFile = RAZOR_FILES.find((f) => f.id === activeCodeFileId) || RAZOR_FILES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#1F1B18] antialiased selection:bg-[#B45309] selection:text-white">
      {/* --------------------------------------------------------------------- */}
      {/* 1. BARRA SUPERIOR INSTITUCIONAL (Top Bar Contract: 3 zonas definidas) */}
      {/* --------------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E5DFC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Zona 1: Brand wordmark de una sola línea */}
            <div 
              onClick={() => setActiveView('catalog')}
              className="cursor-pointer flex flex-col shrink-0 select-none"
            >
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#B45309]">
                Archivo Paleobiológico
              </span>
              <span className="font-['Cinzel'] font-bold text-lg sm:text-xl text-[#1F1B18] tracking-tight">
                Dinosaurios del Mesozoico
              </span>
            </div>

            {/* Zona 2: Enlaces de navegación con hover sutil */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#645C52]" aria-label="Navegación principal">
              <button
                onClick={() => setActiveView('catalog')}
                className={`transition-colors whitespace-nowrap hover:text-[#1F1B18] ${
                  activeView === 'catalog' ? 'text-[#B45309] font-bold underline underline-offset-4' : ''
                }`}
              >
                Catálogo Estratigráfico
              </button>
              <button
                onClick={() => {
                  setSelectedDinoId(1);
                  setActiveView('detail');
                }}
                className={`transition-colors whitespace-nowrap hover:text-[#1F1B18] ${
                  activeView === 'detail' ? 'text-[#B45309] font-bold underline underline-offset-4' : ''
                }`}
              >
                Ficha de Detalle
              </button>
              <button
                onClick={() => setActiveView('code-inspector')}
                className={`transition-colors whitespace-nowrap hover:text-[#1F1B18] flex items-center gap-1.5 ${
                  activeView === 'code-inspector' ? 'text-[#B45309] font-bold underline underline-offset-4' : ''
                }`}
              >
                <FileCode2 className="w-4 h-4" />
                <span>Archivos Razor (.NET 8)</span>
              </button>
              <a
                href="#acerca-fuentes"
                className="transition-colors whitespace-nowrap hover:text-[#1F1B18]"
              >
                Fuentes &amp; Metodología
              </a>
            </nav>

            {/* Zona 3: Acción primaria contextual */}
            <div className="flex items-center gap-2 shrink-0">
              {activeView === 'code-inspector' ? (
                <button
                  onClick={() => setActiveView('catalog')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#1F1B18] text-white hover:bg-[#92400E] transition-colors whitespace-nowrap"
                >
                  Ver Catálogo en Vivo
                </button>
              ) : (
                <button
                  onClick={() => setActiveView('code-inspector')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#1F1B18] text-white hover:bg-[#92400E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Ver Código Razor</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cinta de Referencia Cronoestratigráfica (ICS) */}
        <aside className="bg-white border-t border-[#ECE8DC] border-b border-[#E5DFC9] text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-6">
              <div 
                onClick={() => {
                  setFiltroPeriodo(filtroPeriodo === 'Cretácico' ? '' : 'Cretácico');
                  setPaginaActual(1);
                  if (activeView !== 'catalog') setActiveView('catalog');
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#166534]"></span>
                <span className="font-semibold text-[#14532D]">Cretácico</span>
                <span className="text-[#8E8476] hidden sm:inline">145–66 Ma</span>
              </div>
              <span className="text-[#E5DFC9]">/</span>
              <div 
                onClick={() => {
                  setFiltroPeriodo(filtroPeriodo === 'Jurásico' ? '' : 'Jurásico');
                  setPaginaActual(1);
                  if (activeView !== 'catalog') setActiveView('catalog');
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]"></span>
                <span className="font-semibold text-[#1E40AF]">Jurásico</span>
                <span className="text-[#8E8476] hidden sm:inline">201,4–145 Ma</span>
              </div>
              <span className="text-[#E5DFC9]">/</span>
              <div 
                onClick={() => {
                  setFiltroPeriodo(filtroPeriodo === 'Triásico' ? '' : 'Triásico');
                  setPaginaActual(1);
                  if (activeView !== 'catalog') setActiveView('catalog');
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]"></span>
                <span className="font-semibold text-[#991B1B]">Triásico</span>
                <span className="text-[#8E8476] hidden sm:inline">251,9–201,4 Ma</span>
              </div>
            </div>

            <div className="text-[11px] uppercase tracking-wider text-[#645C52] font-['JetBrains_Mono']">
              1.617 Taxones en SQLite
            </div>
          </div>
        </aside>
      </header>

      {/* --------------------------------------------------------------------- */}
      {/* 2. CONTENIDO PRINCIPAL SEGÚN VISTA ACTIVA                             */}
      {/* --------------------------------------------------------------------- */}
      <main className="flex-grow">
        {/* =================================================================== */}
        {/* VISTA 1: CATÁLOGO ESTRATIGRÁFICO (Views/Dinosaurios/Index.cshtml)    */}
        {/* =================================================================== */}
        {activeView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            
            {/* Encabezado y Contador Estratigráfico */}
            <section className="mb-8 pb-6 border-b border-[#E5DFC9]">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-3xl">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#B45309]">
                    Registro Fósil Global · 251,9 a 66 Ma
                  </span>
                  <h1 className="font-['Fraunces'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B18] mt-1 mb-3">
                    Fauna Dinosauriana del Mesozoico
                  </h1>
                  <p className="text-sm sm:text-base text-[#645C52] leading-relaxed">
                    Explora los 1.617 taxones ordenados cronoestratigráficamente desde las capas terminales del Cretácico
                    hasta los albores del Triásico. Filtra por época geológica, régimen trófico o presencia de fotografía histórica.
                  </p>
                </div>

                <div className="shrink-0 bg-white border border-[#E5DFC9] p-4 rounded-lg shadow-xs">
                  <span className="block text-[11px] uppercase tracking-wider text-[#645C52] font-medium">
                    Muestra en catálogo
                  </span>
                  <span className="font-['JetBrains_Mono'] text-2xl font-bold text-[#1F1B18] block">
                    {totalDinos.toLocaleString('es-ES')}
                  </span>
                  <span className="block text-xs text-[#8E8476]">
                    especies clasificadas
                  </span>
                </div>
              </div>
            </section>

            {/* Escala Estratigráfica Interactiva */}
            <section className="mb-6" aria-label="Selector de Período Geológico">
              <div className="bg-white p-2.5 rounded-lg border border-[#E5DFC9]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      setFiltroPeriodo('');
                      setPaginaActual(1);
                    }}
                    className={`p-3 rounded text-left transition-all border ${
                      !filtroPeriodo 
                        ? 'bg-[#1F1B18] text-white border-[#1F1B18]' 
                        : 'bg-[#FAF8F3] text-[#1F1B18] border-[#ECE8DC] hover:border-[#1F1B18]'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-75 font-semibold">
                      Era Completa
                    </span>
                    <span className="font-['Cinzel'] font-bold text-base block mt-0.5">
                      Mesozoico
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] opacity-75">
                      251,9–66 Ma
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setFiltroPeriodo('Cretácico');
                      setPaginaActual(1);
                    }}
                    className={`p-3 rounded text-left transition-all border ${
                      filtroPeriodo === 'Cretácico'
                        ? 'bg-[#166534] text-white border-[#166534]'
                        : 'bg-[#F0FDF4] text-[#14532D] border-[#BBF7D0] hover:border-[#166534]'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-75 font-semibold">
                      Último período
                    </span>
                    <span className="font-['Cinzel'] font-bold text-base block mt-0.5">
                      Cretácico
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] opacity-75">
                      145–66 Ma
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setFiltroPeriodo('Jurásico');
                      setPaginaActual(1);
                    }}
                    className={`p-3 rounded text-left transition-all border ${
                      filtroPeriodo === 'Jurásico'
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE] hover:border-[#1E3A8A]'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-75 font-semibold">
                      Apogeo de gigantes
                    </span>
                    <span className="font-['Cinzel'] font-bold text-base block mt-0.5">
                      Jurásico
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] opacity-75">
                      201,4–145 Ma
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setFiltroPeriodo('Triásico');
                      setPaginaActual(1);
                    }}
                    className={`p-3 rounded text-left transition-all border ${
                      filtroPeriodo === 'Triásico'
                        ? 'bg-[#991B1B] text-white border-[#991B1B]'
                        : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA] hover:border-[#991B1B]'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-75 font-semibold">
                      Radiación basal
                    </span>
                    <span className="font-['Cinzel'] font-bold text-base block mt-0.5">
                      Triásico
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] opacity-75">
                      251,9–201,4 Ma
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* Barra de Filtros y Búsqueda */}
            <section className="bg-white p-4 sm:p-5 rounded-lg border border-[#E5DFC9] mb-8 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                {/* Nombre */}
                <div className="lg:col-span-4">
                  <label htmlFor="input-nombre" className="block text-xs font-semibold text-[#1F1B18] mb-1.5">
                    Nombre científico o género
                  </label>
                  <div className="relative">
                    <input
                      id="input-nombre"
                      type="text"
                      value={filtroNombre}
                      onChange={(e) => {
                        setFiltroNombre(e.target.value);
                        setPaginaActual(1);
                      }}
                      placeholder="p. ej. Tyrannosaurus, Coelophysis..."
                      className="w-full bg-[#FAF8F3] border border-[#E5DFC9] rounded px-3 py-2 text-sm text-[#1F1B18] placeholder-[#8E8476] focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-[#8E8476] absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Período */}
                <div className="lg:col-span-2">
                  <label htmlFor="select-periodo" className="block text-xs font-semibold text-[#1F1B18] mb-1.5">
                    Período
                  </label>
                  <select
                    id="select-periodo"
                    value={filtroPeriodo}
                    onChange={(e) => {
                      setFiltroPeriodo(e.target.value);
                      setPaginaActual(1);
                    }}
                    className="w-full bg-[#FAF8F3] border border-[#E5DFC9] rounded px-3 py-2 text-sm text-[#1F1B18] focus:border-[#B45309] focus:outline-none"
                  >
                    <option value="">Todos los períodos</option>
                    {periodosValidos.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Dieta */}
                <div className="lg:col-span-2">
                  <label htmlFor="select-dieta" className="block text-xs font-semibold text-[#1F1B18] mb-1.5">
                    Dieta
                  </label>
                  <select
                    id="select-dieta"
                    value={filtroDieta}
                    onChange={(e) => {
                      setFiltroDieta(e.target.value);
                      setPaginaActual(1);
                    }}
                    className="w-full bg-[#FAF8F3] border border-[#E5DFC9] rounded px-3 py-2 text-sm text-[#1F1B18] focus:border-[#B45309] focus:outline-none"
                  >
                    <option value="">Todas las dietas</option>
                    {dietasValidas.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Checkbox solo con foto */}
                <div className="lg:col-span-3 flex items-center h-10">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filtroConImagen}
                      onChange={(e) => {
                        setFiltroConImagen(e.target.checked);
                        setPaginaActual(1);
                      }}
                      className="w-4 h-4 rounded border-[#E5DFC9] text-[#B45309] focus:ring-[#B45309]"
                    />
                    <span className="text-xs text-[#1F1B18] font-medium">
                      Solo con fotografía (especies ilustradas)
                    </span>
                  </label>
                </div>

                {/* Botón limpiar */}
                <div className="lg:col-span-1 flex justify-end">
                  {hayFiltros && (
                    <button
                      onClick={handleLimpiarFiltros}
                      className="px-3 py-2 text-xs font-semibold text-[#645C52] hover:text-[#1F1B18] transition-colors"
                      title="Restablecer filtros"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Indicadores de filtros activos */}
              {hayFiltros && (
                <div className="mt-3 pt-3 border-t border-[#ECE8DC] flex flex-wrap items-center gap-2 text-xs text-[#645C52]">
                  <span className="font-semibold text-[#1F1B18]">Filtros aplicados:</span>
                  {filtroNombre && (
                    <span className="bg-[#F2EFE7] px-2 py-0.5 rounded border border-[#E5DFC9]">
                      Texto: <em>"{filtroNombre}"</em>
                    </span>
                  )}
                  {filtroPeriodo && (
                    <span className="bg-[#F2EFE7] px-2 py-0.5 rounded border border-[#E5DFC9]">
                      Período: {filtroPeriodo}
                    </span>
                  )}
                  {filtroDieta && (
                    <span className="bg-[#F2EFE7] px-2 py-0.5 rounded border border-[#E5DFC9]">
                      Dieta: {filtroDieta}
                    </span>
                  )}
                  {filtroConImagen && (
                    <span className="bg-[#F2EFE7] px-2 py-0.5 rounded border border-[#E5DFC9]">
                      Solo ilustrados
                    </span>
                  )}
                  <button 
                    onClick={handleLimpiarFiltros}
                    className="ml-auto text-[#B45309] hover:underline"
                  >
                    Quitar filtros
                  </button>
                </div>
              )}
            </section>

            {/* Panel de prueba de estados vacíos para verificación */}
            <div className="mb-6 p-2 bg-[#F2EFE7] border border-[#E5DFC9] rounded text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="text-[#645C52] font-medium">
                Probador de casos extremos (Empty States):
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimularFueraDeRango(!simularFueraDeRango)}
                  className={`px-2.5 py-1 rounded text-xs font-medium border ${
                    simularFueraDeRango ? 'bg-[#1F1B18] text-white border-[#1F1B18]' : 'bg-white text-[#1F1B18] border-[#E5DFC9]'
                  }`}
                >
                  {simularFueraDeRango ? 'Desactivar página fuera de rango' : 'Simular página fuera de rango'}
                </button>
                <button
                  onClick={() => setFiltroNombre('ZalmoxesInexistenteXYZ')}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-white text-[#1F1B18] border border-[#E5DFC9] hover:border-[#1F1B18]"
                >
                  Simular sin hallazgos
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* ESTADOS VACÍOS O LISTA DE ESTRATOS                              */}
            {/* =============================================================== */}
            {simularFueraDeRango || (totalDinos > 0 && pagedDinos.length === 0) ? (
              /* Caso 1: Página fuera de rango */
              <div className="bg-white p-10 text-center my-8 rounded-lg border border-[#E5DFC9] max-w-xl mx-auto shadow-xs">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF8F3] border border-[#E5DFC9] flex items-center justify-center text-[#B45309]">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold font-['Fraunces'] text-[#1F1B18] mb-2">
                  Página fuera de estrato
                </h2>
                <p className="text-sm text-[#645C52] mb-5">
                  La página solicitada excede los registros disponibles para los filtros actuales.
                </p>
                <button
                  onClick={() => {
                    setSimularFueraDeRango(false);
                    setPaginaActual(1);
                  }}
                  className="px-4 py-2 bg-[#1F1B18] text-white text-xs font-semibold rounded hover:bg-[#92400E] transition-colors"
                >
                  Regresar a la página 1
                </button>
              </div>
            ) : totalDinos === 0 ? (
              /* Caso 2: Búsqueda sin coincidencias */
              <div className="bg-white p-10 text-center my-8 rounded-lg border border-[#E5DFC9] max-w-xl mx-auto shadow-xs">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#FAF8F3] border border-[#E5DFC9] flex items-center justify-center text-[#B45309]">
                  <Footprints className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold font-['Fraunces'] text-[#1F1B18] mb-2">
                  Sin hallazgos fósiles
                </h2>
                <p className="text-sm text-[#645C52] mb-5">
                  No existen registros que coincidan con los criterios de búsqueda seleccionados. Modifica el término o restablece los filtros estratigráficos.
                </p>
                <button
                  onClick={handleLimpiarFiltros}
                  className="px-4 py-2 bg-[#1F1B18] text-white text-xs font-semibold rounded hover:bg-[#92400E] transition-colors"
                >
                  Ver todos los 1.617 dinosaurios
                </button>
              </div>
            ) : (
              /* Caso Normal: Lista agrupada por Estratos Geológicos */
              <div>
                {/* Resumen de Rango */}
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#E5DFC9] text-xs text-[#645C52]">
                  <div>
                    Mostrando <strong className="text-[#1F1B18] font-['JetBrains_Mono']">
                      {((paginaActual - 1) * tamanoPagina) + 1}–{Math.min(paginaActual * tamanoPagina, totalDinos)}
                    </strong> de <strong className="text-[#1F1B18] font-['JetBrains_Mono']">{totalDinos}</strong> dinosaurios registrados
                  </div>
                  <div className="font-['JetBrains_Mono']">
                    Página {paginaActual} de {totalPaginas}
                  </div>
                </div>

                {/* Estratos Geológicos */}
                {estratosAgrupados.map(([estrato, dinos]) => {
                  const limites = Presentacion.LimitesEpoca(estrato);
                  const isCretacico = estrato.toLowerCase().includes('cretácico') || estrato.toLowerCase().includes('cretacico');
                  const isJurasico = estrato.toLowerCase().includes('jurásico') || estrato.toLowerCase().includes('jurasico');
                  const isTriasico = estrato.toLowerCase().includes('triásico') || estrato.toLowerCase().includes('triasico');

                  return (
                    <section key={estrato} className="mb-10" aria-label={estrato}>
                      {/* Cabecera del Estrato */}
                      <div className={`flex flex-wrap items-baseline justify-between gap-2 pb-2 mb-4 border-b-2 ${
                        isCretacico 
                          ? 'border-[#166534]' 
                          : isJurasico 
                            ? 'border-[#1E3A8A]' 
                            : isTriasico 
                              ? 'border-[#991B1B]' 
                              : 'border-[#E5DFC9]'
                      }`}>
                        <div className="flex items-baseline gap-3">
                          <h2 className="font-['Cinzel'] text-xl font-bold text-[#1F1B18]">
                            {estrato}
                          </h2>
                          {limites && (
                            <span className="font-['JetBrains_Mono'] text-xs px-2 py-0.5 rounded bg-white border border-[#E5DFC9] text-[#645C52]">
                              {limites}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#8E8476]">
                          {dinos.length} {dinos.length === 1 ? 'género en este bloque' : 'géneros en este bloque'}
                        </span>
                      </div>

                      {/* Cuadrícula de Fichas de Dinosaurios */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {dinos.map((dino) => {
                          const esIcono = Presentacion.EsIcono(dino.imagenUrl);
                          const datosBreves = Presentacion.DatosBreves(dino.dieta, dino.region);

                          return (
                            <article
                              key={dino.id}
                              className={`rounded-lg border border-[#E5DFC9] bg-white overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#B45309] ${
                                esIcono ? 'bg-gradient-to-b from-white to-[#FAF8F3]' : ''
                              }`}
                            >
                              {/* Zona Visual: Foto o Sello de Huella Fósil */}
                              {!esIcono ? (
                                <div className="h-44 bg-[#EFECE6] relative overflow-hidden group">
                                  <img
                                    src={dino.imagenUrl}
                                    alt={`Reconstrucción fósil de ${dino.nombre}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                  <span className="absolute top-2 right-2 bg-[#1F1B18]/85 text-white text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                                    Foto Archivo
                                  </span>
                                </div>
                              ) : (
                                <div className="p-3 bg-[#F2EFE7] border-b border-[#ECE8DC] flex items-center justify-between">
                                  <div className="w-8 h-8 rounded-full bg-white border border-[#E5DFC9] flex items-center justify-center text-[#B45309]">
                                    <Footprints className="w-4 h-4" />
                                  </div>
                                  <span className="text-[11px] font-['JetBrains_Mono'] text-[#645C52]">
                                    PBDB {dino.pbdbId ? `#${dino.pbdbId}` : `#${String(dino.id).padStart(4, '0')}`}
                                  </span>
                                </div>
                              )}

                              <div className="p-4 flex flex-col flex-grow">
                                {/* Época y Edad */}
                                <div className="flex items-center justify-between text-xs text-[#8E8476] mb-1.5">
                                  <span className="truncate font-semibold text-[#645C52]">
                                    {dino.periodo}
                                  </span>
                                  <span className="font-['JetBrains_Mono'] shrink-0">
                                    {dino.antiguedad}
                                  </span>
                                </div>

                                {/* Nombre Científico (Siempre en cursiva) */}
                                <h3 className="font-['Fraunces'] text-lg font-bold text-[#1F1B18] mb-1.5 leading-snug">
                                  <button
                                    onClick={() => handleVerDetalle(dino.id)}
                                    className="text-left hover:text-[#B45309] transition-colors"
                                  >
                                    <em>{dino.nombre}</em>
                                  </button>
                                </h3>

                                {/* Metadatos breves sin pastillas */}
                                <div className="text-xs text-[#645C52] mb-2 font-medium">
                                  {datosBreves}
                                </div>

                                {/* Extracto */}
                                <p className="text-xs text-[#645C52] line-clamp-3 mb-4 leading-relaxed flex-grow">
                                  {dino.descripcion}
                                </p>

                                {/* Enlace de Acción */}
                                <div className="pt-2 border-t border-[#ECE8DC] flex items-center justify-between mt-auto">
                                  <button
                                    onClick={() => handleVerDetalle(dino.id)}
                                    className="text-xs font-semibold text-[#B45309] hover:text-[#92400E] transition-colors flex items-center gap-1"
                                  >
                                    <span>Ver ficha estratigráfica</span>
                                    <span>&rarr;</span>
                                  </button>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}

                {/* Paginación */}
                {totalPaginas > 1 && (
                  <nav className="mt-10 pt-6 border-t border-[#E5DFC9] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#645C52]">
                      Página <strong className="text-[#1F1B18] font-['JetBrains_Mono']">{paginaActual}</strong> de <strong className="text-[#1F1B18] font-['JetBrains_Mono']">{totalPaginas}</strong>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                        disabled={paginaActual === 1}
                        className="px-3 py-1.5 text-xs font-medium rounded border border-[#E5DFC9] bg-white text-[#1F1B18] disabled:opacity-40 disabled:pointer-events-none hover:border-[#1F1B18]"
                      >
                        &larr; Anterior
                      </button>

                      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPaginaActual(p)}
                          className={`w-8 h-8 text-xs font-['JetBrains_Mono'] rounded border ${
                            p === paginaActual
                              ? 'bg-[#1F1B18] text-white border-[#1F1B18] font-bold'
                              : 'bg-white text-[#1F1B18] border-[#E5DFC9] hover:border-[#1F1B18]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
                        disabled={paginaActual === totalPaginas}
                        className="px-3 py-1.5 text-xs font-medium rounded border border-[#E5DFC9] bg-white text-[#1F1B18] disabled:opacity-40 disabled:pointer-events-none hover:border-[#1F1B18]"
                      >
                        Siguiente &rarr;
                      </button>
                    </div>
                  </nav>
                )}
              </div>
            )}

          </div>
        )}

        {/* =================================================================== */}
        {/* VISTA 2: FICHA DE DETALLE (Views/Dinosaurios/Detalle.cshtml)         */}
        {/* =================================================================== */}
        {activeView === 'detail' && (
          <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {/* Barra de Retorno */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5DFC9]">
              <button
                onClick={() => setActiveView('catalog')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#645C52] hover:text-[#1F1B18] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al catálogo cronoestratigráfico</span>
              </button>
              <span className="text-xs font-['JetBrains_Mono'] text-[#8E8476]">
                Ficha ID: #{String(dinosaurioActual.id).padStart(4, '0')}
              </span>
            </div>

            {/* Cabecera Taxonómica */}
            <header className="pb-6 mb-8 border-b border-[#E5DFC9]">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E5DFC9] text-xs font-semibold text-[#1F1B18]">
                      {dinosaurioActual.periodo}
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] text-[#8E8476]">
                      ({Presentacion.LimitesEpoca(dinosaurioActual.periodo)})
                    </span>
                    <span className="text-[#8E8476]">·</span>
                    <span className="text-xs font-['JetBrains_Mono'] text-[#645C52]">
                      {dinosaurioActual.antiguedad}
                    </span>
                  </div>

                  <h1 className="font-['Fraunces'] text-4xl sm:text-5xl font-bold text-[#1F1B18] mb-2 tracking-tight">
                    <em>{dinosaurioActual.nombre}</em>
                  </h1>

                  <p className="text-sm text-[#645C52]">
                    Clasificación de dinosaurio no aviano registrado en los estratos del período {dinosaurioActual.periodo}.
                  </p>
                </div>

                <div className="shrink-0 bg-white border border-[#E5DFC9] p-4 rounded-lg shadow-xs">
                  <span className="block text-[11px] uppercase tracking-wider text-[#645C52] font-medium">
                    Antigüedad Estratigráfica
                  </span>
                  <span className="font-['JetBrains_Mono'] text-2xl font-bold text-[#B45309] block">
                    {dinosaurioActual.edadMaxMa ? `~${dinosaurioActual.edadMaxMa.toFixed(1)} Ma` : dinosaurioActual.antiguedad}
                  </span>
                  <span className="block text-xs text-[#8E8476]">
                    Límite geológico máximo
                  </span>
                </div>
              </div>
            </header>

            {/* Dos Columnas: Media/Ficha de Campo a la Izquierda + Prosa a la Derecha */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              
              {/* Columna Izquierda */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white border border-[#E5DFC9] rounded-lg overflow-hidden shadow-xs">
                  {!Presentacion.EsIcono(dinosaurioActual.imagenUrl) ? (
                    <figure className="m-0">
                      <div className="p-3 bg-[#FAF8F4] flex items-center justify-center min-h-[300px]">
                        <img
                          src={dinosaurioActual.imagenUrl}
                          alt={`Reconstrucción fósil de ${dinosaurioActual.nombre}`}
                          className="max-h-[380px] w-auto object-contain rounded"
                        />
                      </div>
                      {dinosaurioActual.creditoImagen && (
                        <figcaption className="p-3.5 border-t border-[#ECE8DC] text-xs text-[#645C52] bg-white">
                          <strong className="block text-[#1F1B18] font-semibold mb-0.5">
                            Crédito de la ilustración / fotografía:
                          </strong>
                          <span>{dinosaurioActual.creditoImagen}</span>
                        </figcaption>
                      )}
                    </figure>
                  ) : (
                    <div className="p-8 text-center bg-radial from-white to-[#F5F1E8]">
                      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#E5DFC9] bg-[#FAF8F3] mx-auto mb-4 flex items-center justify-center text-[#B45309]">
                        <Footprints className="w-10 h-10" />
                      </div>
                      <h2 className="font-['Fraunces'] text-lg font-bold text-[#1F1B18] mb-2">
                        Ficha Taxonómica de Registro Paleobiológico
                      </h2>
                      <p className="text-xs text-[#645C52] max-w-md mx-auto mb-4 leading-relaxed">
                        Este taxón cuenta con registro catalogado en la <em>Paleobiology Database</em> (PBDB) y en la enciclopedia libre, pero no dispone aún de una fotografía con licencia libre en el archivo de Wikimedia Commons.
                      </p>
                      <div className="inline-block py-1.5 px-3 rounded border border-[#E5DFC9] bg-white text-xs font-['JetBrains_Mono'] text-[#645C52]">
                        Colección PBDB: {dinosaurioActual.pbdbId ? `#${dinosaurioActual.pbdbId}` : 'Sin identificador numérico'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ficha de Atributos */}
                <div className="bg-white border border-[#E5DFC9] p-5 rounded-lg shadow-xs">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-[#1F1B18] mb-3">
                    Ficha Biológica y Geográfica
                  </h2>
                  <dl className="divide-y divide-[#ECE8DC] text-xs">
                    <div className="py-2.5 flex justify-between items-center">
                      <dt className="text-[#645C52] font-medium">Régimen Trófico (Dieta)</dt>
                      <dd className="font-semibold text-[#1F1B18]">{dinosaurioActual.dieta}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <dt className="text-[#645C52] font-medium">Región de Hallazgo</dt>
                      <dd className="font-semibold text-[#1F1B18]">{dinosaurioActual.region}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <dt className="text-[#645C52] font-medium">Época Estratigráfica</dt>
                      <dd className="font-semibold text-[#1F1B18]">{dinosaurioActual.periodo}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <dt className="text-[#645C52] font-medium">Antigüedad Aproximada</dt>
                      <dd className="font-['JetBrains_Mono'] text-[#1F1B18]">{dinosaurioActual.antiguedad}</dd>
                    </div>
                    {dinosaurioActual.pbdbId && (
                      <div className="py-2.5 flex justify-between items-center">
                        <dt className="text-[#645C52] font-medium">Referencia Paleobiology Database</dt>
                        <dd className="font-['JetBrains_Mono'] text-[#1F1B18]">#{dinosaurioActual.pbdbId}</dd>
                      </div>
                    )}
                    {dinosaurioActual.edadMaxMa && (
                      <div className="py-2.5 flex justify-between items-center">
                        <dt className="text-[#645C52] font-medium">Límite Superior (EdadMaxMa)</dt>
                        <dd className="font-['JetBrains_Mono'] text-[#1F1B18]">{dinosaurioActual.edadMaxMa.toFixed(2)} Ma</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#B45309]">
                    Registro Monográfico
                  </span>
                  <h2 className="font-['Fraunces'] text-2xl font-bold text-[#1F1B18] mt-1 mb-4">
                    Descripción Paleontológica
                  </h2>

                  <div className="prose prose-stone max-w-[65ch]">
                    <p className="dino-lead-paragraph text-base leading-relaxed text-[#1F1B18]">
                      {dinosaurioActual.descripcion}
                    </p>
                  </div>
                </div>

                {/* Tarjeta de Fuente */}
                <div className="bg-white border border-[#E5DFC9] p-5 rounded-lg shadow-xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded bg-[#FAF8F3] border border-[#E5DFC9] flex items-center justify-center text-[#B45309] shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1F1B18] mb-1">
                        Fuente y documentación primaria
                      </h3>
                      <p className="text-xs text-[#645C52] mb-3 leading-relaxed">
                        Para acceder a la bibliografía completa, sinapomorfias morfológicas y coordenadas estratigráficas de los yacimientos:
                      </p>
                      {dinosaurioActual.fuenteUrl ? (
                        <a
                          href={dinosaurioActual.fuenteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[#1F1B18] text-white hover:bg-[#92400E] transition-colors"
                        >
                          <span>{Presentacion.TextoFuente(dinosaurioActual.fuenteUrl)}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-[#8E8476]">
                          Fuente primaria no enlazada en la base de datos.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navegación rápida entre otras especies de prueba */}
                <div className="pt-4 border-t border-[#E5DFC9]">
                  <span className="block text-xs font-semibold text-[#645C52] mb-2 uppercase tracking-wider">
                    Explorar otros especímenes de la muestra:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DINOSAURIOS_SAMPLE.slice(0, 6).map((d) => (
                      <button
                        key={d.id}
                        onClick={() => handleVerDetalle(d.id)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                          d.id === dinosaurioActual.id 
                            ? 'bg-[#1F1B18] text-white border-[#1F1B18]' 
                            : 'bg-white text-[#1F1B18] border-[#E5DFC9] hover:border-[#1F1B18]'
                        }`}
                      >
                        <em>{d.nombre}</em>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </article>
        )}

        {/* =================================================================== */}
        {/* VISTA 3: INSPECTOR DE CÓDIGO RAZOR & CSS (.NET 8)                   */}
        {/* =================================================================== */}
        {activeView === 'code-inspector' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#B45309]">
                Código de Entrega Listo para Integrar
              </span>
              <h1 className="font-['Fraunces'] text-3xl font-bold text-[#1F1B18] mt-1 mb-2">
                Archivos Razor Views (.NET 8) &amp; CSS
              </h1>
              <p className="text-sm text-[#645C52]">
                Haz clic en cada pestaña para inspeccionar y copiar el código completo listo para reemplazar en tu solución 
                <code className="text-[#B45309] font-['JetBrains_Mono'] bg-white px-1.5 py-0.5 rounded border border-[#E5DFC9] ml-1">
                  Web_Dinosaurios
                </code> sin alterar firmas C# ni controladores.
              </p>
            </div>

            {/* Selector de Pestañas de Archivos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {RAZOR_FILES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveCodeFileId(f.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-t-md border-t border-x transition-colors flex items-center gap-2 ${
                    activeCodeFileId === f.id
                      ? 'bg-[#1F1B18] text-white border-[#1F1B18]'
                      : 'bg-white text-[#645C52] border-[#E5DFC9] hover:text-[#1F1B18]'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>{f.path}</span>
                </button>
              ))}
            </div>

            {/* Detalle y Razón de Diseño del Archivo Activo */}
            <div className="bg-white border border-[#E5DFC9] rounded-b-lg rounded-tr-lg p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#ECE8DC]">
                <div>
                  <h2 className="font-['Fraunces'] text-lg font-bold text-[#1F1B18]">
                    {activeCodeFile.title}
                  </h2>
                  <p className="text-xs text-[#645C52] mt-0.5 max-w-3xl">
                    {activeCodeFile.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyCode(activeCodeFile.id, activeCodeFile.code)}
                    className="px-3.5 py-2 bg-[#B45309] hover:bg-[#92400E] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    {copiedFileId === activeCodeFile.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Código Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Visor de Código */}
              <div className="relative rounded bg-[#1A1816] text-[#E8E2D9] font-['JetBrains_Mono'] text-xs p-4 overflow-x-auto max-h-[600px] border border-[#2E2924] leading-relaxed">
                <pre>
                  <code>{activeCodeFile.code}</code>
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ECE8DC] flex items-center justify-between text-xs text-[#8E8476]">
                <span>Total de líneas: {activeCodeFile.code.split('\n').length}</span>
                <span>Codificación: UTF-8 sin BOM · ASP.NET Core 8 Razor</span>
              </div>
            </div>

            {/* Instrucciones de Integración Directa */}
            <div className="mt-8 bg-[#FAF8F3] border border-[#E5DFC9] p-5 rounded-lg text-xs">
              <div className="flex items-center gap-2 font-bold text-[#1F1B18] text-sm mb-2">
                <Info className="w-4 h-4 text-[#B45309]" />
                <span>Instrucciones de Despliegue en tu Proyecto ASP.NET Core (.NET 8):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[#645C52] ml-1">
                <li>Copia el archivo <code className="font-['JetBrains_Mono'] text-[#1F1B18]">Views/Shared/_Layout.cshtml</code> en tu carpeta de vistas compartidas.</li>
                <li>Reemplaza <code className="font-['JetBrains_Mono'] text-[#1F1B18]">Views/Dinosaurios/Index.cshtml</code> y <code className="font-['JetBrains_Mono'] text-[#1F1B18]">Views/Dinosaurios/Detalle.cshtml</code>.</li>
                <li>Reemplaza el archivo <code className="font-['JetBrains_Mono'] text-[#1F1B18]">wwwroot/css/site.css</code>.</li>
                <li>Verifica que <code className="font-['JetBrains_Mono'] text-[#1F1B18]">wwwroot/images/dinosaurios/icono.svg</code> esté presente en el servidor.</li>
                <li>Ejecuta <code className="font-['JetBrains_Mono'] text-[#1F1B18]">dotnet run</code>. Todos los bindings de <code className="font-['JetBrains_Mono'] text-[#1F1B18]">Dinosaurio</code>, <code className="font-['JetBrains_Mono'] text-[#1F1B18]">Presentacion</code> y <code className="font-['JetBrains_Mono'] text-[#1F1B18]">DinosauriosController</code> se enlazarán inmediatamente al 100%.</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* --------------------------------------------------------------------- */}
      {/* 3. PIE DE PÁGINA INSTITUCIONAL Y CRÉDITOS DE LICENCIA OBLIGATORIOS     */}
      {/* --------------------------------------------------------------------- */}
      <footer className="bg-white border-t border-[#E5DFC9] mt-auto" id="acerca-fuentes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6">
              <div className="font-['Cinzel'] font-bold text-lg text-[#1F1B18] mb-2">
                Dinosaurios del Mesozoico
              </div>
              <p className="text-xs text-[#645C52] leading-relaxed mb-3 max-w-md">
                Catálogo taxonómico, cronológico y morfológico estructurado para la divulgación paleobiológica.
                Los registros fósiles están ordenados según la Escala Cronoestratigráfica Internacional (ICS),
                desde las capas más jóvenes del Cretácico terminal (66 Ma) hasta el Triásico inferior (251,9 Ma).
              </p>
              <p className="text-[11px] text-[#8E8476]">
                ASP.NET Core (.NET 8) · Dapper · SQLite · Interfaz tipográfica de museo.
              </p>
            </div>

            <div className="md:col-span-6">
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#1F1B18] mb-3">
                Fuentes de Datos &amp; Licenciamiento
              </h2>
              <ul className="space-y-2.5 text-xs text-[#645C52]">
                <li className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">&bull;</span>
                  <div>
                    <strong className="text-[#1F1B18]">Paleobiology Database (PBDB):</strong> Datos taxonómicos, estratos geológicos y estimaciones cronológicas provistos bajo licencia{' '}
                    <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noopener noreferrer" className="text-[#B45309] underline underline-offset-2">
                      Creative Commons Attribution 4.0 (CC BY 4.0)
                    </a>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">&bull;</span>
                  <div>
                    <strong className="text-[#1F1B18]">Wikipedia en español:</strong> Sinopsis introductorias y descripciones bajo licencia{' '}
                    <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener noreferrer" className="text-[#B45309] underline underline-offset-2">
                      Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)
                    </a>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">&bull;</span>
                  <div>
                    <strong className="text-[#1F1B18]">Wikimedia Commons:</strong> Fotografías y paleoarte de especies semilla bajo sus respectivas licencias libres especificadas en cada ficha.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#ECE8DC] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#8E8476]">
            <div>
              &copy; {new Date().getFullYear()} Dinosaurios del Mesozoico. Consulta científica abierta.
            </div>
            <div>
              Estratigrafía ICS v2024/05
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
