document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");

    function reparationInsertForum() {
        var insertion_div = document.querySelector(".div_insert");
        insertion_div.innerHTML = '';

        var heading1 = document.createElement("h1");
        heading1.innerText = 'Inserer un Ordre de Reparation';

        var input_div1 = document.createElement('div')

        var input_label1 = document.createElement('label')
        var input1 = document.createElement('input')
        input_label1.innerText = "diagnosticPanne"
        input1.type = 'text'



        input_div1.appendChild(input_label1)
        input_div1.appendChild(input1)
        insertion_div.appendChild(heading1)
        insertion_div.appendChild(input_div1)
    }



    reparationInsertForum();

});