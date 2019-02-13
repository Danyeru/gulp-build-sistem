#Gulp build sistem #

Basado en:
(https://goo.gl/DH4toz "Youtube tutorial")

## Initial Setup ##
Primero se debe crear la estructura incial de archivos y directorios.

> root
> > app > _index.html_
> > > css
> > > scss > _style.scss_
> > > images
> > > js > _main.js_

### GIT ###
(https://git-scm.com/)

Se den crear los archivos para su funcionamiento

> root > _readme.md_ _.gitignore_

Agregar codigo boiler plate a .gitignore __Esto permite que git ignore cierto archivoas al realizar comitts y realizar push es particularmente util para evitar que sincronice los archivos de node__


    # Packages #
    ############
    # it's better to unpack these files and commit the raw source
    # git has its own built in compression methods
    *.7z
    *.dmg
    *.gz
    *.iso
    *.jar
    *.rar
    *.tar
    *.zip

    # Logs and databases #
    ######################
    *.log
    *.sql
    *.sqlite

    # OS generated files #
    ######################
    .DS_Store
    .DS_Store?
    ._*
    .Spotlight-V100
    .Trashes
    ehthumbs.db
    Thumbs.db

    # Build Systems #
    ######################
    node_modules/
    bower_components/
    .sass-cache
    *.css.map
    build/
    dist/
    maps/


### Bower ###

(https://bower.io/)

#### Lista de componentes installados con bower ####
    jquery
    bootstrap4

Primero se debe instalar bower usando la linea de comando com npm

    npm install -g bower

Una ves instalado bower globalmente, __si no se tiene__ se debe ingresar nuevamente a la carpeta __app__ y ahi inicializar bower:

    bower init

_Si el comando genera inconvenientes de incio se debe usar otra consola en el caso de windows se puede usar __cmd__ esto debe solucionar el inconveniente_

Una vez logrado el archivo __bower.json__ podemor proceder a intalar paquetes, (aca realice la instalacion desde Cygwin y funciono perfectamente).
Se puede instalar dependendecias para el desarrollo como __JQuery, Angular, Backbone__ segun su necesidad para esto se debe usar el siguiente comando:

    bower install jquery --save

_Si el comando se usa sin --save este sera intalado pero no sera una dependencia del desarrollo_ 

Para ver la ruta relativa de los componentes de bower se usar:<
    
    bower list -paths

De esta forma se puede saber que ruta usar para incluir los archivos dentro el main HTML.

Sin embargo hay que tner en cuenta las rutas especificas que usa cada archivo, comoo es el caso de __bootstrap__ ya que la instalacion de boostrap usa varios archivos un CSS y dos JS en esta instalcion las rutas quedaron de la siguiente forma:

    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap4/dist/css/bootstrap.min.css">
    <script type="text/javascript" src="bower_components/bootstrap4/assets/js/vendor/popper.min.js"></script>
    <script type="text/javascript" src="bower_components/bootstrap4/dist/js/bootstrap.min.js"></script> 

Una de las ventajas que se tiene al usar bower es que si se borra una dependencia o no existe, al tener instalado bower y gracias al archivos __.gitignore__ que previene que los commits tomen los paquetes bower solo con poner un  comando bower instalara las dependencias necesesaria:

    bower install


## Gulp install ##

Primero se debe instalar global 

    npm install -g gulp

Luego debemos instalarlo local para hacer esto usamos __npm__, debemos volver al directorio raiz y inicializar __npm__

    npm init

luego se realiza la instalacion local dentro del directorio root, se usa __--save-dev__ par generar la dependencia.

    npm install gulp --save-dev

Una vez instalado el gulp localmente procedemos a crear el archivo gulp

    touch gulpfile.js

### instalando gulp pakages ###

_los paquetes instlados inicialmente son:_

    npm install gulp-plumber --save-dev
    npm install gulp-uglify --save-dev
    npm install browser-sync --save-dev
    npm install gulp-sass --save-dev
    npm install gulp-autoprefixer --save-dev
    npm install del --save-dev
    npm install gulp-rename --save-devclear

Lo primero que se debe hacer para comenzar a trabajar con el gulp file __(gulpfile.js)__ en donde sevan a manejar las tareas es requerir los modulos: 

    var gulp = require('gulp'),
        uglify = require('gulp-uglify');

Despues de esto podemos comenzar a crear las tareas las cuales iran directamente bajo el requerimiento de modulos

    gulp.task('scripts', function(){
        console.log('It worked dude!!');
    });

_la amnterior es solo un task de prueba con esta podemos confirmar que la tarea este funcionando logrando que devuelva un texto haciendo uso de un console.log_ 



>#### UGLIFY ####
>
>(https://www.npmjs.com/package/uglify-js)

Una ves se tiene configurada la estructura basica de la funcion se puede proceder a agregarle las capacidades requeridas como se ve a continuacion:

    gulp.task('scripts', function(){
      gulp.src('app/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('app/js'));
    }); 

_En el caso anterios la funcion haciendo uso de un glob toma todos los asrchivos .js dentro del directorio js y los pasa por el complemento __uglify__ para despues poner el nuevo archivo nuevamente en la carpeta de donde lo tomo._


>#### RENAME ####
>
>(https://www.npmjs.com/package/gulp-rename)

Luego podemos agregarle una funcion como rename la cual nos permitira agregar a la funcion principal otras tareas como el rename, en este caso nos permtira agregar un subfijo __.min__ al nombre del archivo antes de ser minificado por el Uglify, como se ve a continuacion.

    gulp.task('scripts', function(){
      gulp.src(['app/js/**/*.js', '!app/js/**/*min.js'])
      .pipe(rename({suffix:".min"}))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'));
    });  

_En este momento se generaran dos archivos uno que es el original con el codigo js tal como lo hemos trabajadon y otro minficado el cual tendra el mismo nombre que el original pero con el prefijo min. Tambien le agregamos un nuevo parametro al src de la tarea `!app/js/**/*min.js` en ete caso se usa para que cada vez que la funcion __gulp__ se ejecute omita el archivo  minificado y no lo vueva a pasar por la funcion de esta forma solo sera renovado._ 

>#### SASS BUIL FUNCTION WITH PLUMBER AND AUTOPREFIXER ####
>
>(https://www.npmjs.com/package/gulp-sass "gulp-sass")
>(https://www.npmjs.com/package/gulp-plumber "gulp-plumber")
>(https://www.npmjs.com/package/gulp-autoprefixer "gulp-autoprefixer")


La siguiente funcion compila los archivos .scss para general el archivo style.css final en este caso hacemos uso de otros dos paquetes, primero plumber que nos permite identificar cuando hay un error dentro de nuestro archivos y bloquee la consola, por otro lado se usa el autoprefixer para agregar todos los prefijos necesarios para que la pagina trbaje correctamente en todo los brwsers. 

    gulp.task('styles', function(){
      gulp.src('app/scss/**/*.scss')
      .pipe(plumber())
      .pipe(sass({errorLogConsole:true}))
      .pipe(prefixer('last 2 versions'))
      .pipe(gulp.dest('app/css'))
    });

_Al igual que la anterior tarea esta dbemos agregarla al defautl task de este modo cada vez que se ejecute el comando gulp ambas tareas se ejecutaran._

>#### HTML TASK ####

Es una tarea muy sencialla y se realiza basicamente para poder integrar el browserSync, tambien debe ser agregada al watch task y al default task, consiste en lo siguiente.

    gulp.task('html', function(){
      gulp.src('app/**/*.html');
    });

>#### BROWSER SYNC TASK ####
>
>(https://browsersync.io/docs/gulp "Docuymentacion directa ha gulp + browsersync")

La tarea de browser sync es muy importante para el desarrollo front-end ya que permite ir trbajando en los archivos de la pagina (HTML, CSS, JS, etc) y visualizando los ajustes en tiempo real, cada vez que se guarde un archivo, browser sync reflejara los cambios inyectandolos, Esto quiere decir que que los ajustes se visualizaran sin necesidad de reacargar la pagina. 

Para poder usar este plugin primero se debe realizar un require sin embargo en este caso en especifico existeun modificacion.

    var browserSync = require('browser-sync');
    var reload = browserSync.reload;

_Se debe incluir reload como una funcion invidual dirigida especificamente al paquete como se ve arriva_

Para generar la tarea debemos estructurarla de la siguiente manera:

    gulp.task('browser-sync', function(){
      browserSync({
        server:{
          baseDir:"./app/"
        }
      });
    });

_En este paso lo mas importante es definir el directorio base que en este caso es __./app/__ sin embargo este directorio puede ser modificado para ajustarse a las necesidades del usuario._

Luego se debe generear el triguer para cada funcion de esta manera cada vez que una funcion se ejecute va a disparar el triguer para esto se debe agregar el triguer como el ultimo .pipe de cada funcion que se quiera sincronizar.

    .pipe(reload({stream:true}));

_Asi mismo __browser-sync__ debeser agregado a la lista de watch._

El plugin tambien permite sincronizar varios dispositivos externos. _Al ejecutar el script de browser sync en la consola salen los siguientes parametros_

     -----------------------------------
           Local: http://localhost:3000
        External: http://10.50.8.60:3000
     -----------------------------------
              UI: http://localhost:3001
     UI External: http://10.50.8.60:3001
     -----------------------------------

__Nota: los numeros o parametros que se muestran aca pueden variar dependiendo el dispositivo.__

* _Local: esta url que sirve para visualizar la pagina en el desarrollo local_
* _External: es la ip que debe ingresarce en dispositivos externos para visualizar el desarrollo (todos los dispositivos estan sincronizados, incluso el scroll, si se hace la accion en los desmas dispositivos se vera reflejada)._
* _UI: es la url local que permite ver la consola del browser sync, se pueden modificar una gran variedad de parametros._
* _UI External: esta ip permite visualizar la consola de browser syn en dispositivos externos._ 

>#### BUILD TASK ####

La tarea build de gulp permite que en el momento de finalizar el proyecto se genere un estructura de entrega, es decir que gulb buscara los archivos esenciales del desarrollo y los encapsulara en un directorio especifico en este caso __build__, otra de las caracteristicas especiales de  

>#### WATCH TASK ####

Para permitir que gulp se ejecute cada vez que se realizan cambios en los archivos se debe crear una tarea tipo __watch__ esto permite que cada vez que se efectuen cambios gulp se ejecute, eso lo logramos de la siguente manera:

    gulp.task('watch', function(){
      gulp.watch('app/js/**/*.js', ['scripts']);
      gulp.watch('app/scss/**/*.scss', ['styles']);
      gulp.watch('app/**/*.html', ['html'])
    });

_Como se puede observa basicamente se le dan las rutas a los directorios que se desean revisar y se enuncia la funcion que se debe ejecutar en caso de un cambio. Al igula que las demas tareas debe ser agregada a la tarea default de esta manera se inicializan todas las tareas._

>#### DEFAULT TASK ####

Realmente un default task en gul es una regla que permite ejecutar multiples reglas al mismo tiempo, permtiendo que que le codigo sea mucho mas escalable.
En este caso la usamos para ejecutar el task scripts.table-striped

    gulp.task('default', ['styles', 'scripts', 'html', 'watch']);

_Como se puede ovserbar en este caso el llamado a la funcion se encuentra dentro del array de funciones de marcado por __[ ]__ adicionalmente en este caso para ejecutar la funcion solo se requiere pasar el comando gulp._


#### node glob functions  ####

Estas funciones permite seleccionar multiples archivos de una msmas clase para realizar una tarea especifica con todos ellos. Por ejemplo si se desea seleccionar todos los archivos css de una carpeta se usaria una ruta asi:

    css/*.css

_El asterixco que antecede la extencion del archivo es el indicador de globalidad, es decir es el que permite que todos los archivos con esa extencion sean seleccionados_

Ahora si lo que se desea es acceder a todos los archivos .css dentro del directorio css y a todos los archivos dentro de los subdirectorios la estructura seria asi:

    css/**/*.css

Por otro lado tambien se pueden excluir archivos con el uso del patron el cual seria algo asi:

    !css/stule.css

Tambien se pueden usar expresiones mas complejas como:

    *.+(js|css)

_La anterior permite seleccionar todos los archivos terminado en extenciones .js y .css que se encuentren en el directorio raiz._




## REFERENCIAS  ADICIONALES##

(https://github.com/isaacs/node-glob "Glob -- Match files using the patterns the shell uses, like stars and stuff.")

(https://github.com/isaacs/minimatch "Minimach -- A minimal matching utility.")

(https://www.smashingmagazine.com/2014/06/building-with-gulp/ "SAMASHING MAGAZINE -- How To Build And Develop Websites With Gulp") 



