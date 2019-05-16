const closePopUp = () => {
    document.getElementById("pop-up").style.display = 'none';
    return false;
}

const moreAds = () => {
    const el = document.getElementById(`section`);

    for(let i = 1; i <= 24; i++){
        let elChild = document.createElement('div');
        elChild.style.backgroundImage = `url('images/${i}.jpeg')`;
        elChild.style.backgroundSize = `cover`;
        elChild.classList.add('ad-review');
        elChild.onclick = () => {viewVehicle()};
        elChild.innerHTML = adDetail;
        el.appendChild(elChild);
    }

    if(document.getElementById('bsection')){
        document.getElementById('bsection').innerHTML = '';
    }
    if(document.getElementById('load-div')){
        document.getElementById('load-div').innerHTML = `<button id="load-more" class="button">Load More...</button>`;
    }
    if(document.getElementById('user-options')){
        document.getElementById('user-options').style.display = 'none';
    }

}

const viewVehicle = () => {
    document.getElementById('pop-up').style.display = 'block';
    document.getElementById('pop-up').innerHTML = viewImage;
    return false;
}

const memberArea = (requiredForm) => {
    let form;
    if (requiredForm === 'signup'){
        form = signUpForm;
    }else{
        form = signInForm;
    }
    document.getElementById('pop-up').style.display = 'block';
    document.getElementById('pop-up').innerHTML = form;
    return false;
}

const reverseSort = () => {
    sortCategory(1);
}

const sortCategory = (check) => {
    let base = document.getElementById('sort').value.split(",");
    let defaultOptions = `  
    <option disabled selected>Sort category by &nbsp;&nbsp;&nbsp;</option>
    <option value="new">New</option>
    <option value="used">Used</option>`;
    
    if(check === 1){
        if(typeof(base[base.length - 1]) === 'string'){
            document.getElementById('sort').innerHTML = defaultOptions;
                return false;
        }
       base.pop();
    }

    let newOptions = `<option value="${base}" disabled selected>All ${base.join(', ')} vehicles</option>`;

    if(base.length === 1){
        Object.values(sortObject).forEach(
            (value) => {
                newOptions = newOptions + `<option value="${base.join(',')},${value[0]}">${value[0]}</option>`;
            }
        )

        document.getElementById('sort').innerHTML = newOptions;
        return false;
    }
    
    if(base.length === 2){
        Object.keys(sortObject).forEach(
            (key) => {
                if(key === base[base.length - 1]){
                    newOptions = `<option value="${base}" disabled selected>All ${base.join(', ')} vehicles</option>`;
                    for(let i = 1; i < sortObject[key].length; i++){
                        newOptions = newOptions + `<option value="${base.join(',')},${sortObject[key][i]}" >${sortObject[key][i]}</option>`;
                    }   
                }
            }
        )

        document.getElementById('sort').innerHTML = newOptions;
        return false;
    }

    if(base.length > 2){
        document.getElementById('sort').innerHTML = defaultOptions;
        moreAds();
        //final level of selection
        return false;
    }
}

const sortObject = {
    BMX: ['BMX', 'Concept', 'M3', 'M5', 'X3', 'X5', 'Z4'],
    Ferrari: ['Ferrari', 'Daytona', '250 GTO', '275', '599 GTB Fiorano', 'F430', '250', 'F40', 'Enzo Ferrari', '456 GT', '612 Scaglietti', 'Califonia', '575M Maranello', 'Testarossa'],
    Ford: ['Ford', 'Ecosport', 'Fiesta', 'Flex', 'Focus', 'Galaxy'],
    Honda: ['Honda', 'Accord', 'Civic', 'CR-V', 'Fit', 'Hybrid'],
    Mercedes: ['Mercedes', 'A-Class', 'AMG-GT', 'C-Class', 'E-Class', 'S-Class'],
    Nissan: ['Nissan', 'Altima', 'Frontier', 'LEAF', 'Maxima', 'Murano'],
    Opel: ['Opel', 'Vauxhall Astra', 'Opel Corsa', 'Buick Regal', 'Vectra', 'Astra', 'Holden Barina', 'Cadillac Catera', 'Holden Astra', 'Manta', 'Agila', 'Ascona', 'Zafira'],
    Peugeot: ['Peugeot', 'Peugeot 206', 'Peugeot 1007', 'Peugeot 407', 'Peugeot 205']
};

//userpage
const showUserOptions = (close) => {
    if(document.getElementById('user-options').style.display === 'block'){
        document.getElementById('user-options').style.display = 'none';
        return false;
    };
       document.getElementById('user-options').style.display = 'block';
       return false;
}


const listMyAds = () => {
	document.getElementById('section').innerHTML = myAds;
	document.getElementById('bsection').innerHTML = '';
    document.getElementById('load-div').innerHTML = `<button id="load-more" class="button">Load More...</button>`;
    document.getElementById('controls').style.display = 'block';
	showUserOptions();
}

