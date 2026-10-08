# 0001 — Hexagonal por módulo, vertical slicing y screaming architecture

- **Estado:** aceptada
- **Fecha:** 2026-10-08 (adoptada de pensildevs-web)

## Contexto

El academy de Pensil.Devs empieza con contenido de prueba, pero crecerá con cursos, videos, documentación y una fuente de contenido real (CMS o API). Queremos que las reglas de negocio se puedan probar sin Angular y que la estructura comunique el negocio desde el primer día.

## Decisión

- El código se organiza por capacidad del negocio en `src/app/<module>/`, no por tipo técnico.
- Cada módulo sigue capas hexagonales: `domain/` y `application/` en TypeScript puro, `infrastructure/` con los adaptadores, `ui/` con Angular.
- Los puertos son clases abstractas; se conectan a sus adaptadores en `<module>.providers.ts` usando la inyección de dependencias de Angular, sin otro contenedor.
- Los módulos se comunican solo por su `index.ts`.
- Los módulos de solo contenido pueden omitir las capas que no necesitan.

## Consecuencias

- Las reglas de negocio se prueban con Vitest en milisegundos, sin TestBed.
- Hay algo más de ceremonia en los módulos con lógica; se compensa omitiendo capas en los de solo contenido.
- Las reglas las hace cumplir `eslint-plugin-boundaries` ; una violación hace fallar `npm run lint`.
