
const formDatosAEnviar = document.querySelector('#formDatosAEnviar');

formDatosAEnviar.addEventListener('submit', function(e) {
    e.preventDefault();
    const params = new FormData(formDatosAEnviar);
    fetch('Alerta.php', { method: 'POST', body: params })
        .then(res => res.json)
        .then(r => {
            console.log(r);
        });
});

function limpiar() {
    for (var i = 0; i < 81; i++) {
        document.getElementsByTagName("input")[i].value = "";
        document.getElementsByTagName("input")[i].style.color = 'blue';
    }
}

function getRespuesta() {
    var bool = validarInput();

    if (bool) {
        var casilla = leerPuzzle();
        if (!casillaValida(casilla)) {
            alert("Valor inválido");
        } else {
            if (buscar(casilla)) {
                outputRespuesta();

            } else {
                alert("No se encontró la solución");
            }
        }
    }
}

function validarInput() {
    var arr = new Array();

    for (var i = 0; i < 81; i++) {
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        if (isNaN(arr[i])) {
            alert('Los valores debes ser cualquier número entre el 1 y el 9');
            return false
        }
    }

    if (arr.every(function isZero(x) { return x == 0 })) {
        alert('No hay valores');
        return false
    }

    return true
}

function leerPuzzle() {
    var arr = new Array();

    for (var i = 0; i < 81; i++) {
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
    }

    var casilla = new Array();
    for (var i = 0; i < 9; i++) {
        casilla[i] = new Array();
        for (var j = 0; j < 9; j++) {
            casilla[i][j] = 0;
        }
    }


    for (var i = 0; i < 81; i++) {
        casilla[Math.floor(i / 9)][i % 9] = arr[i];
    }

    return casilla
}

function getlistaCasillasLibres(casilla) {
    var listaCasillasLibres = new Array();
    index = 0

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (casilla[i][j] == 0) {
                listaCasillasLibres[index] = new Array(i, j);
                index++;
            }
        }
    }

    return listaCasillasLibres
}


function valido(i, j, casilla) {

    for (var column = 0; column < 9; column++) {
        if ((column != j) && (casilla[i][column] == casilla[i][j])) {
            return false
        }
    }

    for (var fila = 0; fila < 9; fila++) {
        if ((fila != i) && (casilla[fila][j] == casilla[i][j])) {
            return false
        }
    }


    for (var fila = Math.floor(i / 3) * 3; fila < Math.floor(i / 3) * 3 + 3; fila++) {
        for (var col = Math.floor(j / 3) * 3; col < Math.floor(j / 3) * 3 + 3; col++) {
            if ((fila != i) && (col != j) && (casilla[fila][col] == casilla[i][j])) {
                return false
            }
        }
    }

    return true
}

function casillaValida(casilla) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if ((casilla[i][j] < 0) || (casilla[i][j] > 9) || ((casilla[i][j] != 0) && (!valido(i, j, casilla)))) {
                return false
            }
        }
    }
    return true
}



function buscar(casilla) {
    var listaCasillasLibres = getlistaCasillasLibres(casilla);
    var numeroCasillasLibres = listaCasillasLibres.length;
    if (numeroCasillasLibres == 0) {
        return true
    }

    var k = 0;

    while (true) {
        var i = listaCasillasLibres[k][0];
        var j = listaCasillasLibres[k][1];
        if (casilla[i][j] == 0) {
            casilla[i][j] = 1;
        }

        if (valido(i, j, casilla)) {
            if (k + 1 == numeroCasillasLibres) {

                return true
            } else {

                k++;
            }
        } else {
            if (casilla[i][j] < 9) {

                casilla[i][j]++;
            } else {

                while (casilla[i][j] == 9) {
                    if (k == 0) {
                        return false
                    }
                    casilla[i][j] = 0;
                    k--;
                    i = listaCasillasLibres[k][0];
                    j = listaCasillasLibres[k][1];

                }
                casilla[i][j]++;
            }
        }
    }
}


function outputRespuesta() {

    var casilla = leerPuzzle();
    var casillaOriginal = leerPuzzle();

    if (buscar(casilla)) {
        for (var i = 0; i < 81; i++) {
            if (casilla[Math.floor(i / 9)][i % 9] != casillaOriginal[Math.floor(i / 9)][i % 9]) {
                document.getElementsByTagName("input")[i].value = casilla[Math.floor(i / 9)][i % 9];
                document.getElementsByTagName("input")[i].style.color = 'black';
            }
        }
    }

}