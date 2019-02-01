### Table of Contents

-   [Todo][1]
    -   [Parameters][2]
-   [Controller][3]
    -   [Parameters][4]
    -   [setView][5]
        -   [Parameters][6]
    -   [showAll][7]
    -   [showActive][8]
    -   [showCompleted][9]
    -   [addItem][10]
        -   [Parameters][11]
    -   [removeItem][12]
        -   [Parameters][13]
    -   [removeCompletedItems][14]
    -   [toggleComplete][15]
        -   [Parameters][16]
    -   [toggleAll][17]
        -   [Parameters][18]
    -   [\_updateCount][19]
    -   [\_filter][20]
        -   [Parameters][21]
    -   [\_updateFilterState][22]
        -   [Parameters][23]
-   [Helpers][24]
    -   [qs][25]
        -   [Parameters][26]
    -   [$on][27]
        -   [Parameters][28]
    -   [$delegate][29]
        -   [Parameters][30]
    -   [$parent][31]
        -   [Parameters][32]
        -   [Examples][33]
    -   [forEach][34]
        -   [Examples][35]
-   [Model][36]
    -   [Parameters][37]
    -   [create][38]
        -   [Parameters][39]
    -   [read][40]
        -   [Parameters][41]
        -   [Examples][42]
    -   [update][43]
        -   [Parameters][44]
    -   [remove][45]
        -   [Parameters][46]
    -   [removeAll][47]
        -   [Parameters][48]
    -   [getCount][49]
        -   [Parameters][50]
-   [Store][51]
    -   [Parameters][52]
    -   [find][53]
        -   [Parameters][54]
        -   [Examples][55]
    -   [findAll][56]
        -   [Parameters][57]
    -   [save][58]
        -   [Parameters][59]
    -   [remove][60]
        -   [Parameters][61]
    -   [drop][62]
        -   [Parameters][63]
-   [Template][64]
    -   [show][65]
        -   [Parameters][66]
        -   [Examples][67]
    -   [itemCounter][68]
        -   [Parameters][69]
    -   [clearCompletedButton][70]
        -   [Parameters][71]
-   [View][72]
    -   [Parameters][73]

## Todo

Sets up a brand new Todo list.

### Parameters

-   `name` **[string][73]** The name of your new to do list.

## Controller

Takes a model and view and acts as the controller between them

### Parameters

-   `model` **[object][74]** The model instance
-   `view` **[object][74]** The view instance

### setView

Loads and initialises the view

#### Parameters

-   `locationHash`
-   `null` **[string][73]** '' | 'active' | 'completed'

### showAll

An event to fire on load. Will get all items and display them in the
todo-list

### showActive

Renders all active tasks

### showCompleted

Renders all completed tasks

### addItem

An event to fire whenever you want to add an item. Simply pass in the event
object and it'll handle the DOM insertion and saving of the new item.

#### Parameters

-   `title`

### removeItem

By giving it an ID it'll find the DOM element matching that ID,
remove it from the DOM and also remove it from storage.

#### Parameters

-   `id` **[number][75]** The ID of the item to remove from the DOM and
    storage

### removeCompletedItems

Will remove all completed items from the DOM and storage.

### toggleComplete

Give it an ID of a model and a checkbox and it will update the item
in storage based on the checkbox's state.

#### Parameters

-   `id` **[number][75]** The ID of the element to complete or uncomplete
-   `completed`
-   `silent` **([boolean][76] \| [undefined][77])** Prevent re-filtering the todo items
-   `checkbox` **[object][74]** The checkbox to check the state of complete
                             or not

### toggleAll

Will toggle ALL checkboxes' on/off state and completeness of models.
Just pass in the event object.

#### Parameters

-   `completed`

### \_updateCount

Updates the pieces of the page which change depending on the remaining
number of todos.

### \_filter

Re-filters the todo items, based on the active route.

#### Parameters

-   `force` **([boolean][76] \| [undefined][77])** forces a re-painting of todo items.

### \_updateFilterState

Simply updates the filter nav's selected states

#### Parameters

-   `currentPage`

## Helpers

### qs

Get element(s) by CSS selector

#### Parameters

-   `selector` **[string][73]** The CSS selector
-   `scope` **[object][74]** The scope tested, or by default the entire document

### $on

Wrap a event listener to an existing element

#### Parameters

-   `target` **[object][74]** The element targeted
-   `type` **[boolean][76]** Blur or Focus
-   `callback` **[function][78]** The callback of the function
-   `useCapture` **[object][74]** useCapture is composed by the type (blur or focus)

### $delegate

Attach a handler to event for all elements that match the selector,
now or in the future, based on a root element

#### Parameters

-   `target` **[object][74]** The element targeted
-   `selector` **[string][73]** The CSS selector to filter the element
-   `type` **[boolean][76]** Blur or Focus
-   `handler` **[function][78]** Callback executed (handler to attach) if the condition is verified

### $parent

Find the element's parent with the given tag name:

#### Parameters

-   `element` **[object][74]** The element targeted
-   `tagName` **[string][73]** The HTML tag to filter

#### Examples

```javascript
$parent(qs('a'), 'div');
        //will returns the <div> who contains <a> element
```

### forEach

Allow for looping on nodes by chaining

#### Examples

```javascript
qsa('.foo').forEach(function () {})
//will returns all elements with the HTML class 'foo'
```

## Model

Creates a new Model instance and hooks up the storage.

### Parameters

-   `storage` **[object][74]** A reference to the client side storage class

### create

Creates a new todo model

#### Parameters

-   `title` **[string][73]?** The title of the task
-   `callback` **[function][78]?** The callback to fire after the model is created

