/* eslint-disable camelcase */
const postAnAdd = () => {
  const fd = new FormData();
  fd.append('manufacturer', document.getElementById('manufacturer').value);
  fd.append('model', document.getElementById('model').value);
  fd.append('body_type', document.getElementById('body_type').value);
  fd.append('year', document.getElementById('year').value);
  fd.append('mileage', document.getElementById('mileage').value);
  fd.append('state', document.getElementById('state').value);
  fd.append('transmission', document.getElementById('transmission').value);
  fd.append('vehicle_inspection_number', document.getElementById('vehicle_inspection_number').value);
  fd.append('licence', document.getElementById('licence').value);
  fd.append('location', document.getElementById('location').value);
  fd.append('description', document.getElementById('description').value);
  fd.append('price', document.getElementById('price').value);
  fd.append('image_url', document.getElementById('image_url').value);


  const uri = `${host}/api/v1/car`;
  const h = new Headers({ 'Accept' 'application/json', token });

  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: fd,
  });

  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        document.getElementById(`info-${data.field}`).innerHTML = data.message;
        document.getElementById(data.field).focus();
        return false;
      }
      const success = `
      <div>
      <p class="true" >${data.message}</p>
      <p> <span class="link" onclick="toggleUserpage(createNewAdForm);">Click here to Post another AD</span> </p>
      </div>
      `;

      document.getElementById('bsection').innerHTML = success;
      return false;
    });
};
