# Пометка на память

## Создание WEBGL игры с интеграцией React и Unity

### Шаги по установке и созданию проекта

1. Создаем новый проект React:
   ```bash
   npx create-react-app react-project
   ```

2. Переходим в папку проекта:
   ```bash
   cd react-project
   ```

3. Устанавливаем библиотеку для интеграции Unity в React:
   ```bash
   npm install react-unity-webgl
   ```

4. Собираем билд Unity и переносим его в папку `public/UnityBuild`. В моем случае проект называется `Clicker`.

5. Создаем файл `App.js` в папке `src` и файл `UnityApp.js` в папке `src`.

### Пример файла `App.js`

```javascript
import React from 'react';
import UnityApp from './UnityApp';

function App() {
    return (
        <div className="App">
            <UnityApp />
        </div>
    );
}

export default App;
```

### Пример файла `UnityApp.js`

```javascript
import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityApp() {
    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: "UnityBuild/Build/Clicker.loader.js",
        dataUrl: "UnityBuild/Build/Clicker.data.unityweb",
        frameworkUrl: "UnityBuild/Build/Clicker.framework.js.unityweb",
        codeUrl: "UnityBuild/Build/Clicker.wasm.unityweb",
    });

    useEffect(() => {
        const user = {
            user_id: "666",
            user_name: "Rimuru Dev"
        };

        console.log("Sending user data:", JSON.stringify(user));

        sendMessage("UserDataHandler", "ReceiveUserData", JSON.stringify(user));
    }, [sendMessage]);

    useEffect(() => {
        window.UnityToReact = (message) => {
            console.log("Received from Unity: ", message);
        };

        return () => {
            delete window.UnityToReact;
        };
    }, []);

    return <Unity unityProvider={unityProvider} style={{ width: "800px", height: "600px" }} />;
}

export default UnityApp;
```

6. Запускаем проект:
   ```bash
   npm start
   ```

7. Открываем в браузере:
   ```
   http://localhost:3000/
   ```
