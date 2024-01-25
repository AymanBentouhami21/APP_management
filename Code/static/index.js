document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");
    
    var button_insert = document.getElementById('button_insert');
    var button_edit = document.getElementById('button_edit');
    var button_search = document.getElementById('button_search');
    
    function reparationInsertForum() {
        var insertion_div = document.querySelector(".div_insert");
        insertion_div.innerHTML = '';

        var heading1 = document.createElement("h1");
        heading1.innerText = 'Inserer un Ordre de Reparation';

        var input_div1 = document.createElement('div');
        var input_div2 = document.createElement('div');
        var input_div3 = document.createElement('div');

        var input_label1 = document.createElement('label');
        var input1 = document.createElement('input');
        input_label1.innerText = "diagnosticPanne:";
        input1.type = 'text';

        var input_label2 = document.createElement('label');
        var input2 = document.createElement('input');
        input_label2.innerText = "NBHeuresMO:";
        input2.type = 'text';

        var input_label3 = document.createElement('label');
        var input3 = document.createElement('input');
        input_label3.innerText = "IDOrdre:";
        input3.type = 'text';

        var error_label = document.createElement('label');

        var submit = document.createElement('button');
        submit.innerText = "Submit";

        input_div1.appendChild(input_label1);
        input_div1.appendChild(input1);

        input_div2.appendChild(input_label2);
        input_div2.appendChild(input2);

        input_div3.appendChild(input_label3);
        input_div3.appendChild(input3);

        insertion_div.appendChild(heading1);
        insertion_div.appendChild(input_div1);
        insertion_div.appendChild(input_div2);
        insertion_div.appendChild(input_div3);
        insertion_div.appendChild(submit);
        insertion_div.appendChild(error_label);

        heading1.style.marginBottom = '20px'; 
        input_div1.style.marginBottom = '10px'; 
        input_div2.style.marginBottom = '10px'; 

        submit.addEventListener("click", function(){
            var diagnosticPanneValue = input1.value;
            var NBHeuresMOValue = input2.value;
            var IDOrdre = input3.value;

            dataToSend = {
                diagnosticPanne: diagnosticPanneValue,
                NBHeuresMOValue: NBHeuresMOValue,
                IDOrdre: IDOrdre
            };

            fetch('/insertOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            .then(response => response.text())
            .then(data => {
                console.log('Response from Flask:', data);
                error_label.innerText = data;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    function rechercherForum(){
        var insertion_div = document.querySelector(".div_insert");
        var display_div = document.querySelector(".div_display")
        insertion_div.innerHTML = '';

        var heading1 = document.createElement("h1");
        heading1.innerText = "Rechercher Par:";

        var input_dropdown = document.createElement('input');
        input_dropdown.setAttribute('list', 'optionsList');
        input_dropdown.placeholder = 'Select an option';

        var datalist = document.createElement('datalist');
        datalist.id = 'optionsList';

        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');

        

        var inputText1 = document.createElement('input')
        inputText1.type = 'text'
        

        var submit = document.createElement('button')
        submit.innerText = 'Submit'

        option1.innerText = 'client par nom';
        option2.innerText = 'piece par PUHT';
        option3.innerText = 'Ordre de reparation sans piece a changer';

        option1.value = 'client';
        option2.value = 'piece';
        option3.value = 'ordre';

        datalist.appendChild(option1);
        datalist.appendChild(option2);
        datalist.appendChild(option3);

        insertion_div.appendChild(heading1);
        insertion_div.appendChild(input_dropdown);
        insertion_div.appendChild(datalist);

        insertion_div.appendChild(inputText1)
        insertion_div.appendChild(submit)


        input_dropdown.addEventListener("change", function(){

            inputText1.placeholder = "Inserer nom de client"
            var selected_value = input_dropdown.value
            var url = ''
            if (selected_value === 'client'){
                inputText1.placeholder = "Inser Nom de Client"
            }
            else if (selected_value === 'ordre'){
                inputText1.placeholder = "Inser le prix des pieces"
            }
            else if (selected_value === 'piece'){
                inputText1.placeholder = "Inser nobre de piece pour ordre de reparation"
            }
            else{

            }
            submit.addEventListener("click",function(){
                if (selected_value === 'client'){
                    url = `/chercherClient?Nom=${inputText1.value}`
                    console.log(inputText1.value)
                }
                else if (selected_value === 'ordre'){
                    url = `/chercherOrdreDeReparation?quantity=${inputText1.value}`
                }
                else if (selected_value === 'piece'){
                    url = `/chercherPieces?PUHT=${inputText1.value}`
                }
                else{
    
                }
                if(selected_value ==='client'){
                    
                }
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from Flask:', data);
                    var table = document.createElement('table');

                    // Create table headers
                    var thead = document.createElement('thead');
                    var headerRow = thead.insertRow();
                    Object.keys(data[0]).forEach(key => {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(key));
                        headerRow.appendChild(th);
                    });
                    table.appendChild(thead);
                
                    // Create table body
                    var tbody = document.createElement('tbody');
                    data.forEach(client => {
                        var row = tbody.insertRow();
                
                        // Populate cells with data
                        Object.values(client).forEach(value => {
                            var cell = row.insertCell();
                            cell.appendChild(document.createTextNode(value));
                        });
                    });
                    table.appendChild(tbody);

                    display_div.innerHTML = ''
                    display_div.appendChild(table)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })    
        })
    }

    button_search.addEventListener("click",function(){
        rechercherForum();
    });

    button_insert.addEventListener("click",function(){
        reparationInsertForum();
    });

    reparationInsertForum();
});
