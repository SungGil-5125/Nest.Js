# NestJS

![image](https://user-images.githubusercontent.com/82089918/158142577-295e5072-07d5-4524-a619-cf2a13f7ac58.png)

    scr폴더 내부의 main - app.module.ts - app.controller.ts - app.service.ts 순으로 알아보자.

## 기본 생성 파일 알아보기

- main.ts

```Typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
AppModule은 기본적으로 생성되는 root모듈이다. NestFactory객체가 nestjs가 제공하는 것인데, 첫번째로 루트모듈을 입력받고, 두번째 인자로 옵션을 입력받으며, Mest애플리케이션 인스턴스를 반환하는 Promise객체를 반환한다.

---
- app.module.ts
  
```Typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
    })

export class AppModule {}
```
App.controller와 App.service는 기본적으로 생성되는 컨트롤러와 서비스 이다. Mudule 데코레이터는 가장 아랫줄의 export하고 있는 AppModule을 꾸며준다. @Module 데코레이터가 AppModule을 정의하고 있다.

---

- app.controller.ts

```Typescript

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```
@nestjs/common 모듈에서 Controller와 Get을 import하고 있다. 둘다 데코레이터로 사용하고 있고, Get은 반드시 HTTP메소드 일것이다.
데코레이터는 반드시 코드위에 공백없이 작성해야 한다. 기본 라우트에 Get요청이 들어올 경우 Controller 클래스에 constructor에서 정의한 appService의 getHello() 함수가 실행된다.

---

- app.service.ts

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

@nestjs/common에서 Injectable 데코레이터를 import하고 사용한다.
아까 Controller에서 사용했던 AppService의 getHello함수가 보인다.
정리해보면 Controller의 Get요청이 들어오면 getHello가 실행되고 있는데 여기서 로직을 작성하면 될거 같다!

---

## Controller

- Nest의 데코레이터들 -
  
![image (1)](https://user-images.githubusercontent.com/82089918/158157888-18d7f88a-28ce-47cb-8460-4078ec103924.png)

- 리다이렉트 -
  
```typescript
@Get()
@Redirect('localhost:3000/login')
```

위에처럼 redirect를 사용할 수 있고, res.redirect를 사용할 수 있다.

- 파라미터 -
```typescript
@Get(':id')
findOne(@Param() params) : string {
    console.log(params);
    return `param : ${params}`;
})
```

## Provider

Provider는 Service를 포함해 reporsitory, factory, helper 등이 될 수 있다.
<br>
Provider는 단순히 @Injectable() 데코레이터 주석이 달린 클래스를 말한다.

    Controller는 단순히 HTTP 요청을 처리하고, 이 후의 기능은 Provider에게 위임해야한다. 
    (Nest가 객체지향적으로 설계할 수 있으므로, SOLID원칙을 따르는 것을 권장한다. 단일 책임과 관련있어 보인다.)



## Module

애플리케이션은 하나 이상의 모듈을 가진다.
루트 모듈은 애플리케이션 그래프를 만드는데 스타팅 포인트가 된다.

![image (2)](https://user-images.githubusercontent.com/82089918/158161968-6e82fe31-d462-409f-9b2d-73b19c41089d.png)

- 기능 모듈

기능 모듈은 loginController나 loginService 처럼 특정 기능과 관련된 코드들을 말한다. 동일한 기능이라면 코드들을 체계적으로 관리하고 명확한 경계를 위해서 같은 폴더에 관리해보자. 복잡성을 관리하고 SOLID원칙에 따라 개발하는 것을 위해 cats라는 폴더에 기능모듈을 옮기고 관리 한다고 한다.

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```
---
- 루트 모듈에서 사용하기
```typescript
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```
---
- 공유 모듈
모든 모듈은 기본적으로 공유 모델이다. 모듈에서 export 해주기만 하면 다른 모듈에서 사용할 수 있다. loginModule을 import하는 모든 모듈은 loginModule에 접근할 수 있고, 동일한 인스턴스를 공유하게 된다.

```typescript
import { Module } from '@nestjs/common';
import { loginController } from './login.controller';
import { loginService } from './login.service';

@Module({
  controllers: [loginController],
  providers: [loginService],
  exports: [loginService]
})
export class loginModule {}
```
---
- 모듈 다시 내보내기 module re-exporting    
```typescript
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```
---
- 전역 모듈 Global modules
자주 사용하는 모듈은 중복코드가 발생할 수 있다. Nest는 모듈 범위내에서 Provider를 캡슐화 하는데, import하지 않으면 사용할 수 없다. @Global() 데코레이터를 이용하면 전역 모듈로 사용할 수 있다.

```typescript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

모든 모듈을 Global로 바꾸는것은 좋은 디자인 패턴이 아니다.

---


출처: https://velog.io/@kwonh/Nest-Nest-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-1-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-Controller-Provider-Modules
