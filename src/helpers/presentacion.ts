/**
 * Réplica TypeScript exacta de la clase C# Web_Dinosaurios.Helpers.Presentacion
 */
export class Presentacion {
  /**
   * Retorna las clases CSS asociadas al período y época geológica
   */
  public static ClasesPeriodo(periodo: string): string {
    if (!periodo) return "dino-periodo-otro";
    const p = periodo.toLowerCase();

    if (p.includes("cretácico") || p.includes("cretacico")) {
      if (p.includes("superior")) return "dino-cretacico dino-cretacico-superior";
      if (p.includes("inferior")) return "dino-cretacico dino-cretacico-inferior";
      return "dino-cretacico";
    }

    if (p.includes("jurásico") || p.includes("jurasico")) {
      if (p.includes("superior")) return "dino-jurasico dino-jurasico-superior";
      if (p.includes("medio")) return "dino-jurasico dino-jurasico-medio";
      if (p.includes("inferior")) return "dino-jurasico dino-jurasico-inferior";
      return "dino-jurasico";
    }

    if (p.includes("triásico") || p.includes("triasico")) {
      if (p.includes("superior")) return "dino-triasico dino-triasico-superior";
      if (p.includes("medio")) return "dino-triasico dino-triasico-medio";
      if (p.includes("inferior")) return "dino-triasico dino-triasico-inferior";
      return "dino-triasico";
    }

    return "dino-periodo-otro";
  }

  /**
   * Retorna los límites de época según la Tabla Cronoestratigráfica Internacional (ICS)
   */
  public static LimitesEpoca(periodo: string): string {
    if (!periodo) return "";
    const p = periodo.toLowerCase();

    if (p.includes("cretácico") || p.includes("cretacico")) {
      if (p.includes("superior")) return "100,5–66 Ma";
      if (p.includes("inferior")) return "145–100,5 Ma";
      return "145–66 Ma";
    }

    if (p.includes("jurásico") || p.includes("jurasico")) {
      if (p.includes("superior")) return "163,5–145 Ma";
      if (p.includes("medio")) return "174,1–163,5 Ma";
      if (p.includes("inferior")) return "201,4–174,1 Ma";
      return "201,4–145 Ma";
    }

    if (p.includes("triásico") || p.includes("triasico")) {
      if (p.includes("superior")) return "237–201,4 Ma";
      if (p.includes("medio")) return "247,2–237 Ma";
      if (p.includes("inferior")) return "251,9–247,2 Ma";
      return "251,9–201,4 Ma";
    }

    return "";
  }

  /**
   * Retorna true si la imagen corresponde al icono genérico de huella
   */
  public static EsIcono(imagenUrl: string | null | undefined): boolean {
    if (!imagenUrl) return true;
    return imagenUrl.includes("icono.svg");
  }

  /**
   * Une la dieta y la región omitiendo valores "Sin datos"
   */
  public static DatosBreves(dieta: string, region: string): string {
    const dietaValida = dieta && dieta.toLowerCase() !== "sin datos";
    const regionValida = region && region.toLowerCase() !== "sin datos";

    if (dietaValida && regionValida) {
      return `${dieta}, ${region}`;
    }
    if (dietaValida) {
      return dieta;
    }
    if (regionValida) {
      return region;
    }
    return "Dieta y región sin datos";
  }

  /**
   * Retorna el texto del enlace según el dominio de la fuente
   */
  public static TextoFuente(fuenteUrl: string | null | undefined): string {
    if (!fuenteUrl) return "Leer la fuente";
    const url = fuenteUrl.toLowerCase();
    if (url.includes("wikipedia.org")) {
      return "Leer en Wikipedia";
    }
    if (url.includes("paleobiodb.org") || url.includes("pbdb")) {
      return "Ver en la Paleobiology Database";
    }
    return "Leer la fuente científica";
  }
}
