
## Cloudinary implementation



```bash
$ npm install cloudinary
```

## Environment vars
Create .env file in root project directory. Then we must install a package and enable environment variables usage. 
```bash
npm install @nestjs/config

```
In order to use the recently installed package we proceed as follows in the <code>app.module.ts</code> file
```bash
import {ConfigModule} from '@nestjs/config'
...
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  ...

```
* Next we have to set up the environment variables from Cloudinary into the .env file and add the .env to the .gitignore file.
* Then create the <code>src/cloudinary/cloudinary-response.ts</code>
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
