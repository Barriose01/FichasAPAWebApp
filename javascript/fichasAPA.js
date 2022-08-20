var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var ano = document.getElementById("ano");
var anoPublicacion = "sf"; //Esto es para que, al momento de generar la ficha, en caso de que
                    //este vacio el campo, pueda cambiarlo por "sf"
var titulo = document.getElementById("titulo");
var fecha = document.getElementById("fecha");
var url = document.getElementById("url");
var pais = document.getElementById("pais");
var editorial = document.getElementById("editorial");
var texto = document.querySelectorAll("input[type=text]");
var btnGenerar = document.getElementById("btnGenerar");
var btnLimpiar = document.getElementById("btnLimpiar");
var fichas = document.getElementById("fichas");
var btnBorrarFichas = document.getElementById("btnBorrarFichas");
var librosOWeb = document.getElementById("librosOWeb");
var ficha = "";

function verificarAnoPublicacion(){
    if(isNaN(ano.value) || ano.value <= 0){
        alert("Solo puedes ingresar numeros mayores a cero (0) en este campo");
        ano.value = "";
        anoPublicacion = "sf";
    }else{
        anoPublicacion = ano.value;
    }
    
}
function limpiarTexto(){
    if(librosOWeb.textContent == "Paginas Web"){
        fecha.value = "";
    }
    for(i = 0; i < texto.length; i++){
        texto[i].value = "";
    }
    anoPublicacion = "sf";
   
}
function borrarFichas(){
    if(fichas.textContent != "-No hay fichas para mostrar"){
        var opcion = confirm("Esta seguro de que quiere eliminar todas las fichas?");
        if(opcion){
            fichas.textContent = "-No hay fichas para mostrar";
        }
    }else{
        alert("No hay fichas para eliminar");
    }
}
function obtenerFecha(){
    var mesEscrito;
    var f = new Date(fecha.value);
    var dia = f.getDate() + 1;
    var mes = f.getMonth() + 1;
    var anoDePublicacion = f.getFullYear();

    var meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto",
"septiembre", "octubre", "noviembre", "diciembre"];
    mesEscrito = meses[mes - 1]; //mes devuelve un numero. Ese numero lo usaremos para acceder
    //al mes equivalente en el array 'meses', para poder obtener el mes en formato escrito
    var fechaCompleta = [dia, mes, anoDePublicacion, mesEscrito];
    return fechaCompleta;

}
function verificarCamposObligatorios(){
    var camposLlenos = true;
    for(i = 3; i < texto.length; i++){ //En ambos generadores, son los tres ultimos campos
                                    // los que son obligatorios. Por eso se empieza en 3
        if(texto[i].value == ""){
            camposLlenos = false;
            break;
        }
    }
    return camposLlenos;
    
}
function generarFicha(){
    if(librosOWeb.textContent == "libros"){
        generarFichaLibro();
    }else{
        generarFichaWeb();
    }
}

function generarFichaWeb(){
    var camposObligatoriosLlenos = verificarCamposObligatorios();
    if(fecha.value == ""){
        camposObligatoriosLlenos = false;
    }
    var fechaCompleta = obtenerFecha();

    if(camposObligatoriosLlenos){
        if(nombre.value == "" && apellido.value == ""){
            ficha = titulo.value + ". (" + anoPublicacion + "). Recuperado en " + fechaCompleta[3] + " " + fechaCompleta[0] 
            + ", " + fechaCompleta[2] + ", de " + url.value;
        }else if(nombre.value != "" && apellido.value == ""){
            ficha = nombre.value + ". (" + anoPublicacion + "). " + titulo.value + ". Recuperado en " + 
            fechaCompleta[3] + " " + fechaCompleta[0] + ", " + fechaCompleta[2] + ", de " + url.value;
        }else if(apellido.value != "" && nombre.value == ""){
            ficha = apellido.value + ". (" + anoPublicacion + "). " + titulo.value + ". Recuperado en " + 
            fechaCompleta[3] + " " + fechaCompleta[0] + ", " + fechaCompleta[2] + ", de " + url.value;
        }else{
            ficha = apellido.value + ", " + nombre.value[0] + ". " + titulo.value 
            + ". (" + anoPublicacion + "). Recuperado en " + fechaCompleta[3] + " " + fechaCompleta[0]  + ", " 
            + fechaCompleta[2] + ", de " + url.value;
        }
        alert("La ficha ha sido generada con exito");
        limpiarTexto();
        if(fichas.textContent == "-No hay fichas para mostrar"){
            fichas.innerHTML = "-" +ficha + "<br><br>"; //Pongo dos <br> para que haya mas espacio
                                                         //entre fichas
        }else{
            fichas.innerHTML +=  "-" + ficha + "<br><br>";
        }   
    }else{
        alert("Por favor, llene los campos obligatorios");
    }
}
function generarFichaLibro(){
    var camposObligatorios = verificarCamposObligatorios();
    
    if(camposObligatorios){
        if(nombre.value == "" && apellido.value == ""){
            ficha = titulo.value + ". (" + anoPublicacion + "). " + pais.value + ": " + editorial.value;
        }else if(nombre.value != "" && apellido.value == "" ){
            ficha = nombre.value + ". (" + anoPublicacion + "). " + titulo.value + ". " + pais.value + ": " 
            + editorial.value; 
        }else if(apellido.value != "" && nombre.value == ""){
            ficha = apellido.value + ". (" + anoPublicacion + "). " + titulo.value + ". " + pais.value + ": " 
            + editorial.value; 
        }
        else{
            ficha = apellido.value + ", " + nombre.value[0] + ". (" + anoPublicacion + "). " + titulo.value + ". " 
            + pais.value + ": " + editorial.value; 
        }
        alert("La ficha ha sido generada con exito");
        limpiarTexto();
        if(fichas.textContent == "-No hay fichas para mostrar"){
            fichas.innerHTML = "-" +ficha + "<br><br>"; //Pongo dos <br> para que haya mas espacio
                                                         //entre fichas
        }else{
            fichas.innerHTML +=  "-" + ficha + "<br><br>";
        }
    }else{
        alert("Por favor, llene los campos obligatorios");
    }
}
ano.addEventListener("keyup", verificarAnoPublicacion, false);
btnLimpiar.addEventListener("click", limpiarTexto, false);
btnBorrarFichas.addEventListener("click", borrarFichas, false);
btnGenerar.addEventListener("click", generarFicha, false);