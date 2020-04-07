// for reference
// var userSelection = ""; //set this value with a drop down menu ("" means all) default to all
// var center;
// var zoom;

// onclick for showing donation on map
// $(document).on("click", ".map-donation", function() {
//   	var mapLocation = {lat: $(this).parent().parent().data("lat"),lng: $(this).parent().parent().data("lng")};
//   	window.location.replace("/user?lat="+ mapLocation.lat +"&lng=" + mapLocation.lng);
// });

// $(document).on("click", ".viewIcons", function(event) {
//   	switch (event.target.text.trim()) {
//     	case "All":
//       		userSelection = "";
//       		break;
//     	case "Charities":
//       		userSelection = "Charity";
//       		break;
//     	case "Events":
//       		userSelection = "Event";
//       		break;
//     	case "Donations":
//       		userSelection = "Donation";
//       		break;
//     	case "- Food":
//       		userSelection = "Food";
//       		break;
//     	case "- Clothes":
//       		userSelection = "Clothes";
//       		break;
//     	case "- Books":
//       		userSelection = "Books";
//       		break;
//     	case "- Homeware":
//       		userSelection = "Homeware";
//       		break;
//     	case "- Help":
//       		userSelection = "Help";
//       		break;
//     	default:
//       		return userSelection = "";
// 	  }
// 	  if(userSelection === "") {
// 		  $("#selected-filter").text("Filter");
// 	  }
// 	  else {
// 		$("#selected-filter").text(userSelection);
// 	  }
//   	initMap(); //render map again if user changes selection
// });

//ajax call to import location data
// function getMarkers(cb) {
//   	$.get("/api/markers", function(data) {
//   	}).then(function(data) {
//       	//filtering out the user selected options
//       	var donation = data.donation;
//       	donation = donation.filter(function(obj) {
//           	if(userSelection!=="") {
//               	switch (userSelection) {
//                   	case obj.category: 
//                       	return obj;
//                   	case "Donation": 
//                       	return obj;
//                   	default:
//                       	return;
//               	}
//           	}
//           	return obj;
//       	});
//       	var charity = data.charity;
//       	charity = charity.filter(function(obj) {
//           	if(userSelection!=="") {
//               	switch ("Charity") {
//                   	case userSelection: 
//                       	return obj;
//                   	default:
//                       	return;
//               	}
//           	}
//           	return obj;
//       	});
//       	var event = data.event;
//       	event = event.filter(function(obj) {
//           	if(userSelection!=="") {
//               	switch ("Event") {
//                   	case userSelection: 
//                       	return obj;
//                   	default:
//                       	return;
//               	}
//           	}
//           	return obj;
//       	});
//       	var markers = {
//         	donation: donation,
//         	charity: charity,
//         	event: event
//       	}
//       	cb(markers);
//   	});
// }

// function initMap(mapLocation) {
  	// var queryString = window.location.search;
  	// var urlParams = new URLSearchParams(queryString);
  	// var lat = urlParams.get('lat');
  	// var lng = urlParams.get('lng');
  	// var mapLocation = {lat:parseFloat(lat),lng:parseFloat(lng)};

  	// if(!Number.isNaN(mapLocation.lat)||!Number.isNaN(mapLocation.lng)) {
    // 	center = mapLocation;
    // 	zoom = 15;
  	// }
  	// else {
    // 	center = {lat: -26.363, lng: 135.044};
    // 	zoom = 5;
  	// }
  	//renders the whole map and defines the initial zoom level and where to center it on
  	// var styledMapType = new google.maps.StyledMapType(
    //   	[
    //       	{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //       	{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //       	{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    //       	{
	// 			featureType: 'administrative.locality',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#d59563'}]
    //       	},
    //       	{
	// 			featureType: 'poi',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#d59563'}]
	// 		},
	// 		{
	// 			featureType: 'poi.park',
	// 			elementType: 'geometry',
	// 			stylers: [{color: '#263c3f'}]
	// 		},
	// 		{
	// 			featureType: 'poi.park',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#6b9a76'}]
	// 		},
	// 		{
	// 			featureType: 'road',
	// 			elementType: 'geometry',
	// 			stylers: [{color: '#38414e'}]
	// 		},
	// 		{
	// 			featureType: 'road',
	// 			elementType: 'geometry.stroke',
	// 			stylers: [{color: '#212a37'}]
	// 		},
	// 		{
	// 			featureType: 'road',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#9ca5b3'}]
	// 		},
	// 		{
	// 			featureType: 'road.highway',
	// 			elementType: 'geometry',
	// 			stylers: [{color: '#746855'}]
	// 		},
	// 		{
	// 			featureType: 'road.highway',
	// 			elementType: 'geometry.stroke',
	// 			stylers: [{color: '#1f2835'}]
	// 		},
	// 		{
	// 			featureType: 'road.highway',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#f3d19c'}]
	// 		},
	// 		{
	// 			featureType: 'transit',
	// 			elementType: 'geometry',
	// 			stylers: [{color: '#2f3948'}]
	// 		},
	// 		{
	// 			featureType: 'transit.station',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#d59563'}]
	// 		},
	// 		{
	// 			featureType: 'water',
	// 			elementType: 'geometry',
	// 			stylers: [{color: '#17263c'}]
	// 		},
	// 		{
	// 			featureType: 'water',
	// 			elementType: 'labels.text.fill',
	// 			stylers: [{color: '#515c6d'}]
	// 		},
	// 		{
	// 			featureType: 'water',
	// 			elementType: 'labels.text.stroke',
	// 			stylers: [{color: '#17263c'}]
	// 		}
    //     ],
    // 	{
	// 		name: 'Night Mode'
	// 	}
	// );

  	// var map = new google.maps.Map(document.getElementById('map'), {
    // 	zoom: zoom,
    // 	center: center,
    // 	mapTypeControlOptions: { //options for controlling which types the user can use
    //   	mapTypeIds: ['roadmap'] //, 'styled_map'
    // 	}
  	// });

	// adding the custom map style to the mapTypes
	// map.mapTypes.set('styled_map', styledMapType);
	// setting the default map type
	// map.setMapTypeId('roadmap');

  	// var iconBase = 'http://maps.google.com/mapfiles/kml/pal2/';

	// var icons = {
	// 	Food: {
	// 		icon: iconBase + 'icon63.png'
	// 	},
	// 	Homeware: {
	// 		icon: iconBase + 'icon28.png'
	// 	},
	// 	Clothes: {
	// 		icon: iconBase + 'icon57.png'
	// 	},
	// 	Help: {
	// 		icon: iconBase + 'icon7.png'
	// 	},
	// 	Event: {
	// 		icon: iconBase + "icon13.png"
	// 	},
	// 	Charity: {
	// 		icon: iconBase + "icon10.png"
	// 	},
	// 	Books: {
	// 		icon: iconBase + "icon31.png"
	// 	}
	// };

