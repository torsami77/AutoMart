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

