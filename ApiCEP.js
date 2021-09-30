function buscaCep(url,body){
    let request = new XMLHttpRequest()
    let result  = ""
    request.open("POST", url,true)
    request.setRequestHeader("Content-type","application/json")
    request.send(JSON.stringify(body))
    request.onload = function(){
        result = JSON.parse(this.responseText)
        if(request ==null||request ==""){
            montaHtmlNulo(result)
        }else{
            if(request.status== 200){
                montaHtmlSucesso(result);    
            }else{
                montaHtmlErro(result)
            }
        }

    return request.responseText
   }
}
   function enviarCep(){
       let url ="https://apicep01.herokuapp.com/cep"
       let cep = document.getElementById("cep").value
       body = {
           "cep": cep
       } 
       buscaCep(url,body)  
   }
   function montaHtmlSucesso(result){
       if(result.cep === undefined){
        let html = "<h2> Resultado não encontrado:  </h2>";
        html += "<h3><span style= 'fontWeight:bold'><b>Erro! Cep encontrado</b></span></h3>"
        document.getElementById('resultado').innerHTML = html; 
       }else{
            let html = "<h2> Resultado encontrado:  </h2>";
            html += "<ul>";
            html += "<li><span style= 'fontWeight:bold'><b>CEP:</b></span> " + result.cep + "</li>"
            html += "<li><span style= 'fontWeight:bold'><b>Logradouro:</b></span> " + result.logradouro + "</li>"
            html += "<li><span style= 'fontWeight:bold'><b>Localidade:</b></span> " + result.localidade + "</li>"
            html += "<li><span style= 'fontWeight:bold'><b>Bairro:</b></span> " + result.bairro + "</li>"
         document.getElementById('resultado').innerHTML = html; 
       }
        
       
    }

    function montaHtmlErro(result){
        let html = "<h2> Resultado não encontrado: </h2>";
        html += "<ul>";
        html += "<li><span style= 'fontWeight:bold'><b></b></span> " + result.mensagem + "</li>"
        document.getElementById('resultado').innerHTML = html; 

    }

   window.onload = function(){
       document.getElementById('frmCep').addEventListener('submit', function(event){
           event.preventDefault();
           enviarCep();
       });
   }