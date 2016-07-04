(function () {

  var harWithContent = [];



  function getHarContent(HarLog) {

    Promise.all(HarLog.entries.map(promisedGetContent))
      .then(() => {
        nfGlobal.filterHar(harWithContent);
      });
  }

  function promisedGetContent(entry, index){

    return new Promise((resolve) => {

      if(!harWithContent[index]){

        entry.getContent(content => {
          entry.responseBody = content;
          entry.lowerCaseBody = content ? content.toLowerCase() : '';
          harWithContent[index] = entry;
          resolve();
        })

      }else{
        resolve();
      }

    })
  }

  function getNetwork() {
    chrome.devtools.network.getHAR(getHarContent)
  }

  function listenForUserInput() {
    var getNetworkButton = document.querySelector('.get-network');
    getNetworkButton.addEventListener('click', getNetwork);

    document.getElementById('apply-filters').addEventListener('click', filterHar);
  }

  function filterHar(){
    nfGlobal.filterHar(harWithContent);
  }

  window.addEventListener('load', listenForUserInput);

})();


