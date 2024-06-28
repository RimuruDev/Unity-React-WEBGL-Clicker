import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityApp() {
    const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
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

        // Путь до папки со скриптом в юнити - Assets/Codebase/UserDataHandler.cs
        // Главное не забыть вырубить strippint level в minimal так как юнька может вырезать метод ReceiveUserData и тогда пиши пропало)
        sendMessage("UserDataHandler", "ReceiveUserData", JSON.stringify(user));
    }, [sendMessage]);

    // Добавление обработчика события для получения данных из Unity
    // В консольке браузера можно глянуть
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