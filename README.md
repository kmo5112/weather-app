=======
# 프로젝트 소개

세계 도시의 날씨 정보를 가져와 표시하는 웹 애플리케이션 구현

# 상세 설명

1.앱이 실행되자마자 현재 위치의 날씨를 볼 수 있다. (지역, 온도, 날씨 상태)

2.다른 도시의 버튼을 볼 수 있다. (현재 도시, 세계 4대 도시)

3.다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다.

4.검색기능을 통해서 각 국의 주요도시의 날씨 정보를 알수 있다.

5.유저는 데이터가 로딩될때 로딩 스피너를 볼 수 있다.

6.현재위치버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.


# 기능 구현

## 1.날씨 정보 표시

WeatherBox 컴포넌트를 사용하여 선택한 도시 또는 현재 위치의 날씨 정보를 표시합니다.

## 2.도시 선택 및 현재 위치로 날씨 가져오기

WeatherButton 컴포넌트를 사용하여 여러 도시를 선택할 수 있습니다.
"Current Location" 버튼을 클릭하면 현재 위치의 날씨 정보를 가져옵니다.
선택한 도시의 날씨 정보는 OpenWeatherMap API를 사용하여 가져옵니다.

## 3.데이터 로딩 표시

데이터를 가져오는 동안 로딩 스피너를 표시하여 사용자에게 진행 중임을 나타냅니다.

## 4.도시 검색 기능

검색 입력란에 도시 이름을 입력하고 "검색" 버튼을 클릭하여 특정 도시의 날씨 정보를 가져올 수 있습니다.
입력된 검색어를 searchCity 상태 변수에 저장하고, 이를 사용하여 도시 날씨를 가져옵니다.

## 5.날씨 API와 통합

OpenWeatherMap API를 사용하여 선택한 도시 또는 현재 위치의 실시간 날씨 정보를 가져옵니다.
API에서 반환된 데이터는 weather 상태 변수에 저장되며 화면에 표시됩니다.

## 6.데이터 단위 변환

OpenWeatherMap API에서 반환하는 온도를 섭씨로 변환하여 사용자에게 표시합니다.

## 7.오류 처리

API 호출 중에 발생하는 오류를 처리하고 사용자에게 오류 메시지를 표시합니다.

# 배운점 & 개선할점

## 배운점

1.React Hook의 기본적 개념을 배워볼 수 있었습니다.

2.비동기 작업을 수행하는 방법과 API 호출 및 응답 처리 방법을 이해할 수 있었습니다.

3.버튼 클릭과 입력 필드 변경과 같은 이벤트를 처리하고 이벤트 핸들러를 작성하는 방법을 배울 수 있었습니다.

## 개선할점

1.날씨 정보에 대한 상세한 정보를 표시하는 것, 현재는 기온만 표시되지만 습도, 바람 속도, 날씨 상태 등을 추가


2.현재 코드에서는 units=metric을 사용하여 기온을 섭씨로 가져오고 있으나, 사용자가 섭씨 또는 화씨 단위를 선택할 수 있도록 기능을 추가


3.현재는 Bootstrap을 사용하고 있지만 사용자 지정 스타일링을 추가하여 더 다채로운 인터페이스 만들기



>>>>>>> 45b721895b515b237db558129430fd87e1be6b27
