const closePopUp = () => {
    document.getElementById("pop-up").style.display = 'none';
    return false;
}

const moreAds = () => {
    const el = document.getElementById(`section`);

    for(let i = 1; i <= 24; i++){
        let elChild = document.createElement('div');
        elChild.style.backgroundImage = `url('https://res.cloudinary.com/torsami77/image/upload/v1560036448/wdh0nscln5q0mviep0jw.jpg')`;
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
    let form = signInForm;
    if(requiredForm === 'forgotPassword'){
        form = forgotPasswordForm ;
    }
    if (requiredForm === 'signup'){
        form = signUpForm;
    }
   // document.getElementById('pop-up').style.display = 'block';
    document.getElementById('section').innerHTML = form;
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
                let valueToUse = value[0];
                if(valueToUse === 'Sort by Body Type'){
                    valueToUse = 'BodyType';
                }
                if(valueToUse === 'Sort by Price Range'){
                    valueToUse = 'PriceRange';
                }
                newOptions = newOptions + `<option value="${base.join(',')},${valueToUse}">${value[0]}</option>`;
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
                    if(base.join(',') === 'new,BodyType' || base.join(',') === 'used,BodyType') {
                        newOptions = `<option value="${base}" disabled selected>Select Body Type</option>`;
                    }
                    if(base.join(',') === 'new,PriceRange' || base.join(',') === 'used,PriceRange') {
                        newOptions = `<option value="${base}" disabled selected>Select Price Range</option>`;
                    }
                    for(let i = 1; i < sortObject[key].length; i++){
                        newOptions = newOptions + `<option value="${base.join(', ')},${sortObject[key][i]}" >${sortObject[key][i]}</option>`;
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
    PriceRange: ['Sort by Price Range', '5, 000, 000', '4, 000, 000', '3, 000, 000', '2, 000, 000', '1, 000, 000', '500, 000'],
    BodyType: ['Sort by Body Type', 'Car', 'Truck', 'Trailer', 'Van'],
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
document.addEventListener("click", (event) => {
	if (event.target.closest("#right-pane")) return;
    document.getElementById('user-options').style.display = 'none';
});


const showUserOptions = (close) => {
    if(document.getElementById('user-options').style.display === 'block'){
        document.getElementById('user-options').style.display = 'none';
        userOptionInt = 0
        return false;
    };
       document.getElementById('user-options').style.display = 'block';
       userOptionInt = 1
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
    let skipVehicleMake = 1;
    Object.values(sortObject).forEach(
        (value) => {
            if(skipVehicleMake !== 1){
                makeOptions = makeOptions + `<option value="${value[0]}">${value[0]}</option>`;
            }
            skipVehicleMake ++ ;
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
        document.getElementById('old-v-icon').innerHTML = 'person';

        document.getElementById('new-value').type = 'text';
        document.getElementById('new-value').placeholder = 'Enter New Username'
        document.getElementById('new-value').disabled = false;
        document.getElementById('new-v-icon').innerHTML = 'person';

        document.getElementById('confirm-value').type = 'text';
        document.getElementById('confirm-value').placeholder = 'Confirm New Username'
        document.getElementById('confirm-value').disabled = false;
        document.getElementById('confirm-v-icon').innerHTML = 'person';

        return false;
    }

    if(checker === 'email'){
        document.getElementById('old-value').type = 'email';
        document.getElementById('old-value').placeholder = 'Enter Old Email'
        document.getElementById('old-value').disabled = false;
        document.getElementById('old-v-icon').innerHTML = 'email';


        document.getElementById('new-value').type = 'email';
        document.getElementById('new-value').placeholder = 'Enter New Email'
        document.getElementById('new-value').disabled = false;
        document.getElementById('new-v-icon').innerHTML = 'email';


        document.getElementById('confirm-value').type = 'email';
        document.getElementById('confirm-value').placeholder = 'Confirm New Email'
        document.getElementById('confirm-value').disabled = false;
        document.getElementById('confirm-v-icon').innerHTML = 'email';


        return false;
    }

    if(checker === 'password'){
        document.getElementById('old-value').type = 'password';
        document.getElementById('old-value').placeholder = 'Enter Old Password'
        document.getElementById('old-value').disabled = false;
        document.getElementById('old-v-icon').innerHTML = 'lock';


        document.getElementById('new-value').type = 'password';
        document.getElementById('new-value').placeholder = 'Enter New Password'
        document.getElementById('new-value').disabled = false;
        document.getElementById('new-v-icon').innerHTML = 'lock';


        document.getElementById('confirm-value').type = 'password';
        document.getElementById('confirm-value').placeholder = 'Confirm New Password'
        document.getElementById('confirm-value').disabled = false;
        document.getElementById('confirm-v-icon').innerHTML = 'lock';


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
