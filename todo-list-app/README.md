#Todos - The todo app

##Instructions du projet

#####Correction des bugs
Deux bugs à corriger dans le code.
* La faute de frappe :
Au sein de controller.js, on trouve une faute lors de l'appel de addItem();
```	Controller.prototype.adddItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}```

Correction :
```Controller.prototype.addItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}```