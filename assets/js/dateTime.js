'use strict';
var MostrarFechafunction = function(){
    var nombres_dias = new Array("Domingo", "Lunes", "Martes", "Mi\u00E9rcoles", "Jueves", "Viernes", "S\u00E1bado");
    var nombres_meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var fecha_actual = new Date();
    var dia_mes = fecha_actual.getDate(); //dia del mes
    var dia_semana = fecha_actual.getDay(); //dia de la semana
    var mes = fecha_actual.getMonth() + 1;
    var anio = fecha_actual.getFullYear();
    var fechaHora = new Date();
    var horas = fechaHora.getHours();
    var minutos = fechaHora.getMinutes();
    var segundos = fechaHora.getSeconds();
    // var sufijo = 'AM';
    // if (horas > 12) {
    //     horas = horas-12;
    //     sufijo = 'PM';
    // }
    // if (horas < 10) {
    //     horas = '0' + horas;
    // }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }
    if (segundos < 10) {
        segundos = '0' + segundos;
    }
    //escribe en pagina
    var textoHora = " |    <b>"+horas + "</b>:<b>"+minutos+"</b> : " + segundos;
    var textoFecha = "<b>" + nombres_dias[dia_semana] + "</b>" + ", "+dia_mes + " de " + nombres_meses[mes-1] + " de " + anio + textoHora;
    $('#fecha').html(textoFecha);
}