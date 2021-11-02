//Reservaciones
function autoConsultarCliente(){
    
    $.ajax({
        url:"http://129.151.120.159:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            }); 
        }
    })
}
function autoConsultarDoctor(){
    $.ajax({
        url:"http://129.151.120.159:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-doctor");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            }); 
        }
    })
}
function consultarReservation(){
    $.ajax({
        url:"http://129.151.120.159:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            imprimirRespuesta4(respuesta);
        }
    });
}
function imprimirRespuesta4(response){
   
    let myTable="<table>";     
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].doctor.name+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+='<td><button  onclick="borrarReservation(' + response[i].idReservation + ')">Borrar Reserva</button></td>';
        myTable+='<td><button  onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar Reserva</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservation").html(myTable);
}

function guardarReservation() {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            doctor:{id: +$("#select-doctor").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://129.151.120.159:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    }
}

function actualizarReservation(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            doctor:{id: +$("#select-doctor").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.120.159:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("se ha Actualizado Correctamente!")
                $("#resultadoReservation").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }
    let dataToSend = JSON.stringify(elemento);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.120.159:8080/api/Reservation/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultadoReservation").empty();
                alert("se ha Eliminado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

