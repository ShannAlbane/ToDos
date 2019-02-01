# Todos - The todo app

## Rappel des instructions du projet

### Correction des bugs

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
Dans __controller.js__, on supprime une boucle *forEach* ainsi que le *console.log* qui alourdissent inutilement le code :
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

## Tests unitaires

Le projet possédait déjà certains tests, effectués avec le framework Jasmine. <br />
On trouve les tests unitaires dans le dossier test/ControllerSpec.js <br />
Rajout de 10 tests unitaires supplémentaires (identifiable par le commentaire //Test ajouté) : <br />

1. Doit montrer toutes les entrées au démarrage

```	it('should show entries on start-up', function () {
		//Test ajouté
		setUpModel([]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('showEntries', []);
	});
```

2. Doit montrer toutes les entrées actives <br />
Au sein du describe('routing')
```
		it('should show active entries', function () {
			//Test ajouté
			var todo = {id: 42, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('#/active');

			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});
```
3. Doit montrer toutes les entrées complètes <br />
Au sein du describe('routing')
```
		it('should show completed entries', function () {
			//Test ajouté
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);

			subject.setView('#/completed');

			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});
```

4. Doit encadrer par défault le filtre "All"
```
	it('should highlight "All" filter by default', function () {
		//Test ajouté
		setUpModel([]);

		subject.setView('');
		expect(view.render).toHaveBeenCalledWith('setFilter', '');
	});
```

5. Doit encadrer le filtre "Active" quand on passe à la vue active
```
	it('should highlight "Active" filter when switching to active view', function () {
		//Test ajouté
		setUpModel([]);

		subject.setView('#/active');

		expect(view.render).toHaveBeenCalledWith('setFilter', 'active');

	});
```

6. Doit encadrer le filtre "Completed" quand on passe à la vue completed
```
	it('should highlight "Completed" filter when switching to active view', function () {
		//Test ajouté
		setUpModel([]);

		subject.setView('#/completed');

		expect(view.render).toHaveBeenCalledWith('setFilter', 'completed');
	}); 
```

7. Doit cocher toutes les entrées en complétées <br />
Au sein du describe('toggle all')
```
		it('should toggle all todos to completed', function () {
			//Test ajouté
			var todos = [{id: 42, title: 'first todo', completed: false},
						 {id: 43, title: 'second todo', completed: false}];
			setUpModel(todos);

			subject.setView('');

			view.trigger('toggleAll', {completed: true});

			expect(model.update).toHaveBeenCalledWith(42, {completed: true}, jasmine.any(Function));
			expect(model.update).toHaveBeenCalledWith(43, {completed: true}, jasmine.any(Function));
		});
```

8. Doit mettre à jour la vue <br />
Au sein du describe('toggle all')
```
		it('should update the view', function () {
			//Test ajouté
			var todos = [{id: 42, title: 'first todo', completed: false},
						 {id: 43, title: 'second todo', completed: false}];
			setUpModel(todos);

			subject.setView('');

			view.trigger('toggleAll', {completed: true});

			expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: true});
			expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 43, completed: true});
		});
```

9. Doit ajouter une nouvelle todo au model <br />
Au sein du describe('new todo')
```
it('should add a new todo to the model', function () {
			//Test ajouté
			var todo = {id: 42, title: 'existing todo', completed: false}
			setUpModel([todo]);

			subject.setView('');

			view.trigger('newTodo', 'new todo');

			expect(model.create).toHaveBeenCalledWith('new todo', jasmine.any(Function))
		});
```
10. Doit supprimer une entrée du model <br />
Au sein du describe('element removal')
```
it('should remove an entry from the model', function () {
			//Test Ajouté
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemRemove', {id: 42});

			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
		});
```

### Utilisation du site
Le site web Todos permet de créer, de modifier, et de suivre sa todo liste. Chaque entrée dans la todo peut être modifiée, marquée comme complétée, et remise en active. <br />
Par ailleurs, le site garde en mémoire la todo liste jusqu'à la prochaine utilisation. 
