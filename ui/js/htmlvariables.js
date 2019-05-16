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

