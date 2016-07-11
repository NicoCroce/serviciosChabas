var DATOS = {
    'colectivosRosario': {
        'data': null,
        'loaded': false
    },
    'colectivosFirmat': {
        'data': null,
        'loaded': false
    },
    'telefonos': {
        'data': null
    },
    'telGeneral': {
        'loaded': false
    },
    'telRemises': {
        'loaded': false
    },
    'telRoticerias': {
        'loaded': false
    }
};

$.getJSON("./data/rosario.json", function (data) {
    DATOS.colectivosRosario.data = data.colectivos;
    obtainDataBus("rosario");
});

$.getJSON("./data/firmat.json", function (data) {
    DATOS.colectivosFirmat.data = data.colectivos;
});

$.getJSON("./data/telefonos.json", function (data) {
    DATOS.telefonos.data = data;
});


//*************************************    SECCIÓN  Obtiene datos    *************************************

var obtainDataBus = function (nombre) {
    if (NombreService != "colectivos.html" || !loadedHTML) { return; }
    setTimeout(function () {
        switch (nombre) {
            case 'rosario':
                if (DATOS.colectivosRosario.data === null || DATOS.colectivosRosario.loaded) { return };
                DATOS.colectivosRosario.data.forEach(function (element, index) {
                    var hasDetails = '';
                    if (element.detalle != "") { hasDetails = 'has-details is-link' }
                    $('#tablaRosario').append(
                        "<tr id='filaColectivo' class='" + hasDetails + "' detalle= " + element.detalle + ">" +
                        "<td>" + element.horario + "</td>" +
                        "<td>" + element.empresa + "</td>" +
                        "<td class='icon-info'></td></tr>"
                    );
                });
                DATOS.colectivosRosario.loaded = true;
                break;
            case 'firmat':
                if (DATOS.colectivosFirmat.data === null || DATOS.colectivosFirmat.loaded) { return };
                DATOS.colectivosFirmat.data.forEach(function (element, index) {
                    var hasDetails = '';
                    if (element.detalle != "") { hasDetails = 'has-details is-link' }
                    $('#tablaFirmat').append(
                        "<tr id='filaColectivo' class='" + hasDetails + "' detalle= " + element.detalle + "><td>" + element.horario + "</td><td>" + element.empresa + "</td><td class='icon-info'></td></tr>"
                    );
                });
                DATOS.colectivosFirmat.loaded = true;
                break;
            default:
                break;
        }
    }, 50);
};

var obtainDataTel = function (nombre) {
    if (NombreService != "telefonos.html" || !loadedHTML) { return; }
    setTimeout(function () {
        switch (nombre) {
            case 'principales':
                if (DATOS.telefonos.data === null) { return };
                setTimeout(function () {
                    $('#phonesData').empty();
                    DATOS.telefonos.data.principales.forEach(function (element, index) {
                        $('#phonesData').append(
                            "<tr>" +
                            "<td>" + element.nombre + "</td>"
                            + "<td><div><span class='icon-phone'></span><span class='dato'><strong>" + element.numero + "</strong></span></div></td>"
                            + "<td><div><span class='icon-location'></span><span class='dato'><strong>" + element.direccion + "</strong></span></div></td></tr>"
                        );
                    });
                }, 50);
                break;
            case 'remises':
                if (DATOS.telefonos.data === null) { return };
                setTimeout(function () {
                    $('#phonesData').empty();
                    DATOS.telefonos.data.remises.forEach(function (element, index) {
                        $('#phonesData').append(
                            "<tr>" +
                            "<td>" + element.nombre + "</td>"
                            + "<td><div><span class='icon-phone'></span><span class='dato'><strong>" + element.numero + "</strong></span></div></td>"
                            + "<td><div><span class='icon-location'></span><span class='dato'><strong>" + element.direccion + "</strong></span></div></td></tr>"
                        );
                    });
                }, 50);
                break;
            case 'roticerias':
                if (DATOS.telefonos.data === null) { return };
                setTimeout(function () {
                    $('#phonesData').empty();
                    DATOS.telefonos.data.roticerias.forEach(function (element, index) {
                        $('#phonesData').append(
                            "<tr>" +
                            "<td>" + element.nombre + "</td>"
                            + "<td><div><span class='icon-phone'></span><span class='dato'><strong>" + element.numero + "</strong></span></div></td>"
                            + "<td><div><span class='icon-location'></span><span class='dato'><strong>" + element.direccion + "</strong></span></div></td></tr>"
                        );
                    });
                }, 50);
                break;
            default:
                break;
        }
    }, 50);
};

//************************************************************************************