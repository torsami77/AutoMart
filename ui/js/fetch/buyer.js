const placeOrder = (carId) => {
    const amount = document.getElementById('amount').value;

    const uri = `${URL}/api/v1/order`;
    const h = new Headers({ 'content-type': 'application/json', authorization: token});
    const body = {
        amount,
        carId,
    };


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.success === 'true') {
        document.getElementById('purchase-info').innerHTML = `${data.message}`;
        document.getElementById('order-button').innerHTML = `
        <button class="button" onclick="updateOrder(${data.data.carId}, ${data.data.id});">
            <i class="material-icons">add_shopping_cart</i> Place order
        </button>`;

      } else {
        document.getElementById('purchase-info').innerHTML = `${data.message}`;
        document.getElementById('amount').focus();
        return false;
      }

      return false;
    });
  return false;
}

const updateOrder = (carId, orderId) => {
    const amount = document.getElementById('amount').value;

    const uri = `${URL}/api/v1/order/${orderId}/price`;
    const h = new Headers({ 'content-type': 'application/json', authorization: token});
    const body = {
        amount,
        carId,
    };


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.success === 'true') {
        document.getElementById('purchase-info').innerHTML = `${data.message}`;
        document.getElementById('order-button').innerHTML = `
        <button class="button" onclick="updateOrder(${data.data.carId}, '${data.data.id}');">
            <i class="material-icons">add_shopping_cart</i> Place order
        </button>`;
      } else {
        document.getElementById('purchase-info').innerHTML = `${data.message}`;
        document.getElementById('amount').focus();
        return false;
      }

      return false;
    });
  return false;
}

const flagReport = (carId) => {

    const uri = `${URL}/api/v1/flag`;
    const h = new Headers({ 'content-type': 'application/json', authorization: token});
    const body = {
        carId,
        reason,
        description,
    };


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.success === 'true') {
        document.getElementById('purchase-info').innerHTML = `${data.message}`;
        document.getElementById('order-button').innerHTML = `
        <button class="button" onclick="updateOrder(${data.data.carId}, '${data.data.id}');">
            <i class="material-icons">add_shopping_cart</i> Place order
        </button>`;
      } else {
        document.getElementById('purchase-info').innerHTML = `${data.message}`;
        document.getElementById('amount').focus();
        return false;
      }

      return false;
    });
  return false;
}