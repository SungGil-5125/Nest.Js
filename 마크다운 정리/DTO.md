# DTO(Data Transfer Object)

DTO란 각 계층(컨트롤러, 뷰 등) 간의 데이터 교환을 위한 객체를 말한다.

**/scr/login/dto/create-login.dto.ts**

```typescript
export calss CreateLoginDto{
    id : number,
    pw : string,
    name : string
}
```
**/scr/login/login.controller.ts**
```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto.ts';

@Controller('login')
export class LoginController {
    @Post()
    async create(@Body() CreateLoginDto : CreateLoginDto){
        return CreateLoginDto;
    }
}
```
컨트롤러를 생성한 후에는 반드시 Nest에게도 존재를 알려야 한다.

<br>

새로 생긴 컨트롤러는 module에 추가 해야 한다.

