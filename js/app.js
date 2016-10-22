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
	this.clickCount = ko.protectedObservable(0);
	this.name = ko.protectedObservable(data.name);
	this.imgSrc = ko.protectedObservable(data.imgSrc);
	this.attribution = ko.observable(data.imgAttribution);
	this.nicknames = ko.observableArray();
	
	data.nicknames.forEach(function(nickname) {
		 self.nicknames.push(ko.protectedObservable(nickname));
	});

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
		this.clickCount.commit();
	};

	this.showAdmin = ko.observable(false);
	this.setShowAdmin = function() {
		this.showAdmin((self.showAdmin()) ? false : true);
	};

	this.update = function() {
		console.log('readying commits');
		// Handle clickCount being a valid number
		var oldNum = this.clickCount(); // Save old value
		// Check for valid number by trying to coerce a number
		// from the String entered via the form input field
		this.clickCount.commit();
		var possibleNum = parseFloat(this.clickCount());
		// If invalid input is found, revert to old value
		if (typeof possibleNum != 'number' || isNaN(possibleNum)) {
			alert("Please enter a valid number");
			this.clickCount(oldNum);
		}
		else {
			this.clickCount(possibleNum);
		}
		// Update values
		this.clickCount.commit();
		this.name.commit();
		this.imgSrc.commit();
	};

	this.cancel = function() {
		this.clickCount.reset();
		this.name.reset();
		this.imgSrc.reset();
	}
};

//wrapper to an observable that requires accept/cancel
ko.protectedObservable = function(initialValue) {
    //private variables
    var _actualValue = ko.observable(initialValue),
        _tempValue = initialValue;

    //computed observable that we will return
    var result = ko.computed({
        //always return the actual value
        read: function() {
           return _actualValue();
        },
        //stored in a temporary spot until commit
        write: function(newValue) {
             _tempValue = newValue;
        }
    }).extend({ notify: "always" });

    //if different, commit temp value
    result.commit = function() {
        if (_tempValue !== _actualValue()) {
             _actualValue(_tempValue);
        }
    };

    //force subscribers to take original
    result.reset = function() {
        _actualValue.valueHasMutated();
        _tempValue = _actualValue();   //reset temp value
    };

    return result;
};

ko.applyBindings(new ViewModel);