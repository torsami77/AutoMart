const adDetail = `
<div>
    <div class="left">
        <p>New</br>
        <span>&#8358;1, 500. 00</span></br>
        Toyota Corolla 2016</br>
        Jos</p>
    </div>

    <div class="left">
        <p>1 hour ago</p>
    </div>
</div>`;

const myAds = `
<table>
<tr>
    <th>
        <p>Select</p>
    </th>
    <th>
        <p>Ad</p>
    </th>
    <th>
        <p>Description</p>
    </th>
    <th>
        <p>Bargains</p>
    </th>
    <th>
        <p>Stock</p>
    </th>
</tr>
<tr>
    <td><input type="checkbox" class="large-input" onclick="toggleMenuButtons();" /></td>
    <td>
        <div class="ad-review" style="background-image: url('images/1.jpeg'); background-size: cover;">
            <div>
                <div class="left">
                    <p>New</br>
                    <span>&#8358;1, 500. 00</span></br>
                    Toyota Corolla 2016</br>
                    Jos</p>
                </div>

                <div class="left">
                    <p>1 hour ago</p>
                </div>
            </div>
        </div>
    </td>
    <td>
        <p><span>Condition</span>: New</p>
        <p><span>Make</span>: Toyota</p>
        <p><span>Model</span>: Corolla</p>
        <p><span>Milleage</span>: 20000 Miles</p>
        <p><span>Condition</span>: New</p>
    </td>
    <td>
        <p><span>Iceman</span>: &#8358;2, 500. 00</p>
        <p><span>Wallace</span>: &#8358;1, 500. 00</p>
        <p><span>Robert</span>: &#8358;5, 500. 00</p>
        <p><span>Henry</span>: &#8358;8, 500. 00</p>
        <p><span>James</Base></span>: &#8358;1, 500. 00</p>
    </td>
    <td>
        <img src="images/sold.jpeg" />
    </td>
</tr>

<tr>
    <th>
        <p>Select</p>
    </th>
    <th>
        <p>Ad</p>
    </th>
    <th>
        <p>Description</p>
    </th>
    <th>
        <p>Bargains</p>
    </th>
    <th>
        <p>Stock</p>
    </th>
</tr>
<tr>
    <td><input type="checkbox" class="large-input" onclick="toggleMenuButtons();"/></td>
    <td>
        <div class="ad-review" style="background-image: url('images/1.jpeg'); background-size: cover;">
            <div>
                <div class="left">
                    <p>New</br>
                    <span>&#8358;1, 500. 00</span></br>
                    Toyota Corolla 2016</br>
                    Jos</p>
                </div>

                <div class="left">
                    <p>1 hour ago</p>
                </div>
            </div>
        </div>
    </td>
    <td>
        <p><span>Condition</span>: New</p>
        <p><span>Make</span>: Toyota</p>
        <p><span>Model</span>: Corolla</p>
        <p><span>Milleage</span>: 20000 Miles</p>
        <p><span>Condition</span>: New</p>
    </td>
    <td>
        <p><span>Iceman</span>: &#8358;2, 500. 00</p>
        <p><span>Wallace</span>: &#8358;1, 500. 00</p>
        <p><span>Robert</span>: &#8358;5, 500. 00</p>
        <p><span>Henry</span>: &#8358;8, 500. 00</p>
        <p><span>James</Base></span>: &#8358;1, 500. 00</p>
    </td>
    <td>
        <h1>Available</h1>
    </td>
</tr>

<tr>
    <th>
        <p>Select</p>
    </th>
    <th>
        <p>Ad</p>
    </th>
    <th>
        <p>Description</p>
    </th>
    <th>
        <p>Bargains</p>
    </th>
    <th>
        <p>Stock</p>
    </th>
</tr>
<tr>
    <td><input type="checkbox" class="large-input" onclick="toggleMenuButtons();"/></td>
    <td>
        <div class="ad-review" style="background-image: url('images/1.jpeg'); background-size: cover;">
            <div>
                <div class="left">
                    <p>New</br>
                    <span>&#8358;1, 500. 00</span></br>
                    Toyota Corolla 2016</br>
                    Jos</p>
                </div>

                <div class="left">
                    <p>1 hour ago</p>
                </div>
            </div>
        </div>
    </td>
    <td>
        <p><span>Condition</span>: New</p>
        <p><span>Make</span>: Toyota</p>
        <p><span>Model</span>: Corolla</p>
        <p><span>Milleage</span>: 20000 Miles</p>
        <p><span>Condition</span>: New</p>
    </td>
    <td>
        <p><span>Iceman</span>: &#8358;2, 500. 00</p>
        <p><span>Wallace</span>: &#8358;1, 500. 00</p>
        <p><span>Robert</span>: &#8358;5, 500. 00</p>
        <p><span>Henry</span>: &#8358;8, 500. 00</p>
        <p><span>James</Base></span>: &#8358;1, 500. 00</p>
    </td>
    <td>
        <h1>Available</h1>
    </td>
</tr>

</table>
`;

