var Cat = function() {
	this.clickCount = ko.observable(0);
	this.name = ko.observable('Tabby');
	this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
	this.attribution = ko.observable('');
	this.nicknames = ko.observableArray([
		'T-bone', 'T-money', 'T-Rex', 'Oedipus', 'Dr. Octagon'
	]);

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
		else if (this.clickCount() >= 40) {
			return 'Elder Statesman';
		}
	}, this);
}

var ViewModel = function() {

	this.currentCat = ko.observable( new Cat() );

	this.incrementCounter = function() {
		this.currentCat().clickCount(this.currentCat().clickCount() + 1);
	};
}

ko.applyBindings(new ViewModel);