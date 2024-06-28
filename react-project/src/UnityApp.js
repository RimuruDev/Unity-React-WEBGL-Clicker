import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityApp() {
    const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "UnityBuild/Build/UnityBuild.loader.js",
        dataUrl: "UnityBuild/Build/UnityBuild.data.unityweb",
        frameworkUrl: "UnityBuild/Build/UnityBuild.framework.js.unityweb",
        codeUrl: "UnityBuild/Build/UnityBuild.wasm.unityweb",
    });

    // Пример передачи данных в Unity
    useEffect(() => {
        const user = {
            user_id: "666",
            user_name: "Rimuru Dev"
        };

        // Путь до папки со скриптом в юнити - Assets/Codebase/UserDataHandler.cs
        sendMessage("UserDataHandler", "ReceiveUserData", JSON.stringify(user));
    }, [sendMessage]);

    // Добавление обработчика события для получения данных из Unity
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