const viewImage = `
    <div id="asection" class="asection">
        <div class="close-two" onclick="closePopUp();">
            x
        </div>
            <fieldset>
                <div class="detail">
                    <p>New</br>
                    <span>&#8358;1, 500. 00</span></br>
                    Toyota Corolla 2016</br>
                    Jos</p>
                </div>

                <div class="left">
                    <div>
                        <p id="info"></p>
                        <p><input type="number" name="client-price" id="client-price" placeholder="Enter your bargain price" autofocus/></p>
                        <button class="button"><i class="material-icons">add_shopping_cart</i> Place order</button>
                    </div>
                    <div>
                        <button class="button"><i class="material-icons red-icon">flag</i>Report</button>
                    </div>
                </div>

                <div id="view-image" class="view-image">
                    <img src="./images/10.jpeg"/>
                </div>

                <div class="gallery">
                    <img src="./images/10.jpeg"/>
                    <img src="./images/10.jpeg"/>
                    <img src="./images/10.jpeg"/>
                    <img src="./images/10.jpeg"/>
                </div>
            </fieldset>

    </div>
</div>
`;


const signInForm = `
<div id="asection" class="asection-min">
    <div class="close" onclick="closePopUp();">
        x
    </div>
        <fieldset>
            <div id="memberForm">
                <legend><h2>Sign in</h2></legend>
                <div id="info">
                </div>
                <p>Don't have an account? 
                <span class="link" onclick="memberForm('signup')">Sign up here</span>
                </p>
                <div>
                    <form>
                        <p><i class="material-icons">email</i><input type="email" name="email" id="email" class="input-field" placeholder="Enter your email" autofocus required /></p>
                        <p><i class="material-icons">lock</i><input type="password" name="password" id="password" class="input-field" placeholder="Create a password" required/></p>
                        <p><button type="submit" id="login" onclick="signIn();" class="button-enabled">Sign In</button></p>
                        <p class="link">Forgot password? Click here</p>
                    </form>
                </div>
            </div> 
        </fieldset>
</div>
`;

const signUpForm = `
<div id="asection" class="asection-min">
    <div class="close" onclick="closePopUp();">
        x
    </div>
        <fieldset>
            <div id="memberForm">
            <legend><h2>Sign Up</h2></legend>
                <div id="info">
                </div>
                <p>Already own an account? 
                    <span class="link" onclick="memberForm('signin');">Sign in here</span>
                </p>
                <div>
                    <form>
                        <p><i class="material-icons">email</i><input type="email" name="email" id="email" class="input-field" placeholder="Provide your email" autofocus required/></p>
                        <p><i class="material-icons">person</i><input type="text" name="username" id="username" class="input-field" placeholder="Create a username" autofocus required /></p>
                        <p><i class="material-icons">lock</i><input type="password" name="password" id="password" class="input-field" placeholder="Create a password" required/></p>
                        <p><i class="material-icons">lock</i><input type="password" name="verify" id="verify" class="input-field" placeholder="Verify your password" required/></p>
                        <p><button type="submit" id="login" onclick="signIn();" class="button-enabled">Sign Up</button></p>
                        <p class="link">Forgot password? Click here</p>
                    </form>
                </div>
            </div>  
        </fieldset>
</div>`;

