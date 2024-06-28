using UnityEngine;
using UnityEngine.UI;

namespace RimuruDev.Codebase
{
    [DisallowMultipleComponent]
    public sealed class Game : MonoBehaviour
    {
        private const string ScorePattern = "Score: {0}";

        [SerializeField] private Text text;
        [SerializeField] private Button button;

        private int score;

        private void Awake() => 
            button.onClick.AddListener(OnClick);

        private void OnDestroy() => 
            button.onClick.RemoveListener(OnClick);

        private void OnClick() =>
            text.text = string.Format(ScorePattern, ++score);
    }
}