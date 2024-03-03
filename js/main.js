document.addEventListener('DOMContentLoaded', function () {

    var checkBox = document.getElementById('langSwitch');

    checkBox.addEventListener('change', function() {
        // Check if the checkbox is checked
        if (checkBox.checked) {
            setLanguagePreference('es');
            loadLanguageData(function(error, languageData) {
                if (error) {
                  console.error('Error loading language data:', error);
                  return;
                }
        
                replaceTextContent('es', languageData);
              });
        } else {
            setLanguagePreference('en');
            loadLanguageData(function(error, languageData) {
                if (error) {
                  console.error('Error loading language data:', error);
                  return;
                }
        
                replaceTextContent('en', languageData);
              });
        }
    });
    

    function loadLanguageData(callback) {
        fetch('./langs/lang.json')
            .then(response => response.json())
            .then(data => callback(null, data['home']))
            .catch(error => callback(error, null));
    }

    function replaceTextContent(languageCode, languageData) {
        const data = languageData[languageCode];
        if (data) {


            for (let key in data) {
                // Get the corresponding DOM element by ID
                let element = document.getElementById(key);
                // If the element exists, set its text content to the value from the JSON
                if (element) {
                    element.textContent = data[key];
                }
            }


        }
      }

      loadLanguageData(function(error, languageData) {
        if (error) {
          console.error('Error loading language data:', error);
          return;
        }

        const storedLanguage = localStorage.getItem('language') || 'en';
        if(storedLanguage == 'en'){
          checkBox.checked = false;
        }else if(storedLanguage == 'es'){
          checkBox.checked = true;
        }
        replaceTextContent(storedLanguage, languageData);
      });


      function setLanguagePreference(languageCode) {
        localStorage.setItem('language', languageCode);
      }



    
});