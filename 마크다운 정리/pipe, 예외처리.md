# pipes

파이프란 무엇일까? @Injectable() 데코레이터로 주석이 달린 클래스 이다.
<br>
또한, 파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해서 작동하는데 **datatransformatsion** 과 **data validation**를 위해서 사용된다.

![1](https://user-images.githubusercontent.com/82089918/158344365-199ca5e2-ee45-421f-b972-b716342ec60d.png)

다음과 같이 URL요청이 왔을때, 먼저 해당 URL에 대한 데이터들을 처리해 주는것이다. 문제가 생기면 통과하지 못하고, error 처리 되며, 통과한다면 데이터를 처리해준 채로 handler에게 가게 된다.

- Data Transformation : <br>
    입력데이터를 원하는 형식으로 변환하는것을 말한다. 가령 문자열에서 정수로 바꾸는것을 말한다.
- Data Validation : <br>
    유효성 체크로서, 입력 데이터를 평가하고 유효한 경우 변경되지 않은 상태로 전달된다. 그렇지 않으면 데이터가 올바르지 않을때 예외를 발생시킨다.

## 파이프 생성하는 방법

Handler-level Pipes, Parameter-level Pipes, Global-level Pipes 이렇게 3가지로 나뉜다.

1. Handler-level Pipes
   routes hendler 하나에만 @UsePipes(pipe) 데코레이터를 남겨 pipe를 사옹한다.

```typescript
@Post()
@UsePipes(pipe)
createBoard(
    @Body() createBoardDto : CreateBoardDto 
) : Board {
    return this.boardService.createBoard(createBoardDto);  
}
```
2. Parameter-level Pipes
   핸들러 하나만 사용하는게 아니라, 특정한 파라미터에게 작용한다.
```typescript
@Patch('/:id/status')
updateBoardStatus(
    @Param('id') id : string,
    @Body('status', pipe) status : BoardStatus
){
    return this.boardService.updateBoardStatus(id, status);
}
```
3. Global-level Pipes
    글로벌 파이프로서 어플리케이션 레벨의 파이프이다. 클라이언트에서 들어오는 모든 요청에 적용이 되어, main.ts의 app에 useGloabalPipes()를 적용하면 된다.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(globalPipe)
  await app.listen(3000);
}
bootstrap();     
```

## Built-in Pipes

nest의 pipe는 빌트인과 커스텀이 있는데, 우리가 직접만든것은 커스텀이고, 빌트인은 미리 만들어진 파이프이다.

- built-in pipes는 다음과 같다.
1. validationPipe
2. ParseIntpipe
3. ParseFloatPipe
4. ParseBoolPipe
5. ParseArrayPipe
6. ParseUUIDPipe
7. ParseEnumPipe
8. DefaultValuePipe

```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id : number){
    return;
}
```
한개의 예제를 보자면 파라미터가 데이터타입이 숫자형인가를 확인하는 파이프이다. 만약 문자열로 보낸다면 에러를 발생시킨다.

## 예외처리

    throw new NotFoundExeption()을 사용하면 된다.