const createNewAdForm = `
<div id="asection">
    <fieldset>
        <div id="memberForm">
            <legend><h2>Add a new ad</h2></legend>
            <div id="info">
                <form class="text-align-left">
                    <p>
                        <label for="make">Car Make:</label></br>
                        <select id="make" name="make" onchange="modifyModelOptions();">
                        </select>
                    </p>
                    <p>
                        <label for="model">Car Model:</label></br>
                        <select id="model" name="model">
                        </select>
                    </p>
                    <p>
                        <label for="year">Year:</label></br>
                        <input type="number" id="model-year" placeholder="Enter Model Year"/>
                    </p>
                    <p>
                        <label for="mileage">Mileage:</label></br>
                        <input type="number" name="mileage" id="mileage" placeholder="Enter Mileage On Car"/>Miles
                    </p>
                    <p>
                        <label for="condition">Condition:</label></br>
                        <select name="condition" id="condition">
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                    </p>
                    <p>
                        <label for="transmission">Transmission:</label></br>
                        <select name="transmission" id="transmission">
                            <option value="new">Auto</option>
                            <option value="used">Manual</option>
                        </select>
                    </p>
                    <p>
                        <label for="vin">Vehicle Inspection Number:</label></br>
                        <input type="text" name="vin" id="vin" placeholder="Enter VIN"/>
                    </p>
                    <p>
                        <label for="license">License Plate:</label></br>
                        <input type="text" name="license" id="license" placeholder="Enter License Plate Number"/>
                    </p>
                    <p>
                        <label for="owner">Owner's Full Name:</label></br>
                        <input type="text" name="owner" id="owner" placeholder="Enter Owner's FullName"/>
                    </p>
                    <p>
                        <label for="description">Car Description:</label></br>
                        <textarea name="description" id="description"></textarea>
                    </p>
                    <p>
                        <label for="price">Price:</label></br>
                        <input type="number" name="price" id="price" placeholder="Set Your Price"/>Naira
                    </p>
                    <p>
                        <label for="image1">Upload 1st image:</label></br>
                        <input type="file" name="image1" accept="image/*">
                    </p>
                    <p>
                        <label for="image2">Upload 2nd image:</label></br>
                        <input type="file" name="image2" accept="image/*">
                    </p>
                    <p>
                        <label for="image3">Upload 3rd image:</label></br>
                        <input type="file" name="image3" accept="image/*">
                    </p>
                    <p>
                        <label for="image4">Upload 4th image:</label></br>
                        <input type="file" name="image4" accept="image/*"><br/>
                    </p>
                </form>
                <p><button type="submit" id="login" onclick="AddNewAd()" class="button-enabled">Add New Ad</button></p>
            </div>
        </div> 
    </fieldset>
</div>
`;

const accountSettingsForm = `
<div id="asection">
    <fieldset>
        <div id="memberForm">
            <legend><h2>Account Settings</h2></legend>
            <div id="info">
            </div>

            
                <div>
                    <fieldset>
                        <legend>Modify Profile Pic</legend>
                            <img src="images/no-profile-image.jpeg" class="avater" />
                            <input type="file" name="profile-pic" accept="image/*">
                            <p>
                                <button type="submit" name="modify-pic" id="modify-pic" class="button-enabled">Modify</button>
                            </p>
                    </fieldset>
                    <br/>
                    <fieldset>
                        <legend>Modify Username, Email or Password</legend>
                            <p>
                                <select id="data-to-modify" onchange="changeDataToModify();">
                                    <option disabled selected>Select data to modify</option>
                                    <option value="username">Username</option>
                                    <option value="email">Email</option>
                                    <option value="password">Password</option>
                                </select>
                            </p>

                            <p>
                                <form>
                                    <p><input id="old-value" name="old-value" disabled/></p>
                                    <input id="new-value" name="new-value" disabled/>
                                    <input id="confirm-value" name="confirm-value" disabled/>
                            </p>

                            <p>
                                <button type="submit" name="modify-pic" id="modify-pic" class="button-enabled">Modify</button>
                                </form>
                            </p>
                    </fieldset>

                   
                </div>
            </div>
        </div> 
    </fieldset>
</div>
`;

