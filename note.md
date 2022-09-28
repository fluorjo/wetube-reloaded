1.3.  
node.js란?  
- 크롬 v8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임...?  
- 브라우저 밖에서 돌아가는 자바스크립트!  
- electron은 js, html, css로 데스크탑 앱을 만드는 것. vscode도 이걸로 만들어짐.  

1.4.  
npm=자바스크립트 패키지 매니저다 = 자바스크립트랑 같이 써야된다.  
다른 패키지들을 가져다 쓸 수 있게 해준다.  

2.0.  
- node.js 프로젝트 만들 때 가장 먼저 할 일은 package.json 만드는 것. 반드시 저 이름 그대로여야 하고 다 소문자여야 함.  

2.1.  
- "main": "index.js" 이 부분은 package를 다른 사람들이 설치할 때 main을 사용하게 된다. 필수요소 아님.  

- "script":{}에 실행시킬 것들을 넣는다. 

- "scripts":{

    "win":"node index.js"

  }

  이런 식으로 넣은 다음, npm run win 같이 실행시켜주면 index.js가 실행됨.

- npm install 혹은 npm i 다음 express 같은 패키지 이름 넣어서 실행시키면 패키지 설치.

- package.json 안에 dependencies: 패키지가 작동되기 위해 필요한 패키지들. express 설치시 다 같이 깔림

2.2.

- 그리고 npm install (npm i)만 하면 npm이 package.json 안에 dependencies에 있는 것들을 알아서 설치해줌. 