using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;

namespace RimuruDev.Codebase
{
    [DisallowMultipleComponent]
    public sealed class UserDataHandler : MonoBehaviour
    {
        [SerializeField] private TMP_Text userId;
        [SerializeField] private TMP_Text userName;

        [DllImport("__Internal")]
        private static extern void UnityToReact(string message);
        
        public void ReceiveUserData(string json)
        {
            var user = JsonUtility.FromJson<User>(json);

            Debug.Log("User Data Received: " + user.UserId);

            UpdateUserInterface(user);
            
            UnityToReact("Data received in Unity Meow");
        }

        private void UpdateUserInterface(User user)
        {
            userId.text = $"User id: {user.UserId}";
            userName.text = $"User name: {user.UserName}";
        }
    }
}