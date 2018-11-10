// modules
const rp = require('request-promise');

var Analytics, Buildings;

// functions
module.exports = {
	initialize: () => {
		return new Promise((resolve, reject) => {
			getAnalytics = {url: 'http://interview.mapsted.com/RnD/test-analytics.json', json: true};
			getBuildings = {url: 'http://interview.mapsted.com/RnD/test-buildings.json', json: true};
			rp(getAnalytics)
			.then((A) => {
				rp(getBuildings)
				.then((B) => {
					Analytics = A;
					Buildings = B;
					var allData = {Analytics, Buildings};
					resolve(allData);
				})
				.catch(() => {
					console.log("No Building Results Returned");
					reject("No Building Results Returned");
				});
			})
			.catch(() => {
				console.log("No Analytics Results Returned");
				reject("No Analytics Results Returned");
			});
		});
	},

	task1: () => {
		return new Promise((resolve, reject) => {
			// Total purchase costs for Samsung manufacture devices
			var totalPurchase = 0;
			for (var i=0; i < Analytics.length; i++) {
				if (Analytics[i].manufacturer == "Samsung") {
					for (var x=0; x < Analytics[i].usage_statistics.session_infos.length; x++) {
						for (var y=0; y < Analytics[i].usage_statistics.session_infos[x].purchases.length; y++) {
							totalPurchase += 1;
						}
					}
				}
			}
			console.log(totalPurchase);
			resolve(totalPurchase);
		});
	},

	task2: () => {
		return new Promise((resolve, reject) => {
			// Total number of times item (item_id = 47) was purchased
			var totalPurchases = 0;
			for (var i=0; i < Analytics.length; i++) {
				for (var x=0; x < Analytics[i].usage_statistics.session_infos.length; x++) {
					for (var y=0; y < Analytics[i].usage_statistics.session_infos[x].purchases.length; y++) {
						if (Analytics[i].usage_statistics.session_infos[x].purchases[y].item_id == 47) {
							totalPurchases += 1;
						}
					}
				}
			}
			console.log(totalPurchases);
			resolve(totalPurchases);
		});
	},

	task3: () => {
		return new Promise((resolve, reject) => {
			// Total purchase costs for item’s in the category (item_category_id = 7)
			var totalPurchases = 0;
			for (var i=0; i < Analytics.length; i++) {
				for (var x=0; x < Analytics[i].usage_statistics.session_infos.length; x++) {
					for (var y=0; y < Analytics[i].usage_statistics.session_infos[x].purchases.length; y++) {
						if (Analytics[i].usage_statistics.session_infos[x].purchases[y].item_category_id == 7) {
							totalPurchases += 1;
						}
					}
				}
			}
			console.log(totalPurchases);
			resolve(totalPurchases);
		});
	},

	task4: () => {
		return new Promise((resolve, reject) => {
			// Total purchase costs in Ontario
			var totalPurchase = 0;
			for (var i=0; i < Analytics.length; i++) {
				for (var x=0; x < Analytics[i].usage_statistics.session_infos.length; x++) {
					for (var w=6; w <= 12; w++) {
						if (Analytics[i].usage_statistics.session_infos[x].building_id == w) {
							totalPurchase += 1;
						}
					}
				}
			}
			resolve(totalPurchase);
		});
	},

	task5: () => {
		return new Promise((resolve, reject) => {
			// Total purchase costs in Ontario
			var totalPurchase = 0;
			for (var i=0; i < Analytics.length; i++) {
				for (var x=0; x < Analytics[i].usage_statistics.session_infos.length; x++) {
					for (var w=20; w <= 50; w++) {
						if (Analytics[i].usage_statistics.session_infos[x].building_id == w) {
							totalPurchase += 1;
						}
					}
				}
			}
			resolve(totalPurchase);
		});
	},

	task6: () => {
		return new Promise((resolve, reject) => {
			// Building (name or id) that has the most total purchase costs
			var arrayOrganize = [];
			var mostSold = 0;
			for (var i=0; i < 50; i++) {
				arrayOrganize.push(0);
			}
			for (var i=0; i < Analytics.length; i++) {
				for (var x=0; x < Analytics[i].usage_statistics.session_infos.length; x++) {
					arrayOrganize[Analytics[i].usage_statistics.session_infos[x].building_id-1] += Analytics[i].usage_statistics.session_infos[x].purchases.length;
				}
			}
			for (var i=0; i < 50; i++) {
				if (arrayOrganize[mostSold] < arrayOrganize[i]) {
					mostSold = i;
				}
			}
			mostSoldData = {"id": mostSold+1, "count": arrayOrganize[mostSold]};
			resolve(mostSoldData);
		});
	},
}