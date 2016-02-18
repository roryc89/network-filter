# network-filter
Network filter tab for chrome devtools.

![image](https://cloud.githubusercontent.com/assets/39191/13127005/ffd46afa-d581-11e5-8bd2-aa4c1301be05.png)


##  The problem:
You're receiving a large number of network responses but you only want to to examine one.
Chrome doesn't let you filter network responses by text content so you end up wasting time looking at many to find the one you want.

##  The solution:
Network filter adds a new devtools tab that allows you to filter network responses by text content.
Time saved!

##  Installation:
Clone or download this repo.
Drag and drop the folder onto your chrome extensions page (chrome://extensions).

##  Usage:
Open chrome devtools and you will see a new tab called network filter.
Go to it and click "get network" in the top left. This will get all network requests/responses since devtools was opened.
Type in the filter text input to find the network response you're looking for.
