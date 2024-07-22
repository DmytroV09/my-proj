// Function to convert text to leet speak
function toLeetSpeak(text) {
    const leetDict = {'a': '4', 'e': '3', 'i': '1', 'o': '0', 't': '7', 's': '5', 'g': '6'};
    return text.split('').map(char => leetDict[char.toLowerCase()] || char).join('');
  }
  
  // Function to convert leet speak back to normal text
  function fromLeetSpeak(leetText) {
    const normalDict = {'4': 'a', '3': 'e', '1': 'i', '0': 'o', '7': 't', '5': 's', '6': 'g'};
    return leetText.split('').map(char => normalDict[char] || char).join('');
  }
  
  // Event handlers for buttons
  function convertToLeetSpeak() {
    const inputText = document.getElementById('inputText').value;
    const leetText = toLeetSpeak(inputText);
    document.getElementById('outputText').value = leetText;
  }
  
  function convertFromLeetSpeak() {
    const leetText = document.getElementById('inputText').value;
    const normalText = fromLeetSpeak(leetText);
    document.getElementById('outputText').value = normalText;
  }
