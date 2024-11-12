# com.meli.api
Challenge for Mercado Libre 2024 (mutants)

## Run Locally with Docker (Recommended)

Clone the project

```bash
  git clone https://github.com/msuez/com.meli.api
```

Go to the project directory

```bash
  cd com.meli.api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  docker-compose up --build
```

## Running Tests (>80)

To run tests, run the following command

```bash
  npm run test
```
or 
```bash
  npm run test:watch
```

## Curls to AWS Lambda

#### POST to /mutant
```bash
curl -X POST 'https://3nwjzqq590.execute-api.us-east-1.amazonaws.com/dev/mutant' -H 'Content-Type: application/json' -d '{
    "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}'
```

#### GET to /stats
```bash
curl -X GET 'https://3nwjzqq590.execute-api.us-east-1.amazonaws.com/dev/stats'
```

## Project URL
- [Meli challenge URL](https://3nwjzqq590.execute-api.us-east-1.amazonaws.com/dev/)

## Author
- Github: [@msuez](https://github.com/msuez)
- Github: [@matisuez](https://github.com/matisuez)
- Bitbucket: [@matisuez](https://bitbucket.org/matisuez)

## Support

For support, email matisuez@gmail.com.