//   //loading the locations from the database query
//   	var mark = function(cb) {
//       	getMarkers(function(data) {
//         	//data is current the object holding information of charities, events and donations
// 			var donation = data.donation;
// 			var charity = data.charity;
// 			var event = data.event;
//           	cb(
//               	donation.map(function(info) {
//                   	var markerlocation = {lat: parseFloat(info.lat), lng: parseFloat(info.lng)}
//                   	return new google.maps.Marker({
//                       	position: markerlocation,
//                       	icon: icons[info.category].icon,
//                       	customInfo: {
//                           	category: info.category,
//                           	description: info.description,
//                           	user: info.User.firstName,
//                           	phone: info.User.phoneNumber,
//                           	email: info.User.email
//                       	}
//                   	});
//               	}),
//           	)
// 			cb(
// 				charity.map(function(info) {
// 					var markerlocation = {lat: parseFloat(info.lat), lng: parseFloat(info.lng)}
// 					return new google.maps.Marker({
// 						position: markerlocation,
// 						icon: icons["Charity"].icon,
// 						customInfo: {
// 							description: info.description,
// 							name: info.name,
// 							phone: info.phoneNumber,
// 							email: info.email
// 						}
// 					});
// 				}),
// 			)
// 			cb(
// 				event.map(function(info) {
// 					var markerlocation = {lat: parseFloat(info.lat), lng: parseFloat(info.lng)}
// 					return new google.maps.Marker({
// 						position: markerlocation,
// 						icon: icons["Event"].icon,
// 						customInfo: {
// 							title: info.title,
// 							description: info.description,
// 							name: info.Charity.name,
// 							phone: info.Charity.phoneNumber,
// 							email: info.Charity.email
// 						}
// 					});
// 				}),
// 			)
// 		});
// 	}

//   	var infowindow = new google.maps.InfoWindow();
  
// 	// Add a marker clusterer to manage the markers and add on click listeners to all of them.
// 	// Await function due to recieving 3 lots of 'data'
// 	async function cluster() {
// 		await mark(function(data){
// 		data.forEach(element => markerCluster.addMarker(element));
// 			for(var x=0; x<data.length; x++) {
// 				if(data[x].customInfo.category){
// 					var marker = data[x];
// 					google.maps.event.addListener(marker, 'click', function() {
// 						var content = this.customInfo;
// 						infowindow.setContent(
// 							"<strong>DONATION</strong>" +
// 							"<br><Strong>Category:</Strong> " + content.category +
// 							"<br><Strong>Description:</Strong> "+ content.description + 
// 							"<br><Strong>Donator:</Strong> " + content.user + 
// 							"<br><Strong>Phone:</Strong> " + content.phone + 
// 							"<br><Strong>Email:</Strong> " + content.email
// 						);
// 						infowindow.open(this.getMap(), this);
// 					});
// 				}
// 				else if (data[x].customInfo.title) { //change to event details later
// 					var marker = data[x];
// 					google.maps.event.addListener(marker, 'click', function() {
// 						var content = this.customInfo;
// 						infowindow.setContent(
// 							"<strong>EVENT</strong>" +
// 							"<br><Strong>Title:</Strong> " + content.title +
// 							"<br><Strong>Description:</Strong> "+ content.description +
// 							"<br><Strong>Charity:</Strong> " + content.name +
// 							"<br><Strong>Phone:</Strong> " + content.phone + 
// 							"<br><Strong>Email:</Strong> " + content.email
// 						);
// 						infowindow.open(this.getMap(), this);
// 					});
// 				}
// 				else {
// 					var marker = data[x];
// 					google.maps.event.addListener(marker, 'click', function() {
// 						var content = this.customInfo;
// 						infowindow.setContent(
// 							"<strong>CHARITY</strong>" +
// 							"<br><Strong>Name:</Strong> " + content.name +
// 							"<br><Strong>Description:</Strong> "+ content.description + 
// 							"<br><Strong>Phone:</Strong> " + content.phone + 
// 							"<br><Strong>Email:</Strong> " + content.email
// 						);
// 						infowindow.open(this.getMap(), this);
// 					});
// 				}
// 			}   
// 		});
// 		var markerCluster = new MarkerClusterer(map, [],
// 			{
// 				imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
// 			}
// 		);
// 	}
// 	cluster();
// }

// export default initMap;