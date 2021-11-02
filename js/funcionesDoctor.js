//Doctor
function autoConsultarSpecialty(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.120.159:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-specialty");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            }); 
        }
    })
}

function consultarDoctor(){
    $.ajax({
        url:"http://129.151.120.159:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            imprimirRespuesta1(respuesta);
        }
    });
}

function imprimirRespuesta1(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].department+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].specialty.name+"</td>";
        myTable+="<td> <button onclick=' actualizarDoctor("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarDoctor("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";

    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarDoctor(){
    if ($("#Dname").val().length==0 || $("#Ddepartment").val().length==0 
    || $("#Dyear").val().length==0 || $("#Ddescription").val().length==0) {

        alert("Todos los campos son obligatorios");
    }
    else{
        let var2 = {
            name:$("#Dname").val(),
            department:$("#Ddepartment").val(),
            year:$("#Dyear").val(),
            description:$("#Ddescription").val(),
            specialty: {id:+$("#select-specialty").val()},
            };
            console.log(var2);
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            
            url:"http://129.151.120.159:8080/api/Doctor/save",
           
            
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

function actualizarDoctor(idElemento){
    if ($("#Dname").val().length==0 || $("#Ddepartment").val().length==0 
    || $("#Dyear").val().length==0 || $("#Ddescription").val().length==0) {

        alert("Todos los campos son obligatorios");
    }
    else{
        let myData={
            id:idElemento,
            name:$("#Dname").val(),
            department:$("#Ddepartment").val(),
            year:$("#Dyear").val(),
            description:$("#Ddescription").val(),
            specialty: {id:+$("#select-specialty").val()},
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.120.159:8080/api/Doctor/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado2").empty();
                $("#id").val("");
                $("#Dname").val("");
                $("#Ddepartment").val("");
                $("#Dyear").val("");
                $("#Ddescription").val("");
                $("#select-specialty").val("");
                consultarDoctor();
                alert("se ha Actualizado correctamente la información")
            }
        });
    }
}

function borrarDoctor(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.120.159:8080/api/Doctor/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            consultarDoctor();
            alert("Se ha Eliminado correctamente.")
        }
    });
}