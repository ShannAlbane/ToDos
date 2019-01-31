# Todos - The todo app

## Rappel des instructions du projet

##### Correction des bugs

Deux bugs à corriger dans le code.

* La faute de frappe :

Au sein de __controller.js__, on trouve une faute lors de l'appel de addItem();
```
Controller.prototype.adddItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}
```

*Correction* :
```
Controller.prototype.addItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}
```
* Conflit potentiel entre deux ID identiques :
Dans __store.js__, la génération des ID mise en place ne vérifie pas si l'ID a déjà été donné. On peut potentiellement rencontrer un bug dans l'application
```
Store.prototype.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		// Generate an ID
	    var newId = ""; 
	    var charset = "0123456789";

        for (var i = 0; i < 6; i++) {
     		newId += charset.charAt(Math.floor(Math.random() * charset.length));
		}

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {

    		// Assign an ID
			updateData.id = parseInt(newId);
    

			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	};
```
*Correction* : On ajoute un boolean et une boucle while qui vont permettre de vérifier si l'ID est unique. Dans le cas contraire, la boucle s'exécute jusqu'à ce qu'il le soit
```
Store.prototype.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () { };

		// Generate an ID
		var newId = "";
		var charset = "0123456789";

		var idUnique = false;

		while (idUnique === false) {

			newId = "";
			for (var i = 0; i < 6; i++) {
				newId += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			idUnique = true;

			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id == newId) {
					idUnique = false;
				}
			}
		}
		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {

			// Assign an ID
			updateData.id = parseInt(newId);


			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	};
```
* Optimisation du code :
Dans __controller.js__, on supprime une boucle *forEach* ainsi que le *console.log* qui alourdisse inutilement le code :
```
Controller.prototype.removeItem = function (id) {
		var self = this;
		var items;
		self.model.read(function(data) {
			items = data;
		});

		items.forEach(function(item) {
			if (item.id === id) {
				console.log("Element with ID: " + id + " has been removed.");
			}
		});

		self.model.remove(id, function () {
			self.view.render('removeItem', id);
		});

		self._filter();
	};
```
Correction : Suppression de la méthode self.model.read() et de items.forEach()
```
Controller.prototype.removeItem = function (id) {
		var self = this;
	
		self.model.remove(id, function () {
			self.view.render('removeItem', id);
		});

		self._filter();
	};
```

