document.addEventListener('DOMContentLoaded', function () {

    function getPageName(){
        var path = window.location.pathname;
        var fileNameWithExtension = path.split('/').pop(); // This gets "kitchen.html"
        var fileName = fileNameWithExtension.split('.').shift(); // This gets "kitchen"
        return fileName;
    }

    function getJsonPath(){
        
            const currentPath = window.location.pathname;
            const depth = calculatePathDepth(currentPath);
            let basePath = '';
            for (let i = 0; i < depth; i++) {
                basePath += '../';
            }
            basePath += 'langs/';
            jsonLangFile = basePath + 'lang.json';
            return jsonLangFile;

    }

    function calculatePathDepth(filePath) {
        const matches = filePath.match(/\//g);
        if (matches) {
            return matches.length - 1;
        } else {
            return 0;
        }
    }
    
    function loadLanguageData(callback) {
        fetch(getJsonPath())
            .then(response => response.json())
            .then(data => callback(null, data[getPageName()]))
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
        replaceTextContent(storedLanguage, languageData);
      });







});