# Examinando con Videos

**Examinando con Videos** es una aplicación web ligera cuyo objetivo es **acompañar el texto diario con un video relacionado de jw.org**, con el fin de **profundizar en el estudio personal**.  
Los videos enlazados han sido **meticulosamente seleccionados tras un proceso de investigación**, buscando que complementen y amplíen el tema tratado en cada texto.

---

## 🌐 Enlace a la aplicación (Live)

👉 **Aplicación en vivo:**  
**<https://examinando-videos.netlify.app/>**

---

## 📌 Propósito del proyecto

Este proyecto fue creado como una **herramienta de apoyo personal y educativo**, no comercial, que facilita el acceso organizado a:

- Un versículo o texto diario
- Un enlace al comentario correspondiente
- Un enlace a un video relacionado para reflexión y profundización

La aplicación **no reemplaza** los contenidos oficiales, sino que **dirige al usuario a ellos** mediante enlaces directos.

---

## ⚙️ Cómo funciona

La aplicación funciona de manera **simple y transparente**:

1. Todo el contenido visible se define en **archivos JSON creados y mantenidos manualmente**.
2. Cada archivo JSON corresponde a un mes (por ejemplo: `26-01.json`).
3. Cada día contiene:
   - Una fecha en texto (`fecha`)
   - Un versículo (`versiculo`)
   - Un enlace al texto (`linkTexto`)
   - Un enlace al video (`linkVideo`)
4. El usuario selecciona una fecha mediante el calendario.
5. La aplicación carga **exclusivamente** los datos definidos para esa fecha y muestra:
   - El texto diario
   - Los enlaces externos correspondientes

En ningún momento se genera contenido automáticamente ni se obtiene información desde sitios externos.

Esta aplicación es una PWA ligera. No utiliza service workers ni almacenamiento offline, ya que su contenido depende de enlaces externos y requiere conexión a Internet.

---

## 📁 Estructura del JSON

Ejemplo de entrada diaria:

```json
"01-01": {
  "fecha": "Jueves 1 de enero",
  "versiculo": "Lleguen a ser adultos en su entendimiento (1 Cor. 14:20).",
  "linkTexto": "https://wol.jw.org/es/wol/h/r4/lp-s/2026/1/1",
  "linkVideo": "jwlibrary://www.jw.org/finder?wtlocale=S&lank=pub-jwb_202005_2_VIDEO"
}
```
