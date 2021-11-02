//Reportes
function consultarReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.120.159:8080//api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            imprimirStatus(respuesta);
        }
    });
}

function imprimirStatus(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

function consultarReporteDate(){
    if($("#RstarDate").val().length == 0 || $("#RdevolutionDate").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }
    else{ 
        var fechaInicio = document.getElementById("RstarDate").value;
        var fechaCierre = document.getElementById("RdevolutionDate").value;
        console.log(fechaInicio);
        console.log(fechaCierre);
    
        $.ajax({
        url:"http://129.151.120.159:8080//api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            imprimirRespuestaDate(respuesta);
            }
        });
    }
}

function imprimirRespuestaDate(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
          
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
          
    myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoDate").html(myTable);
}

function consultarReporteClientes(){
    $.ajax({
    url:"http://129.151.120.159:8080//api/Reservation/report-clients",
    type:"GET",
    datatype:"JSON",
    success:function(respuesta){
        console.log(respuesta);
        imprimirRespuestaClientes(respuesta);
        }
    });
}

function imprimirRespuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
          
    for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
          
        myTable+="</tr>";
        }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}
