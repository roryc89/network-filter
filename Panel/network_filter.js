(function () {

  var harWithContent = [];



  function getHarContent(HarLog) {

    HarLog.entries.forEach(function (entry, index) {

      if (!harWithContent[index]) {

        entry.getContent(function (content) {


          entry.responseBody = content;

          harWithContent.push(entry);

          if (HarLog.entries.length >= harWithContent.length) {

            nfGlobal.filterHar(harWithContent);
          }
        });
      }
    });
  }

  function getNetwork() {
    chrome.devtools.network.getHAR(getHarContent)
  }

  function listenForUserInput() {
    var getNetworkButton = document.querySelector('.get-network');
    getNetworkButton.addEventListener('click', getNetwork);

    document.getElementById('filterByContent').onkeyup =
      document.getElementById('filterByOtherInfo').onkeyup =
        document.getElementById('max').onkeyup =
          document.getElementById('min').onkeyup =
            document.getElementById('pretty').onchange = filterHar;
  }

  function filterHar(){
    nfGlobal.filterHar(harWithContent);
  }

  window.addEventListener('load', listenForUserInput);

})();


