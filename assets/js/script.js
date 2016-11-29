//Variables**********************************************************************************
var hightElementos, hightFooter;

var arregloImagenes = [];
var TotalImagenes = 10;
var TiempoCambiaImagen = 2000;
/**
 * Hide the URL address bar on standard Android's browser by setting enough
 * document height and auto scrolling to active the bar hiding feature
 */

var NombreService;
var pasoTiempoInicio = false;
// $('#nombreLocalidad').text("Chabás");
setTimeout(function(){
    pasoTiempoInicio = true;
}, 2000);

var loadedHTML = false;

$(window).on('load', (function() {
    if(!pasoTiempoInicio){
        setTimeout(function(){
            $('.carga-img').addClass('hide');
            setTimeout(function(){
                $('.carga-img').addClass('all');
            }, 500);
        }, 0); //2000
    }
}));

$(document).ready(function() {
    window.setInterval(function() {
        MostrarFechafunction();
    }, 1000);

    cargaPubliMobile();
    //(((((((((((((((((((((((((((       Carga foother luego de Cargar los demás componentes         )))))))))))))))))))))))))))
    $('.cambio-info').load('./partials/home.html');
    NombreService = "home.html";
    ActualizaAltos();
    /*setTimeout(function() {
        
        //cambiaImagen();
    }, 0);*/

    //(((((((((((((((((((((((((((((((((((((((((     Slide del MENU!!!       )))))))))))))))))))))))))))))))))))))))))
    var closedMenu = true;
    var startedAnim = false;

    $('.main-menu').click(function(event) {
        if (startedAnim) {
            return;
        }
        if (!closedMenu) {
            startedAnim = true;
            $(this).removeClass('opened');
            $(".options").removeClass('opened');
            $('body').addClass('options-close');
            $('.servicio-select').removeClass('menu-abierto');
            setTimeout(function() {
                startedAnim = false;
                $('body').removeClass('options-open');
                $('body').removeClass('options-close');
                closedMenu = true;
                // $('.main').removeClass('box-shadow');
            }, 500);
        } else {
            startedAnim = true;
            $('body').addClass('options-open');
            $(this).addClass('opened');
            $(".options").addClass('opened');
            closedMenu = false;
            setTimeout(function() {
                startedAnim = false;
                // $('.main').addClass('box-shadow');
            }, 500);
        }
    });

    if (window.location.hash !== "") {
        var str = window.location.hash;
        str = str.replace("#", "");
        SeleccionaServicio(str, false);
    }

    //  ((((((((((((((((((((((((((((((((((((((((((      SELECCIONA SERVICIO     ))))))))))))))))))))))))))))))))))))))))))
    $('.servicio-select').click(function(event) {
        resetLoaded();
        SeleccionaServicio($(this), true, event);
        event.preventDefault();
    });

    var resetLoaded = function(){
        loadedHTML = false;
        DATOS.colectivosRosario.loaded = false;
        DATOS.colectivosFirmat.loaded = false;
    };

    function SeleccionaServicio(elemento, seleccionado, event) {
        var subTitle = "";
        if (seleccionado) {
            subTitle = elemento.attr('subtitle');
            NombreService = elemento.attr('id') + '.html';
            window.location.hash = elemento.attr('id');
            loadedHTML = false;
        } else {
            subTitle = $('#' + elemento).attr('subtitle');
            NombreService = elemento + '.html';
            window.location.hash = elemento;
            loadedHTML = false;
        }

        startedAnim = true;
        $('.main-menu').removeClass('opened');
        $(".options").removeClass('opened');
        $('body').addClass('options-close');
        $('.servicio-select').removeClass('menu-abierto');
        setTimeout(function() {
            startedAnim = false;
            $('body').removeClass('options-open');
            $('body').removeClass('options-close');
            closedMenu = true;
        }, 500);

        $('.sub-header h3').text(subTitle);

        $('.info').remove();
        $('.cambio-info').load('./partials/' + NombreService);
        loadedHTML = true;
        cargaPubliMobile();
        if (NombreService == "colectivos.html") {
            $('.main').addClass('bus-section');
                obtainDataBus("rosario");
                
            $('.destinos').click(function() {
                $('.destinos').removeClass('destino-activo');
                $(this).addClass('destino-activo');
                if ($(this).attr('id') == "destinoRosario") {
                    $('.tabla-rosario, .tabla-firmat').removeClass('visible');
                    $('.tabla-rosario').addClass('visible');
                } else {
                    obtainDataBus("firmat");
                    $('.tabla-rosario, .tabla-firmat').removeClass('visible');
                    $('.tabla-firmat').addClass('visible');
                }
            });
        } else {
            $('.main').removeClass('bus-section');
        }

        if (NombreService == "telefonos.html") {
            $('.main').addClass('tel-section');
            obtainDataTel("principales");
        } else {
            $('.main').removeClass('tel-section');
        }

        ActualizaAltos();
    }
});


//((((((((((((((((((((((((((((((((((((((((((((((((((        Temporizador        ))))))))))))))))))))))))))))))))))))))))))))))))))
    setTimeout(function TimerImagen() {
        cambiaImagen();
        if (Math.ceil($(window).width()) > 360) {
            cambiaImagenPubliGrande();
        }
        setTimeout(TimerImagen, TiempoCambiaImagen);
    }, TiempoCambiaImagen);

//((((((((((((((((((((((((((((((((((((((((((((((((((       Cambia altos       ))))))))))))))))))))))))))))))))))))))))))))))))))



