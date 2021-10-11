const afazeresArray = JSON.parse(localStorage.getItem('lista')) || [];
 
const afazeresForm =document.querySelector('#afazeresForm');

const alertmensagem = document.querySelector('.alert');

const listaContent = document.querySelector(".content");

const confirmar = document.querySelector('.confirmar');
let idSelecionado ;
////////////////////////////////////////////////////////////////

function listaTarefas(limpaTarefas = false){
     

    if(limpaTarefas){
        listaContent.innerHTML = "";
    }

    if(afazeresArray.length > 0){

    let indice = 0; 

     afazeresArray.forEach((lista) => {

        if(lista.realizado=="Não"){
     listaContent.innerHTML = listaContent.innerHTML +  ` <div class= "caixa">
                                                            <input type="checkbox" class="check" id=${indice}>
                                                            <div>${lista.tarefa}</div> 
                                                            <div class="deletar" id=${indice}>X</div>     
                                                            </div>  `;
        }else{
            
            listaContent.innerHTML = listaContent.innerHTML +  ` <div class= "caixa">
        <input type="checkbox" class="check" id=${indice} checked>
        <div class="riscado">${lista.tarefa}</div> 
        <div class="deletar" id=${indice}>X</div>     
        </div>  `;

        }

     indice++;
        })

    }else{
        listaContent.innerHTML = "<center>Não há tarefa cadastrada</center>";
        
    }
}
/////////////////////////////////////////////////////////////////

afazeresForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
let lista = {};
    lista.tarefa = document.getElementById("tarefa").value;
    lista.realizado= "Não"; 
    
    if(lista.tarefa === "") {

        alertmensagem.innerHTML= 'Cadastre Uma Tarefa por gentileza.';
        alertmensagem.style = 'display: block; color: red';
        
    } else {

          afazeresArray.push(lista);
          localStorage.setItem('lista', JSON.stringify(afazeresArray));
          listaTarefas(true);
          setTimeout(() => {
              alertmensagem.innerHTML = '';
              alertmensagem.style = 'display: none';
              afazeresForm.reset();

          }, 100)
    
        }
});
//////////////////////////////////////////////////////////////////////////
listaContent.addEventListener('click',(clicado) =>{
    /*alert(clicado.target.id);*/
if(clicado.target.className=="check"){
    afazeresArray[clicado.target.id].realizado = "sim";
    localStorage.setItem('lista', JSON.stringify(afazeresArray));
    listaTarefas(true);
    }
});

listaContent.addEventListener('click',(clicado) =>{
    /*alert(clicado.target.id);*/
if(clicado.target.className=="deletar"){
  idSelecionado=clicado.target.id;
   confirmar.style.display = "block"; 
 }
});

function sim (){
    afazeresArray.splice(idSelecionado,1);
    localStorage.setItem('lista', JSON.stringify(afazeresArray));
    confirmar.style.display = "none";
    listaTarefas(true);
};
function nao (){
 confirmar.style.display = "none";
};
window.onload =  listaTarefas(); 
