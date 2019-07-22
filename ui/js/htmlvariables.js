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
        <div class="ad-review" style="background-image: url('https://res.cloudinary.com/torsami77/image/upload/v1560088728/jt97ipjlo34avx8qeedf.jpg'); background-size: cover;">
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
        <img src="https://res.cloudinary.com/torsami77/image/upload/v1560170479/sold_lhhjz5.jpg" />
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
        <div class="ad-review" style="background-image: url('https://res.cloudinary.com/torsami77/image/upload/v1560088728/jt97ipjlo34avx8qeedf.jpg'); background-size: cover;">
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
        <div class="ad-review" style="background-image: url('https://res.cloudinary.com/torsami77/image/upload/v1560088728/jt97ipjlo34avx8qeedf.jpg'); background-size: cover;">
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
                        <p>
                            <input type="number" name="amount" id="amount" placeholder="Enter your bargain price" autofocus/></br>
                            <span id="purchase-info"></span>
                        </p>
                        <div id="order-button">
                            <button class="button" onclick="placeOrder({data.data.id});">
                                <i class="material-icons">add_shopping_cart</i> Place order
                            </button>
                        </div>
                    </div>
                    <div id="flag-area">
                        <button class="button" onclick="showFlagArea();>
                            <i class="material-icons red-icon">flag</i>Report
                        </button>
                    </div>
                </div>

                <div id="view-image" class="view-image">
                    <img src="https://res.cloudinary.com/torsami77/image/upload/v1560036448/wdh0nscln5q0mviep0jw.jpg"/>
                </div>

                <div class="gallery">
                    <img src="https://res.cloudinary.com/torsami77/image/upload/v1560036448/wdh0nscln5q0mviep0jw.jpg"/>
                    <img src="https://res.cloudinary.com/torsami77/image/upload/v1560036448/wdh0nscln5q0mviep0jw.jpg"/>
                    <img src="https://res.cloudinary.com/torsami77/image/upload/v1560036448/wdh0nscln5q0mviep0jw.jpg"/>
                    <img src="https://res.cloudinary.com/torsami77/image/upload/v1560036448/wdh0nscln5q0mviep0jw.jpg"/>
                </div>
            </fieldset>

    </div>
</div>
`;


const signInForm = `
<div id="asection" class="asection-min">
        <fieldset>
            <div id="memberForm">
                <legend><h2>Sign in</h2></legend>
                <p>Don't have an account? 
                <span class="link" onclick="memberArea('signup')">Sign up here</span>
                </p>
                <div id="signin-info"></div>
                <div>
                        <p><i class="material-icons">email</i><input type="email" name="email" id="email" class="input-field" placeholder="Enter your email" autofocus required /></p>
                        <p><i class="material-icons">lock</i><input type="password" name="password" id="password" class="input-field" placeholder="Create a password" required/></p>
                        <p><button type="submit" id="signIn" onclick="signIn();" class="button-enabled">Sign In</button></p>
                        <p class="link" onclick="memberArea('forgotPassword');">Forgot password? Click here</p>
                </div>
            </div> 
        </fieldset>
</div>
`;

const forgotPasswordForm = `
<div id="asection" class="asection-min">
        <fieldset>
            <div id="memberForm">
                <legend><h2>Forgotten Password!</h2></legend>
                <div id="info-passResetReq" class="false">
                </div>
                <div>
                    <p>
                        <i class="material-icons">email</i><input type="email" name="email" id="email" class="input-field" placeholder="Enter your email" autofocus required/></br>
                        <span id="info-passResetReq"></span>
                    </p>
                    <p><button type="submit" id="recover-Password" onclick="sendPasswordLink();" class="button-enabled">Email me password reset link</button></p>
                    <p>Don't have an account? 
                        <span class="link" onclick="memberArea('signup')">Sign up here</span>
                    </p>
                    <p>Still remember password? 
                        <span class="link" onclick="memberArea('signin');">Sign in here</span>
                    </p>
                </div>
            </div> 
        </fieldset>
