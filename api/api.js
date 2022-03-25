import axios from "axios";
const data = {
  endpoint: "https://9999.geztion.pro",
  db: "9999",
}


export const LogIn = async (dat) => {
  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "login": dat.user,
      "password": dat.pass,
      "db": "9999"
    }
  });

  var config = {
    method: 'post',
    url: 'https://9999.geztion.pro/auth',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  let result = await axios(config);
  return result;
};

export const Test = async (dat) => {
  const url = `https://qa.falabella.edatamart.co/lendbot/seller-cl/api/lookup/775722401`;
  const method = "GET";

  const result = await fetch(url, {
    method: method,
    headers: {

      "x-api-key": "rNG7sFvyAU2NfsPgSqmgw6oBa0tccU1y7ODBZ7UY"
    }

  });

  return result;
};


export const GetInvoices = async (session_id) => {
  var axios = require('axios');
  var data = `\n{\n    "cookies":${session_id},\n    \n     "params": {\n         "query": "id",\n         "limit":"1"\n    }\n}`;

  var config = {
    method: 'get',
    url: 'https://9999.geztion.pro/api/account.invoice/?query={date_invoice, id, check_done, name,partner_id{name}}&page_size=10',
    headers: {
      'Content-Type': 'text/plain',
      'Cookie': `session_id=${session_id}`
    },
    data: data
  };

  return axios(config)
};


export const GetFactura = async (id, session_id) => {
  var config = {
    method: 'get',
    url: `https://9999.geztion.pro/api/account.invoice.line/?filter=[["invoice_id", "=", ${id}]]&query={id,product_id{name,id}, name,quantity,check_done,quantity_receive}&page_size=10&page=1`,
    headers: {
      'Cookie': `session_id=${session_id}`
    }
  };
  return axios(config);
};

export const UpdRecieve = async (session_id, id, quantity) => {
  var data = JSON.stringify({
    "params": {
      "filter": [
        [
          "id",
          "=",
          id
        ]
      ],
      "data": {
        "quantity_receive": quantity,
        "check_done": "true"
      }
    }
  });

  var config = {
    method: 'put',
    url: 'https://9999.geztion.pro/api/account.invoice.line/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${session_id}`
    },
    data: data
  };

  return axios(config);
};

export const UpdInvoices = async (session_id, id) => {
  var data = JSON.stringify({
    "params": {
      "filter": [
        [
          "id",
          "=",
          id
        ]
      ],
      "data": {
        "check_done": "true"
      }
    }
  });

  var config = {
    method: 'put',
    url: 'https://9999.geztion.pro/api/account.invoice/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${session_id}`
    },
    data: data
  };

  return axios(config);
};


export const UpdCompletadas = async (session_id, id) => {
  var data = JSON.stringify({
    "params": {
      "filter": [
        [
          "id",
          "=",
          id
        ]
      ],
      "data": {
        "check_done": "true"
      }
    }
  });

  var config = {
    method: 'put',
    url: 'https://9999.geztion.pro/api/account.invoice/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${session_id}`
    },
    data: data
  };

  return axios(config);
};

export const GetProducts = async (session_id, page) => {
  var config = {
    method: 'get',
    url: `https://9999.geztion.pro/api/product.product/?page_size=10&page=${page}&query={name, id,qty_available,uom_id{name}}`,
    headers: {
      'Cookie': `session_id=${session_id}`
    }
  };
  console.log("entra a la api", config);
  return axios(config);
};

export const Reset = async (session_id, email) => {
  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "args": [
        email
      ]
    }
  });

  var config = {
    method: 'post',
    url: 'https://9999.geztion.pro/object/res.users/reset_password',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${session_id}`
    },
    data: data
  };

  return axios(config);
};


export const GetSpace = async (session_id) => {
  var data = '\n{\n    \n     "params": {\n         "query": "id",\n         "limit":"1"\n    }\n}';

  var config = {
    method: 'get',
    url: 'https://9999.geztion.pro/api/stock.location/?query={id, name,company_id{name}}&filter=[["usage", "=", "internal"]]&limit=1',
    headers: {
      'Content-Type': 'text/plain',
      'Cookie': `frontend_lang=es_CL; session_id=${session_id}`
    },
    data: data
  };

  return axios(config);
};

export const UbicarProd = async (session_id, espacio, idProd, cant) => {
  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "location_id": espacio,
        "product_id": idProd,
        "quantity": cant
      }
    }
  });

  var config = {
    method: 'post',
    url: 'https://9999.geztion.pro/api/stock.quant/',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `frontend_lang=es_CL; session_id=${session_id}`
    },
    data: data
  };

  return axios(config);
};