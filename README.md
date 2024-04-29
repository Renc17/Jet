### SETUP

- yarn --frozen-lockfile
- npx lerna run build

Create a .env file in apps/operator and add API_BASE_URL= which is your service url e.x "http://localhost:3000". This is used for API endpoints and socket
Create a .env file in services/delivery and add MONGO_CONNECTION_STRING=

1- spin-up a mongo container
2- npx lerna run start

or

docker compose up (there is a problem with the operator build though. I can see that inside the container there is a .next folder but for some reason it doesn't have all the necessary files for next to run)

## API

After that you need to populate the db

Ideally these endpoints should be authenticated

- Create a restaurant
  POST /api/establishment
  body {
  {
  "name": "",
  "landline": "",
  "mobile": "",
  "contactEmail": "",
  "representative": "",
  "address": {
  "street": "",
  "county": "",
  "postalCode": "",
  "googleMapsLink": ""
  },
  "vatId": "",
  "tin": "",
  "logo": "/usr/tmp/logo.png"
  }
  }

- Create a category
  POST /api/:establishmentId/category
  body {
  {
  "name": "",
  "dishes": [
  {
  "name": "",
  "price": 50
  },
  {
  "name": "",
  "price": 90
  }
  ]
  }
  }

- Create a menu
  POST /api/:establishmentId/menu
  body {
  "categories": [ObjectId, ObjectId, ObjectId]
  }
  Once you have created a menu, the establishment is now operating and users can access it.

Now for the client

- Get Menu
  GET /api/:establishmentId/menu

- Create an order
  POST /api/662ee12103656b51ae2e3799/order
  body {
  {
  "dishes": [
  {
  "dishId": "",
  "quantity": 1
  }
  ],
  "currency": "EUR",
  "firstName": "",
  "lastName": "",
  "address": {
  "street": "",
  "county": "",
  "postalCode": "",
  "floor": ""
  }
  }
  }

WORK HOURS: approximately 18hours
