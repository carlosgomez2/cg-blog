# Problemas

- existen 2 ambientes: desarrollo y produccion(github pages)

Los problemas son los siguientes:

- en desarrollo hay que utilizar la ruta absoluta /assets/ruta/main.css
- en produccion o la gema de github o el sitio jekyll serve {{ site.baseurl }}/assets/ruta/main.css

El problema principal es que en development tengo la ruta localhost:3000/assets/...
en produccion tengo carlosgomez2.github.io/cg-blog/assets/...

cuando pongo los vinculos absolutos se recorre un directorio y no encuentra las carpetas


## Posibles soluciones

- ya probe incluyendo un hack para liquid que setea el base a baseurl y solo se requiere incluir a un parcial para que funcione, pero solo funciona bien bajo desarrollo, en produccion ya no

- CAMBIAR TODO AL AMBIENTE DE PRODUCCION, lo cual es lo que estoy haciendo, {{ site.baseurl }} va a estar prefijado en todos los vinculos y src, ya no va a funcionar el ambiente de desarrollo, cuando suba a github-pages en teoria deberia de funcionar las rutas

- En los styles que estan embebidos en .md o en el post .html hay que cambiar el path de src /cg-blog/assets/...ahi no funciona {{ site.baseurl }}



## TODO:
1. conseguir la direccion de ERM
2. conseguir la direccion de PML
3. cambiar la imagen de ERM en el work
4. cambiar la imagen de PML en el work
5. corregir en otros proyectos (no se visualizan bien los assets)
6. corregir los posts
7. crear al menos 3 posts mas
8. desplegar a GH
9. comprar un dominio (por 3 o mas años)
10. vincular el dominio
11. corregir las fuentes TTF