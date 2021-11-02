//Specialty
function consultarSpecialty(){
    $.ajax({
        url:"http://129.151.120.159:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            imprimirRespuesta(respuesta);
        }
    });
}

function imprimirRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarSpecialty("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarSpecialty("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarSpecialty(){
    if ($("#Sname").val().length==0 || $("#Sdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }
    else{
        let var2 = {
            name:$("#Sname").val(),
            description:$("#Sdescription").val()
            };
            console.log(var2);
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            
            url:"http://129.151.120.159:8080/api/Specialty/save",
           
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()
            },
                
            error: function(jqXHR, textStatus, errorThrown) {
                  window.location.reload()
                alert("No se guardo correctamente");       
            }
        });
    }
}

function actualizarSpecialty(idElemento){
    if ($("#Sname").val().length==0 || $("#Sdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }
    else{
        let myData={
            id:idElemento,
            name:$("#Sname").val(),
            description:$("#Sdescription").val()
    
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.120.159:8080/api/Specialty/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                $("#id").val("");
                $("#Sname").val("");
                $("#Sdescription").val("");
                consultarSpecialty();
                alert("Se ha Actualizado correctamente la información")
            }
        });
    }
}

function borrarSpecialty(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.120.159:8080/api/Specialty/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            consultarSpecialty();
            alert("Se ha Eliminado correctamente.")
        }
    });
}