//*************************************    SECCIÓN  muestra info de cole    *************************************

    $(document).on('click', '#filaColectivo', function() {
        $('#infoBlock').removeClass('visible');
        if ($(this).hasClass('has-details')) {
            $('.main-menu').addClass('hidden');
            $('#infoBlock').addClass('visible');
            var detalle = $(this).attr('detalle');
            $("#msgBlock").text(detalle);            
        };
    });

    $(document).on('click', '.icon-cancel-circle, #infoBlock', function(){
        $('#infoBlock').removeClass('visible');
        $('.main-menu').removeClass('hidden');
    });

//************************************************************************************

var ActualizaAltos = function() {
    setTimeout(function() {
        var mainHeaderH = $(".complete-header").height();
        var footerH = $("footer").outerHeight();
        $('.content').height($(window).height() - mainHeaderH);
        var marginPadding = $(".cambio-info").outerHeight(true) - $(".cambio-info").height();
        var infoHeight = $(window).height() - mainHeaderH - footerH - marginPadding;
        $(".cambio-info").height(infoHeight);
        $(".content > .wrapper").height(infoHeight + marginPadding);	
    }, 100);

    if (NombreService == 'colectivos.html') {
        setTimeout(function() {
            var tableHeaderH = $(".header-table").innerHeight();
            var cambioInfo = $(".cambio-info").height();
            $("#tablaHorarios").height(cambioInfo - tableHeaderH);
        }, 150);

    } else if (NombreService == "contacto.html") {
        $('.main').addClass('contact-section');
        setTimeout(function() {
            var altoInfo = $('.cambio-info').height();
            var altoComentario = $('#txtComentario').outerHeight(true) - $('#txtComentario').height();
            var altoInterior = $('#txtNombre').height() + $('#sendBt').outerHeight(true) + altoComentario;
            $('#txtComentario').height(altoInfo - altoInterior);
        }, 150);
    } else {
        $('.main').removeClass('tel-section');
    }
};

//////((((((((((((((((((((((((((((((((((((((((((       ))))))))))))))))))))))))))))))))))))))))))


// setTimeout(function() {
//     var mainHeaderH = $(".complete-header").height();
//     var footerH = $("footer").height();
//     var marginPadding = $(".cambio-info").outerHeight(true) - $(".cambio-info").height();
//     $(".cambio-info").height($(document).height() - mainHeaderH - footerH - marginPadding);
// }, 100);

$(window).resize(function() {
    ActualizaAltos();
});

//((((((((((((((((((((((((((((((((((((((      Carga HTML Telefonos       ))))))))))))))))))))))))))))))))))))))
$(document).on('click', '.bt-instituciones', function() {
    var idTelefono = $(this).attr('id') + '.html';
    $('.bt-instituciones').removeClass('active');
    $(this).addClass('active');
    $('.tabla-telefonos').load('./partials/telefonos/' + idTelefono);
    obtainDataTel($(this).attr('id'));
});

//(((((((((((((((((((((((((((((((((((((((((((((((       Publis footer       )))))))))))))))))))))))))))))))))))))))))))))))
completaArreglo();

function cambiaImagen() {

    $('.imagenFooter').addClass('opacity-img');

    var cantidadImagenes = 6;
    if (Math.ceil($(window).width()) <= 360) {
        cantidadImagenes = 2;
    }

    for (var i = 1; i <= cantidadImagenes; i++) {
        var nombreImg = retornaImagen();
        $(".img-footer" + i).css({
            'background-image': 'url(./img/' + nombreImg + '.jpg)'
        });
    }
    $('.imagenFooter').removeClass('opacity-img');
};

//(((((((((((((((((((((((((((((((((((((((((((((((       Publis grandes      )))))))))))))))))))))))))))))))))))))))))))))))
completaArreglo();

function cambiaImagenPubliGrande() {
    //if (Math.ceil($(window).width()) <= 360) { return; }

    $('.publicidad-1').addClass('opacity-img');

    var nombreImg = retornaImagen();
    $(".publicidad-1").css({
        'background-image': 'url(./img/' + nombreImg + '.jpg)'
    });

    $('.publicidad-1').removeClass('opacity-img');
};


//(((((((((((((((((((((((((((((((((((((((       Funciones para cambiar imágenes         ))))))))))))))))))))))))))))))))))))))) 
function completaArreglo() {
    for (var i = 0; i < TotalImagenes; i++) {
        arregloImagenes[i] = i + 1;
    }

};

function retornaImagen() {
    if (arregloImagenes.length == 0) {
        completaArreglo();
    }
    var indexImagen = Math.floor(Math.random() * (arregloImagenes.length - 1));

    var imgNumber = arregloImagenes[indexImagen];
    // console.log(imgNumber);
    // console.log("tama del arreglo   " + arregloImagenes.length);
    arregloImagenes.splice(indexImagen, 1);
    return imgNumber;
};


//(((((((((((((((((((((((((((       Carga publi grande!         )))))))))))))))))))))))))))
function cargaPubliMobile() {
    $('.publi-mayor-mobile').removeClass('display-none');
    cambiaImagenPubliGrande();
    setTimeout(function() {
        $('.publi-mayor-mobile').addClass('opacity-img');
        setTimeout(function() {
            $('.publi-mayor-mobile').addClass('display-none');
            $('.publi-mayor-mobile').removeClass('opacity-img');
        }, 1000);
    }, 2000);
}