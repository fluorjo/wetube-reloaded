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

- 그리고 npm install (npm i)만 하면 npm이 package.json 안에 dependencies에 있는 것들을 알아서 설치해줌.  따라서 팀 작업이나 배포 공유 등 할 때 모듈까지 다 공유할 필요가 없음. 
- 그러므로 .gitignore 만들고 /node_modules 추가해서 깃허브에 안 올라가게 하면 됨. 
- package-lock.json은 패키지들을 안전하게 관리해줌.  배포시 똑같은 버전의 모듈을 설치하게 해주는 기능도 있음. 

2.3.

- https://babeljs.io/ - 자바스크립트 컴파일러.  nodejs가 이해하지 못하는 최신 자바스크립트를 컴파일해준다. 

- devDependencies=개발자에게 필요한 dependencies. 그냥 dependencies는 프로젝트를 실행할 때 필요한 거고. 

  devDependencies에 저장하려면 npm install --save-dev 모듈명 입력.

  잘못 설치했어도 json파일에서 옮겨주면 됨.  

-   "presets": ["@babel/preset-env"] babel을 위한 거대한 플러그인.  최신 자바스크립트 구문 사용하게 해주는 것. 여러 preset 중에 가장 유명한 게 env.

2.4.

-  "scripts": {

    "dev": "babel-node index.js"}

  이렇게 package.json 수정해주면 babel을 node랑 같이 사용하게 된다. 

- nodemon 파일이 수정되는 걸 감시해주는 패키지. 파일 수정될 때마다 알아서 얘가 재시작을 해줌. 일일이 npm run dev 안 쳐도 되게 하는 것.  코드 실행해도 콘솔이 종료되지 않는다.

  nodemon 깔고 나면  "scripts": {

    "dev": "nodemon --exec babel-node index.js"

   } 

  이렇게 수정.
  
  

5.1.

- cwd, 즉 현재 작업 실행하고 있는 디렉토리 위치는 서버를 기동하는 파일의 위치에 따라 결정됨. =어디서 노드js를 부르고 있는지에 따라 결정됨. 그리고 그건 기본적으로 package.json이 있는 폴더임. 

5.2.

- 렌더링=pug가 자바스크립트 코드를 해석, 변환해서 사용자에게 보여주는 것.

6.1.

- 절대경로와 상대경로 pug
  http://localhost:4000/videos/

  에서 이동할 때
  a(*href*="/edit")
  이렇게 앞에 /를 붙여주면 어디에 있든 간에 localhost4000/edit으로 감.(절대경로)

  a(*href*="edit")
  이렇게 하면 http://localhost:4000/videos/edit 으로 감.(상대경로)

6.3.

- app.use(express.urlencoded)
  =html을 이해할 수 있게 해줌.

6.18.

- 조건을 지정한다치면 데이터베이스와 html 모두에 대해 적용해야 함. 안 그러면 html에서 부정하게 코드 건드려서 조건을 깨면 데이터베이스에서 막을 수가 없음. 

6.20.

- 주소 형식에 맞췄는데 그 주소에 비디오가 없으면 404로 진입. 
  주소 형식 자체가 안 맞으면 cannot get으로 감. 

6.23.

- windows 에서 db.video.remove({}) 작동 안하는 분들은 use dbName 해주세요!

  [cmd]
  \> mongo
  \> use wetube
  \> db.videos.remove({})

- videoSchema.pre("save", async function () {

    *this*.hashtags = *this*.hashtags[0]

     .split(",")

     .map((word) => (word.startsWith("#") ? word : `#${word}`));

   });*//start's' <-s 주의*

7.2.

- 절대로 비밀번호를 아무 장치 없이 db에 저장하지 마라. 진짜 위험한 거다. 

7.3.

- or operator
  =각 조건이 참일 때 적용.

7.13.

- 안드로이드, 아이폰 앱 만들 때는 쿠키 대신에 token을 씀. 

7.14.

- env 파일에 추가하는 건 전부 다 대문자로 쓴다. 