const toggleUserpage = (view) => {
    if(document.getElementById('section')){
        document.getElementById('section').innerHTML = '';
    }else{
        document.getElementById('admin-main-section').innerHTML = '';
    }
    document.getElementById('bsection').innerHTML = view;
    document.getElementById('load-div').innerHTML = '';
    showUserOptions();
    document.getElementById('controls').style.display = 'none';


    if(document.getElementById('make')){

    let makeOptions = `<option value="" disabled selected>Select the car make</option>`;
    Object.values(sortObject).forEach(
        (value) => {
            makeOptions = makeOptions + `<option value="${value[0]}">${value[0]}</option>`;
        }
    )
    document.getElementById('make').innerHTML = makeOptions;
    }
    return false
}



const modifyModelOptions = () => {
    let make = document.getElementById('make').value;

    Object.keys(sortObject).forEach(
        (key) => {
            if(key === make){
                modelOptions = `<option value="" disabled selected>Select the car model</option>`;
                for(let i = 1; i < sortObject[key].length; i++){
                    modelOptions = modelOptions + `<option value="${sortObject[key][i]}" >${sortObject[key][i]}</option>`;
                }   
            }
        }
    )
    document.getElementById('model').innerHTML = modelOptions;
    return false
}

const changeDataToModify = () => {
    let checker = document.getElementById('data-to-modify').value;

    if(checker === 'username'){
        document.getElementById('old-value').type = 'text';
        document.getElementById('old-value').placeholder = 'Enter Old Username'
        document.getElementById('old-value').disabled = false;

        document.getElementById('new-value').type = 'text';
        document.getElementById('new-value').placeholder = 'Enter New Username'
        document.getElementById('new-value').disabled = false;

        document.getElementById('confirm-value').type = 'text';
        document.getElementById('confirm-value').placeholder = 'Confirm New Username'
        document.getElementById('confirm-value').disabled = false;

        return false;
    }

    if(checker === 'email'){
        document.getElementById('old-value').type = 'email';
        document.getElementById('old-value').placeholder = 'Enter Old Email'
        document.getElementById('old-value').disabled = false;

        document.getElementById('new-value').type = 'email';
        document.getElementById('new-value').placeholder = 'Enter New Email'
        document.getElementById('new-value').disabled = false;

        document.getElementById('confirm-value').type = 'email';
        document.getElementById('confirm-value').placeholder = 'Confirm New Email'
        document.getElementById('confirm-value').disabled = false;

        return false;
    }

    if(checker === 'password'){
        document.getElementById('old-value').type = 'password';
        document.getElementById('old-value').placeholder = 'Enter Old Password'
        document.getElementById('old-value').disabled = false;

        document.getElementById('new-value').type = 'password';
        document.getElementById('new-value').placeholder = 'Enter New Password'
        document.getElementById('new-value').disabled = false;

        document.getElementById('confirm-value').type = 'password';
        document.getElementById('confirm-value').placeholder = 'Confirm New Password'
        document.getElementById('confirm-value').disabled = false;

        return false;
    }
}

const toggleMenuButtons = () => {
    let checkBoxes =  document.querySelectorAll('input[type=checkbox]:checked');
    if(checkBoxes.length > 0){
        if(checkBoxes.length === 1){
            if(document.querySelector('#sold-button')){
                document.querySelector('#sold-button').classList.remove('button-disabled');
                document.querySelector('#modify-button').classList.remove('button-disabled');
    
                document.querySelector('#sold-button').classList.add('button-enabled');
                document.querySelector('#sold-button').disabled = false;

                document.querySelector('#modify-button').classList.add('button-enabled');
                document.querySelector('#modify-button').disabled = false;
            }
        }else{
            if(document.querySelector('#sold-button')){
                document.querySelector('#sold-button').classList.add('button-disabled');
                document.querySelector('#sold-button').disabled = true;
                document.querySelector('#modify-button').classList.add('button-disabled');
                document.querySelector('#modify-button').disabled = true;
        
                document.querySelector('#sold-button').classList.remove('button-enabled');
                document.querySelector('#modify-button').classList.remove('button-enabled');
            }
        }
        
        document.querySelector('#delete-button').classList.remove('button-disabled');
        document.querySelector('#delete-button').classList.add('button-enabled');
        document.querySelector('#delete-button').disabled = false;


        return false
    }
    if(document.querySelector('#sold-button')){
        document.querySelector('#sold-button').classList.add('button-disabled');
        document.querySelector('#sold-button').disabled = true;
        document.querySelector('#modify-button').classList.add('button-disabled');
        document.querySelector('#modify-button').disabled = true;

        document.querySelector('#sold-button').classList.remove('button-enabled');
        document.querySelector('#modify-button').classList.remove('button-enabled');
    }
    document.querySelector('#delete-button').classList.add('button-disabled');
    document.querySelector('#delete-button').disabled = true;
    document.querySelector('#delete-button').classList.remove('button-enabled');
    return false;
};

const viewAdminListings = () => {
    document.getElementById('admin-main-section').innerHTML = adminView;
    document.getElementById('bsection').innerHTML = '';
    document.getElementById('load-div').innerHTML = `<button id="load-more" class="button">Load More...</button>`;
}
