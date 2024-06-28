mergeInto(LibraryManager.library, {
    UnityToReact: function(messagePtr) {
        var message = Pointer_stringify(messagePtr);
        console.log("Received message from Unity:", message);
        if (typeof window.UnityToReact === 'function') {
            window.UnityToReact(message);
        }
    }
});