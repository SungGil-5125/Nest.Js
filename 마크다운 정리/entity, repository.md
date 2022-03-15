# entity

entity는 간단하게 말하면 실체, 객체 이다.

- entity는 사람, 물건, 개념, 정의 등과 같이 명사이다.
- entity는 '업무상 관리가 필요한것'에 해당합니다.
- entity는 서비스 안에서 '저장되어야 할 어떤것'이다.

<br>

왜 entity를 사용해야 할까?<br>
기존 방식을 사용한다면 create table user() 이런식으로 entity를 만들어야 한다. 하지만 이 방식은 복잡하고, 실수하면 수정이 어렵다.
TypeORM을 사용한다면, 데이터 베이스 테이블로 변환되는 class를 생성하기 때문에 위에 처럼 하지 않고, 클래스를 생성한 후에 그 안에 컬럼들을 정의해주면 된다. 필요한 데코레이터는 다음과 같다.

@Entity<br>    
    
    해당 클래스가 엔티티임을 알려주는 데코레이터다. 이는 테이블에 해당되는 부분이다. 

@PrimaryGeneratedCoium()<br>
    
    해당 클래스에 PK를 나타내는 부분으로서, 해당 column이 pk로 사용될것을 나타낸다.

@Column<br>

    해당 클래스의 어떤 property가 컬럼으로 쓰여서 DB에 저장될지 알려주는 엔티티이다.

```typescript
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./boards.model";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    status : BoardStatus;
}
```

엔티티는 이와 같이 만든다.

## Repository

Repository는 엔티티 객체와 같이 작동하며, 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리한다. (CLUD 처리한다.) 

//추후 repository는 업데이트 할 예정이다.