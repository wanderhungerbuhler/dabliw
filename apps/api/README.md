<a href="https://dabliw.com">
  <img alt="Dabliw is the future open-source open-source infrasctruture for modern marketing" src="https://storage.googleapis.com/assets.dabliw.com/01a253db-0b7a-42f4-b4cf-54329d2f1731.png">
</a>

<h3 align="center">Dabliw</h3>

<p align="center">
    Remender and send a birthday wish to your friends and family
    <br />
    <br />
    <br />
    <a href="https://dabliw.com" taget="_blank"><strong>Demo</strong></a> ·
    <a href="#introduction"><strong>Introduction</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a>
</p>

## Introduction
Dabliw is the future open-source infrasctruture for modern marketing. Our goals is just make to you remember and send a birthday wish to your friends and family 

## Development
#### Install dependencies
```bash
yarn install
```

## Docker
Before to start the project it's very important run a local database using `docker-compose`
```base
docker-compose up -d
```

### Generate Schema Database
You need to run the following command bellow
```bash
yarn prisma migrate dev --name init
```

#### Environments
```bash
DATABASE_URL="postgresql://<your_user>:<your_password>@localhost:5432/<your_database>?schema=public"

JWT_PRIVATE_KEY="LS0..." #Text converted to base64
JWT_PUBLIC_KEY="LS0..." #Text converted to base64
```

### Generating a PRIVATE KEY
If you used a macOS using following struction bellow

- You need to generete a `pem` file to `PRIVATE_KEY` and automatically will be created a `PUBLIC_KEY` too.
```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```
Now you need convert a `KEY's` to `base64` and save in your enviroments.
```base
base64 -i private_key.pem -o private_key-base64.txt
```
```base
base64 -i public_key.pem -o public_key-base64.txt
```
After convert the keys copy and paste respective values in your environments. If you want might delete files for your security

## Run project
```base
yarn start:dev
```

## Tech Stack

- [NestJS](https://nestjs.com/) - framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Neon](https://neon.tech/) – database production
- [Prisma.io](https://www.prisma.io/) database local
- [Passport JWT](https://www.passportjs.org/packages/passport-jwt/) - jwt Token
- [Render](https://render.com/) - deployments
- [Vercel](https://vercel.com/) – deployments
  
## License
MIT License