</div>
`;

const signUpForm = `
<div id="asection" class="asection-min">
        <fieldset>
            <div id="memberForm">
            <legend><h2>Sign Up</h2></legend>
                <p>Already own an account? 
                    <span class="link" onclick="memberArea('signin');">Sign in here</span>
                </p>
                <div id="signUp-info"></div>
                <div>
                        <p><i class="material-icons">email</i><input type="email" name="email" id="email" class="input-field" placeholder="Provide your email" autofocus required/></p>
                        <p><i class="material-icons">person</i><input type="text" name="first_name" id="first_name" class="input-field" placeholder="Enter your first name" /></p>
                        <p><i class="material-icons">person</i><input type="text" name="last_name" id="last_name" class="input-field" placeholder="Enter your last name" required /></p>
                        <p><i class="material-icons">location_on</i><input type="text" id="address" name="address" placeholder="Enter your current location" required/></p>
                        <p><i class="material-icons">lock</i><input type="password" name="password" id="password" class="input-field" placeholder="Create a password" required/></p>
                        <p><i class="material-icons">lock</i><input type="password" name="verify" id="verify" class="input-field" placeholder="Verify your password" required/></p>
                        <p><button type="submit" id="signUp" onclick="signUp();" class="button-enabled">Sign Up</button></p>
                        <p class="link" onclick="memberArea('forgotPassword');">Forgot password? Click here</p>
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
                        <label for="manufacturer">Car Make:</label><span class="required">*</span></br>
                        <select id="manufacturer" name="manufacturer" onchange="modifyModelOptions();">
                        </select></br>
                        <span id="info-manufacturer"></span>
                    </p>
                    <p>
                        <label for="model">Car Model:</label><span class="required">*</span></br>
                        <select id="model" name="model">
                        </select></br>
                        <span id="info-model"></span>
                    </p>
                    <p>
                        <label for="body_type">Body Type:</label><span class="required">*</span></br>
                        <select id="body_type" name="body_type">
                            <option selected disable>Select Body Type</option>
                            <option value="saloon">Saloon</option>
                            <option value="truck">Truck</option>
                            <option value="trailer">Trailer</option>
                            <option value"van">Van</option>
                        </select></br>
                        <span id="info-body_type"></span>
                    </p>
                    <p>
                        <label for="year">Year:</label></br>
                        <input type="number" name="year" id="year" placeholder="Enter Model Year"/></br>
                        <span id="info-year"></span>
                    </p>
                    <p>
                        <label for="mileage">Mileage:</label></br>
                        <input type="number" name="mileage" id="mileage" placeholder="Enter Mileage On Car"/>Miles</br>
                        <span id="info-mileage"></span>
                    </p>
                    <p>
                        <label for="state">State:</label><span class="required">*</span></br>
                        <select name="state" id="state">
                            <option selected disable>Select Condition</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select></br>
                        <span id="info-state"></span>
                    </p>
                    <p>
                        <label for="transmission">Transmission:</label></br>
                        <select name="transmission" id="transmission">
                            <option selected disable>Select Transmission</option>
                            <option value="new">Auto</option>
                            <option value="used">Manual</option>
                        </select></br>
                        <span id="info-transmission"></span>
                    </p>
                    <p>
                        <label for="vehicle_inspection_number">Vehicle Inspection Number:</label></br>
                        <input type="text" name="vehicle_inspection_number" id="vehicle_inspection_number" placeholder="Enter Vehecle Inspection Number"/></br>
                        <span id="info-vehicle_inspection_number"></span>
                    </p>
                    <p>
                        <label for="license">License Plate:</label></br>
                        <input type="text" name="license" id="license" placeholder="Enter License Plate Number"/></br>
                        <span id="info-licence"></span>
                    </p>
                    <p>
                        <label for="location">Location:</label></br>
                        <input type="text" name="location" id="location" placeholder="Enter vehicle location"/></br>
                        <span id="info-location"></span>
                    </p>
                    <p>
                        <label for="description">Car Description:</label></br>
                        <textarea rows="4" cols="25" name="description" id="description" placeholder="Enter car description here..."></textarea></br>
                        <span id="info-description"></span>
                    </p>
                    <p>
                        <label for="price">Price:</label><span class="required">*</span></br>
                        <input type="number" name="price" id="price" placeholder="Set Your Price"/>Naira</br>
                        <span id="info-price"></span>
                    </p>
                    <p>
                        <label for="image_url">Upload 1st image:</label></br>
                        <input type="file" name="image_url" id="image_url" accept="image/*"></br>
                        <span id="info-image_url"></span>
                    </p>
                    <p>
                        <label for="image2">Upload 2nd image:</label></br>
                        <input type="file" name="image2" id="image2" accept="image/*"></br>
                        <span id="info-image2"></span>
                    </p>
                    <p>
                        <label for="image3">Upload 3rd image:</label></br>
                        <input type="file" name="image3" id="image3" accept="image/*">
                        <span id="info-image3"></span>
                    </p>
                    <p>
                        <label for="image4">Upload 4th image:</label></br>
                        <input type="file" name="image4" id="image4" accept="image/*"><br/>
                        <span id="info-image4"></span>
                    </p>
                </form>
                <p><button type="submit" id="login" onclick="postAnAdd" class="button-enabled">Add New Ad</button></p>
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
                            <img src="https://res.cloudinary.com/torsami77/image/upload/v1560170510/no-profile-image_fu64pb.jpg" class="avater" />
                            <input type="file" name="profile-pic" accept="image/*">
                            <p>
                                <button type="submit" name="modify-pic" id="modify-pic" class="button-enabled">Modify</button>
                            </p>
                    </fieldset>
                    <br/>

                    <fieldset>
                        <legend>Update My Location</legend>
                            <form>
                                <p><i class="material-icons">location_on</i><input type="text" id="location" name="location" placeholder="Enter your current location" required/></p>
                                <button type="submit" id="update-location" name="update-location" onclick="updateLocation();">Update Location</button>
                            </form>
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
                                    <p><i class="material-icons" id="old-v-icon"></i><input id="old-value" name="old-value" disabled/></p></br>
                                    <p><i class="material-icons" id="new-v-icon"></i><input id="new-value" name="new-value" disabled/></p>
                                    <p><i class="material-icons" id="confirm-v-icon"></i><input id="confirm-value" name="confirm-value" disabled/></p>
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

const flagReportForm = `
<form>
    <p><input type="text" name="reason" id="reason" placeholder="Enter your Reason for this flaging"/></p>
    <p>
        <textarea name="description" id="description" placeholder="Described"/>
            Enter Description ....
        </textarea>
    </p>
    <p>
        <button type="submit" name="flagReport" id="flagReport">
        <i class="material-icons red-icon">flag</i>Create Report
        </button>
    </p>
</form>
`;