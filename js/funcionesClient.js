//Client

function consultarClient(){
    $.ajax({
        url:"http://129.151.120.159:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            imprimirRespuesta2(respuesta);
        }
    });
}

function imprimirRespuesta2(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarClient("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarClient("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";

    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarClient(){
    if ($("#Cemail").val().length==0 || $("#Cpassword").val().length==0 
    || $("#Cname").val().length==0 || $("#Cage").val().length==0) {

        alert("Todos los campos son obligatorios");
    }
    else{
        let var2 = {
            email:$("#Cemail").val(),
            password:$("#Cpassword").val(),
            name:$("#Cname").val(),
            age:$("#Cage").val(),
            };
    
            console.log(var2);
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            
            url:"http://129.151.120.159:8080/api/Client/save",
           
            
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

function actualizarClient(idElemento){
    if ($("#Cemail").val().length==0 || $("#Cpassword").val().length==0 
    || $("#Cname").val().length==0 || $("#Cage").val().length==0) {

        alert("Todos los campos son obligatorios");
    }
    else{
        let myData={
            idClient:idElemento,
            email:$("#Cemail").val(),
            password:$("#Cpassword").val(),
            name:$("#Cname").val(),
            age:$("#Cage").val(),
    
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.120.159:8080/api/Client/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado3").empty();
                $("#id").val("");
                $("#Cemail").val("");
                $("#Cpassword").val("");
                $("#Cname").val("");
                $("#Cage").val("");
                consultarClient();
                alert("se ha Actualizado correctamente la información")
            }
        });
    }
}

function borrarClient(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.120.159:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            consultarClient();
            alert("Se ha Eliminado correctamente.")
        }
    });
}