### read

Finds and returns a model in storage. If no query is given it'll simply
return everything. If you pass in a string or number it'll look that up as
the ID of the model to find. Lastly, you can pass it an object to match
against.

#### Parameters

-   `query` **([string][73] \| [number][75] \| [object][74])?** A query to match models against
-   `callback` **[function][78]?** The callback to fire after the model is found

#### Examples

```javascript
model.read(1, func); // Will find the model with an ID of 1
model.read('1'); // Same as above
//Below will find a model with foo equalling bar and hello equalling world.
model.read({ foo: 'bar', hello: 'world' });
```

### update

Updates a model by giving it an ID, data to update, and a callback to fire when
the update is complete.

#### Parameters

-   `id` **[number][75]** The id of the model to update
-   `data` **[object][74]** The properties to update and their new value
-   `callback` **[function][78]** The callback to fire when the update is complete.

### remove

Removes a model from storage

#### Parameters

-   `id` **[number][75]** The ID of the model to remove
-   `callback` **[function][78]** The callback to fire when the removal is complete.

### removeAll

WARNING: Will remove ALL data from storage.

#### Parameters

-   `callback` **[function][78]** The callback to fire when the storage is wiped.

### getCount

Returns a count of all todos

#### Parameters

-   `callback`

## Store

Creates a new client side storage object and will create an empty
collection if no collection already exists.

### Parameters

-   `name` **[string][73]** The name of our DB we want to use
-   `callback` **[function][78]** Our fake DB uses callbacks because in
    real life you probably would be making AJAX calls

### find

Finds items based on a query given as a JS object

#### Parameters

-   `query` **[object][74]** The query to match against (i.e. {foo: 'bar'})
-   `callback` **[function][78]** The callback to fire when the query has
    completed running

#### Examples

```javascript
db.find({foo: 'bar', hello: 'world'}, function (data) {
 // data will return any items that have foo: bar and
 // hello: world in their properties
});
```

### findAll

Will retrieve all data from the collection

#### Parameters

-   `callback` **[function][78]** The callback to fire upon retrieving data

### save

Will save the given data to the DB. If no item exists it will create a new
item, otherwise it'll simply update an existing item's properties

#### Parameters

-   `updateData` **[object][74]** The data to save back into the DB
-   `callback` **[function][78]** The callback to fire after saving
-   `id` **[number][75]** An optional param to enter an ID of an item to update

### remove

Will remove an item from the Store based on its ID

#### Parameters

-   `id` **[number][75]** The ID of the item you want to remove
-   `callback` **[function][78]** The callback to fire after saving

### drop

Will drop all storage and start fresh

#### Parameters

-   `callback` **[function][78]** The callback to fire after dropping the data

## Template

Sets up defaults for all the Template methods such as a default template

### show

Creates an <li> HTML string and returns it for placement in your app.

NOTE: In real life you should be using a templating engine such as Mustache
or Handlebars, however, this is a vanilla JS example.

#### Parameters

-   `data` **[object][74]** The object containing keys you want to find in the
                         template to replace.

#### Examples

```javascript
view.show({
id: 1,
title: "Hello World",
completed: 0,
});
```

Returns **[string][73]** HTML String of an <li> element

### itemCounter

Displays a counter of how many to dos are left to complete

#### Parameters

-   `activeTodos` **[number][75]** The number of active todos.

Returns **[string][73]** String containing the count

### clearCompletedButton

Updates the text within the "Clear completed" button

#### Parameters

-   `completedTodos` **\[type]** The number of completed todos.

Returns **[string][73]** String containing the count

## View

View that abstracts away the browser's DOM completely.
It has two simple entry points:

-   bind(eventName, handler)
    Takes a todo application event and registers the handler
-   render(command, parameterObject)
    Renders the given command with the options

### Parameters

-   `template`

[1]: #todo

[2]: #parameters

[3]: #controller

[4]: #parameters-1

[5]: #setview

[6]: #parameters-2

[7]: #showall

[8]: #showactive

[9]: #showcompleted

[10]: #additem

[11]: #parameters-3

[12]: #removeitem

[13]: #parameters-4

[14]: #removecompleteditems

[15]: #togglecomplete

[16]: #parameters-5

[17]: #toggleall

[18]: #parameters-6

[19]: #_updatecount

[20]: #_filter

[21]: #parameters-7

[22]: #_updatefilterstate

[23]: #parameters-8

[24]: #qs

[25]: #parameters-9

[26]: #on

[27]: #parameters-10

[28]: #delegate

[29]: #parameters-11

[30]: #parent

[31]: #parameters-12

[32]: #examples

[33]: #foreach

[34]: #examples-1

[35]: #model

[36]: #parameters-13

[37]: #create

[38]: #parameters-14

[39]: #read

[40]: #parameters-15

[41]: #examples-2

[42]: #update

[43]: #parameters-16

[44]: #remove

[45]: #parameters-17

[46]: #removeall

[47]: #parameters-18

[48]: #getcount

[49]: #parameters-19

[50]: #store

[51]: #parameters-20

[52]: #find

[53]: #parameters-21

[54]: #examples-3

[55]: #findall

[56]: #parameters-22

[57]: #save

[58]: #parameters-23

[59]: #remove-1

[60]: #parameters-24

[61]: #drop

[62]: #parameters-25

[63]: #template

[64]: #show

[65]: #parameters-26

[66]: #examples-4

[67]: #itemcounter

[68]: #parameters-27

[69]: #clearcompletedbutton

[70]: #parameters-28

[71]: #view

[72]: #parameters-29

[73]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[74]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[75]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[76]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[77]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

[78]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
