document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");

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

        var error_label = document.createElement('label')



        var submit = document.createElement('button')
        submit.innerText = "Submit"

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
        insertion_div.appendChild(submit)
        insertion_div.appendChild(error_label)

        
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
            }

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
                // Handle the response as needed
                error_label.innerText = data
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    reparationInsertForum();
});