const adminView = `
<table>
    <tr>
        <th>
            <p>Select</p>
        </th>
        <th>
            <p>Ad</p>
        </th>
        <th>
            <p>Description</p>
        </th>
        <th>
            <p>Bargains</p>
        </th>
        <th>
            <p>Stock</p>
        </th>
        <th>
            <p>Report</p>
        </th>
    </tr>
    <tr>
        <td><input type="checkbox" class="large-input" onclick="toggleMenuButtons();"/></td>
        <td>
            <!-- REMOVE INLINE IMAGE BACKGROUND STYLING UPON INTEGRATION OF FETCH -->
            <div class="ad-review" style="background-image: url('images/1.jpeg'); background-size: cover;">
                <div>
                    <div class="left">
                        <p>New</br>
                        <span>&#8358;1, 500. 00</span></br>
                        Toyota Corolla 2016</br>
                        Jos</p>
                    </div>
    
                    <div class="left">
                        <p>1 hour ago</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <p><span>Condition</span>: New</p>
            <p><span>Make</span>: Toyota</p>
            <p><span>Model</span>: Corolla</p>
            <p><span>Milleage</span>: 20000 Miles</p>
            <p><span>Condition</span>: New</p>
        </td>
        <td>
            <p><span>Iceman</span>: &#8358;2, 500. 00</p>
            <p><span>Wallace</span>: &#8358;1, 500. 00</p>
            <p><span>Robert</span>: &#8358;5, 500. 00</p>
            <p><span>Henry</span>: &#8358;8, 500. 00</p>
            <p><span>James</Base></span>: &#8358;1, 500. 00</p>
        </td>
        <td>
            <img src="images/sold.jpeg" class="status-image"/>
        </td>
        <td>
            <img src="images/red-flag.png" class="status-image"/>
        </td>
    </tr>
    <tr>
        <th>
            <p>Select</p>
        </th>
        <th>
            <p>Ad</p>
        </th>
        <th>
            <p>Description</p>
        </th>
        <th>
            <p>Bargains</p>
        </th>
        <th>
            <p>Stock</p>
        </th>
        <th>
            <p>Report</p>
        </th>
    </tr>
    <tr>
        <td><input type="checkbox" class="large-input" onclick="toggleMenuButtons();"/></td>
        <td>
            <!-- REMOVE INLINE IMAGE BACKGROUND STYLING UPON INTEGRATION OF FETCH -->
            <div class="ad-review" style="background-image: url('images/1.jpeg'); background-size: cover;">
                <div>
                    <div class="left">
                        <p>New</br>
                        <span>&#8358;1, 500. 00</span></br>
                        Toyota Corolla 2016</br>
                        Jos</p>
                    </div>
    
                    <div class="left">
                        <p>1 hour ago</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <p><span>Condition</span>: New</p>
            <p><span>Make</span>: Toyota</p>
            <p><span>Model</span>: Corolla</p>
            <p><span>Milleage</span>: 20000 Miles</p>
            <p><span>Condition</span>: New</p>
        </td>
        <td>
            <p><span>Iceman</span>: &#8358;2, 500. 00</p>
            <p><span>Wallace</span>: &#8358;1, 500. 00</p>
            <p><span>Robert</span>: &#8358;5, 500. 00</p>
            <p><span>Henry</span>: &#8358;8, 500. 00</p>
            <p><span>James</Base></span>: &#8358;1, 500. 00</p>
        </td>
        <td>
            <img src="images/sold.jpeg" class="status-image"/>
        </td>
        <td>
            <img src="images/red-flag.png" class="status-image"/>
        </td>
    </tr>
    
</table>
`;

