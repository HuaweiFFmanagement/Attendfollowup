# Asistencia Diaria – Huawei Field Force

Panel web para revisar asistencia diaria del equipo Field Force a partir del Excel de iRetail (SwipeCard).

**URL:** https://huaweiffmanagement.github.io/asistencia-diaria/

## Qué hace

- Sube el archivo `SwipeCardDailyRecords.xlsx` descargado de iRetail
- Muestra de inmediato quién está presente, ausente o con check-in anormal
- Filtros por rol, ciudad, estado y buscador por nombre/tienda
- Banner con lista rápida de ausentes
- Exporta CSV con los filtros aplicados
- Funciona como PWA (instalable en celular)

## Cómo usar

1. Abre la URL en cualquier navegador
2. Arrastra o sube el Excel del día
3. Revisa el panel — no hay paso 3

## Cómo actualizar el código

1. Edita `index.html`
2. En `sw.js`, cambia `asistencia-ff-v1` → `asistencia-ff-v2` (o el número siguiente)
3. Haz push a `main` — GitHub Pages lo despliega automáticamente en ~1 min
