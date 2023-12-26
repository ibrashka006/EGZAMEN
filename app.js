const input = document.querySelectorAll('input');
const Koshu = document.querySelector('button');
const soz = document.querySelector('.soz');

let Slovar =  []

function deleteList(lan) {
    Slovar = Slovar.filter(res => res.english != lan)
    
    const Slovarli = JSON.stringify(Slovar);
    localStorage.setItem('todos', Slovarli);
    ShowTodo(Slovar)
}


Koshu.onclick=()=>{
    const englishWord = input[0].value.trim();
    const kyrgyzWord = input[1].value.trim();
    if (englishWord||kyrgyzWord) {
        const Lang = {english: englishWord, kyrgyz:kyrgyzWord};
        Slovar.push(Lang);
        const Slovarli = JSON.stringify(Slovar);
        localStorage.setItem('todos', Slovarli)
        ShowTodo(Slovar);
        input[0].value = '';
        input[1].value = '';
    }
}
function editbtn(lan){
    const wordEdit = Slovar.find(res =>res.english === lan);
    if (wordEdit) {
        input[0].value = wordEdit.english;
        input[1].value = wordEdit.english;
        Slovar=Slovar.filter(res => res.english !== lan);
        ShowTodo(Slovar)
        const Slovarli = JSON.stringify(Slovar);
       localStorage.setItem('todos', Slovarli)
    }
}
const getTodos = JSON.parse(localStorage.getItem('todos')) ;
ShowTodo(getTodos);
function ShowTodo(array){
    soz.innerHTML='';
    array.forEach(res => {
        soz.innerHTML += `
        <div class='Block-1'>
         <div class='country'>
          <div class='lungenglish'>
           <h3>English</h3>
            <p>${res.english}</p>
             </div>
              <div class='lungkyrgyz'>
                <h3>Кыргызчасы</h3>
                  <p>${res.kyrgyz}</p>
                   </div>
                    </div>
                     <div class='btns-block'>
                      <button class="DeleteBtn" onclick="deleteList('${res.english}')">Delete</button> 
                       <button class='EditBtn' onclick="editbtn('${res.english}')">Edit</button>
                        </div>
                         </div>`;
    });
}