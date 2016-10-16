var initialCats = [
	{
		name: 'Anton',
		imgSrc: 'img/anton.png',
		imgAttribution: '',
		nicknames: ['Anderson Cooper', 'A-Rod', 'Rowdy, Roddy Anton']
	},
	{
		name: 'Jeff',
		imgSrc: 'img/jeff.png',
		imgAttribution: '',
		nicknames: ['Jarf', 'J Money', 'J Dilla']
	},
	{
		name: 'Joey',
		imgSrc: 'img/joey.png',
		imgAttribution: '',
		nicknames: ['Space Pimp', 'J Saxaphone', 'J Saxapahaw']
	},
	{
		name: 'Maurice',
		imgSrc: 'img/maurice.png',
		imgAttribution: '',
		nicknames: ['Mo Money', 'MoJo', 'Monday Morning']
	},
	{
		name: 'Paul',
		imgSrc: 'img/paul.png',
		imgAttribution: '',
		nicknames: ['Pretty Paul', 'Peepers Creepers', 'PB&J']
	},
	{
		name: 'Randy',
		imgSrc: 'img/randy.png',
		imgAttribution: '',
		nicknames: ['Remington Steel', 'Richie Rich', 'Macho Man Randy Savage']
	},
	{
		name: 'Sarah',
		imgSrc: 'img/sarah.png',
		imgAttribution: '',
		nicknames: ['Leg', 'Peg-leg', 'Princess Peach']
	}
];

var Cat = function(data) {
	var self = this;
	this.clickCount = ko.observable(0);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.attribution = ko.observable(data.imgAttribution);
	this.nicknames = ko.observableArray(data.nicknames);

	this.title = ko.computed( function() {
		if (this.clickCount() < 10) {
			return 'New-Born';
		}
		else if (this.clickCount() < 30) {
			return 'Teen';
		}
		else if (this.clickCount() < 40) {
			return 'Angsty Teen';
		}
		else if (this.clickCount() < 60) {
			return 'Suburbanite';
		}
		else if (this.clickCount() >= 60) {
			return 'Elder Statesman';
		}
	}, this);
}

var ViewModel = function() {
	var self = this;

	this.catList = ko.observableArray([]);
	initialCats.forEach(function(catItem) {
		self.catList.push( new Cat(catItem));
	});

	this.currentCat = ko.observable( this.catList()[0] );

	this.setCurrentCat = function(clickedCat) {
		self.currentCat( clickedCat );
	};

	this.incrementCounter = function() {
		this.clickCount(this.clickCount() + 1);
	};
}

ko.applyBindings(new ViewModel);