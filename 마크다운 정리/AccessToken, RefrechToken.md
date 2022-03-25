# Refresh Token?

Access Token(jwt)를 통한 인증방식의 문제는 만일 제 3자에게 탈취당할경우 보안에 취약하다는 큰 단점이 있다. 유효기간이 짧은 Token의 경우 그만큼 사용자는 로그인을 해서 새롭게 Token을 발급받아야 하므로 불편하다. 그러나 유효기한을 늘리면 토큰을 탈취당했을때 보안에 더 취약하게 된다. 이때 "그러면 유효기한을 짧게 하면서 좋은 방법이 있을까?" 라는 질문의 답이 Refresh Token 이다. <br>

Refresh Token은 Access Token과 똑같은 형태의 jwt이다. 처음에 로그인을 완료 했을때 Access Token과 동시에 발급되는 Refresh Token은 긴 유효기한을 가지고, Access Token이 만료됐을때 새로 발급해주는 열쇠가 된다. <br>

간단히 예를 들자면 Refresh Token이 2주 Access Token이 1시간이라 하자.사용자가 API 요청을 신나게 하다가 1시간이 지나면, 가지고 있는 AccessToken은 만료된다. 그러면 Refresh Token의 유효기간 전까지는 Access Token을 새롭게 발급받을 수 있다.

    * Access Token은 탈취당하면 정보가 유출되는것은 똑같다. 다만 짧은 시간 안에만 사용이 가능하기 때문에 더 안전하다.
    * Refresh Token의 유효기한이 만료된다면, 사용자는 새로 로그인을 해야한다. Refresh Token도 털릴 가능성이 있기 때문이다.(기한은 보통 2주로 많이 한다고 한다.)

![다운로드 (2)](https://user-images.githubusercontent.com/82089918/160121005-a07f9643-9c9c-4e2f-abf2-7641e4cd796a.png)

    1. 사용자가 로그인과 회원가입을 합니다.
    2. 서버는 암호화된 pw를 확인하고 회원 db에 저장합니다.<br>
    3. 서버는 AccessToken과 RefreshToken을 발급합니다. 이때 일반적으로 서버는 RefreshToken을 회원 db에 저장합니다.
    4. 위 내용에 포함.
    5. 사용자는 Refresh Token을 안전한 장소에 저장 후, AccessToken을 헤더에 실어 요청을 보낸다.
    6. Access Token을 검증하여 이에 맞는 데이터를 보낸다.
    7. 위 내용에 포함.
    8. 시간이 지나 AccessToken이 만료 됐다고 가정하자.
    9. 사용자는 이전과 같이 AccessToken을 헤더에 실어 요청을 보낸다.
    10. 서버는 AccessToken이 만료됨을 확인하고 권함없음을 신호로 보낸다.
    11. 위 내용에 포함.

    * AccessToken이 만료가 될때마다 과정 9~11을 거칠 필요는 없다. 사용자 프론트에서 AccessToken의 payload를 통해 유효기한을 알 수 있다. 따라서 프론트에서 토큰이 API요청전에 만료됐다면 바로 재발급 요청을 할 수도 있다. 

    12.  사용자는 Refresh Token과 Access Token을 함께 서버로 보낸다.
    13.  서버는 받은 Access Token이 조작되지 않았는지 확인한후, Refresh Token과 사용자의 DB에 저장되어 있던 Refresh Token을 비교한다. 
         Token이 동일하고 유효기간도 지나지 않았다면 새로운 Access Token을 발급해줍니다.
    14.  서버는 새로운 Access Token을 헤더에 실어 다시 API 요청을 진행합니다. 

   <br>

(장점) : Access Token만 있을때보다 보안이 안전하다.

(단점) : 구현이 좀 복잡하다.(프론트 백엔드 전부)
         Access Token이 만료될 때마다 새롭게 발급되는 과정에서 생기는 HTTP 요청 횟수가 많다.
         이는 서버의 자원 낭비로 귀결된다.
         
<br>

그냥 읽으면 금방 까먹으니까 직접 적으면서 정리 했습니다.
출처 : https://tansfil.tistory.com/59