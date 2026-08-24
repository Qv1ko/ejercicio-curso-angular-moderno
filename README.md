# Ejercicio práctico de desarrollo con Angular Moderno Versión 17 o superior.

> [!NOTE]  
> **Especificaciones técnicas** 
> Características de Angular Moderno que debes implementar en el ejercicio.

- Usa Angular V17 o superior.

- Usa componentes standalone

- Usa detección de cambios OnPush

- Usa RxJs para la comunicación con el servidor

- Usa Signals para la comunicación interna

- Framework de estilos a elección (Sugerido minimalista tipo PicoCSS, etc)

- Mantén una estructura de carpetas ordenada y limpia

> [!TIP]
> **Datos de ejemplo** 
> Usa JSON Server para simular una base de datos REST.

Se encuentran en el archivo `db.json` y se pueden cargar con el comando:

```bash
npx json-server db.json
```

- Deportes: id, nombre, descripción

- Productos: id, nombre, descripción, precio, stock, categoría_id

- Carrito: id, [producto_id, cantidad]

- Compras: id, carrito_id, transporte, total

> [!TIP] 
> **Funcionalidad** 
> Implementa las funcionalidades que puedas en el tiempo que tengas disponible (sin estrés).

- Desarrollar el portal para una tienda online de venta de productos deportivos y de aventura.

- La página principal debe mostrar un listado de categorías en un panel lateral izquierdo y un listado de productos en el panel central.

- Al hacer clic en una categoría, se deben mostrar los productos de esa categoría en el panel central.

- Los productos deben tener un nombre, una descripción, un precio y un stock y un botón de compra.

- Si el stock es 0, se debe indicar que el producto está agotado y no se debe poder agregar al carrito.

- Si el stock es 1 se debe resaltar indicando que el producto está en la última unidad.

- En la parte superior de la página se debe mostrar un icono de carrito con la cantidad de productos agregados.

- Al hacer clic comprar un producto, se debe agregar al carrito.

- Al hacer clic en el icono de carrito, se debe visitar una página de resumen de la compra con el detalle de los productos agregados y un botón para finalizar la compra.

- La página debe permitir eliminar productos del carrito.

- Debe incluir los gastos de transporte en la compra según las reglas de la empresa:

  - Sin gastos para compras superiores a 100€.

  - 5€ para compras superiores a 50€.

  - 10€ para compras inferiores a 50€.
