function buscaCep(url,body){
    let request = new XMLHttpRequest()
    let result  = ""
    request.open("POST", url,true)
    request.setRequestHeader("Content-type","application/json")
    request.send(JSON.stringify(body))
    request.onload = function(){
        console.log(this.responseText)
       result = JSON.parse(this.responseText)
       if(request.status== 200){
        montaHtmlSucesso(result);    
    }else{
        montaHtmlErro(result)
    }
       }
    return request.responseText
   }
    //https://apicep01.herokuapp.com/cep
   function enviarCep(){
       let url ="https://api-do-cep.herokuapp.com/cep"
       let cep = document.getElementById("cep").value
       body = {
           "cep": cep
       } 
       buscaCep(url,body)  
   }
   function montaHtmlSucesso(result){
       let html = "<h2> Resultado encontrado:  </h2>";
        html += "<ul>";
        html += "<li><span style= 'fontWeight:bold'><strong>CEP:</strong></span> " + result.cep + "</li>"
        html += "<li><span style= 'fontWeight:bold'><strong>Logradouro:</strong></span> " + result.logradouro + "</li>"
        html += "<li><span style= 'fontWeight:bold'><strong>Localidade:</strong></span> " + result.localidade + "</li>"
        html += "<li><span style= 'fontWeight:bold'><strong> Bairro: </strong></span> " + result.bairro + "</li>"
        document.getElementById('resultado').innerHTML = html;
    }

    function montaHtmlErro(result){
        let html = "<h2> Resultado não encontrado:  </h2>";
        html += "<ul>";
        html += "<h3><span style= 'fontWeight:bold'>Erro Cep invalido</span></h3>"
        document.getElementById('resultado').innerHTML = html; 
        alert("Formato de CEP inválido.");
    }

   window.onload = function(){
       document.getElementById('frmCep').addEventListener('submit', function(event){
           event.preventDefault();
           enviarCep();
       });
   }