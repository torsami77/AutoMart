const signUp = () => {
  const email = document.getElementById('email').value;
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;
  let verify = document.getElementById('verify').value;
  if (verify === '') {
    verify = Math.random().toString(36).substring(5);
  }

  const uri = `${host}/api/v1/auth/signup`;
  const h = new Headers({ 'content-type': 'application/json' });
  const body = {
    email,
    first_name,
    last_name,
    address,
    password,
    verify,
  };

  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.error) {
        document.getElementById('signUp-info').innerHTML = `<p class="false" id="status">${data.error}</p>`;
        document.getElementById(data.field).focus();
        return false;
      }
      const success = `
      <div id="asection" class="asection-min">
      <fieldset>
          <div id="memberForm">
          <legend><h2 class="true">${data.data.message}</h2></legend>
            <p> <span class="link" onclick="memberArea('signin');">Go to your page</span> </p>
          </div>
      </fieldset>
          `;


      document.getElementById('section').innerHTML = success;
      return false;
    });
  return false;
}

const signIn = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const uri = `${host}/api/v1/auth/signin`;
  const h = new Headers({ 'content-type': 'application/json' });
  const body = {
    email,
    password,
  };


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.error) {
        document.getElementById('signin-info').innerHTML = `<p class="false" id="status">${data.error}</p>`;
        document.getElementById(data.field).focus();
        return false;
      }
      window.location.replace('userpage.html');
      return false;
    });
  return false;
};

const sendPasswordLink = () => {
  const email = document.getElementById('email').value;

  const uri = `${host}/api/v1/users/${email}/reset_password`;
  const h = new Headers({ 'content-type': 'application/json' });


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.error) {
        document.getElementById('info-passResetReq').innerHTML = `${data.error}`;
        document.getElementById('email').focus();
        return false;
      }
      const success = `
      <div id="asection" class="asection-min">
        <fieldset>
            <div id="memberForm">
              <legend><h2 class="true" >${data.data.message}</h2></legend>
              <p>
                <span class="link" onclick="memberArea('forgotPassword');">Click here to resend link?</span>
              </p>
            </div>
        </fieldset>
      `;

      document.getElementById('section').innerHTML = success;
      return false;
    });
  return false;
};

createNewPassword = () => {
  const url = window.location.href;
  const params = url.split('?');
  const token = params[1];

  const password = document.getElementById('password').value;
  const verify = document.getElementById('verify').value;

  const uri = `${host}/api/v1/users/createnew_password`;
  const h = new Headers({ 'content-type': 'application/json', token });
  const body = {
    password,
    verify,
  };


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.error) {
        document.getElementById('info-create-password').innerHTML = `${data.error}`;
        document.getElementById(data.field).focus();
        return false;
      }
      const success = `
      <div id="asection" class="asection-min">
        <fieldset>
            <div id="memberForm">
              <legend><h2 class="true" >${data.data.message}</h2></legend>
              <p>
                <span class="link" onclick="memberArea('signin');">Click here to sign in</span>
              </p>
            </div>
        </fieldset>
      `;

      document.getElementById('section').innerHTML = success;
      return false;
    });
  return false;
};
