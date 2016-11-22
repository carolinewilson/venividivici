"use strict";function Router(e,t){e.state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("locationsNew",{url:"/locations/new",templateUrl:"/templates/locationsNew.html",controller:"LocationsNewController as locationsNew"}).state("locationsEdit",{url:"/locations/:id/edit",templateUrl:"/templates/locationsEdit.html",controller:"LocationsEditController as locationsEdit"}).state("home",{url:"/",templateUrl:"/templates/home.html",controller:"LocationsIndexController as locationsIndex"}).state("locationsShow",{url:"/locations/:id",templateUrl:"/templates/locationsShow.html",controller:"LocationsShowController as locationsShow"}).state("budgetPlanner",{url:"/locations/:id/budget",templateUrl:"/templates/budgetPlanner.html",controller:"BudgetPlannerController as budgetPlanner"}).state("budgetTracker",{url:"/trips/:id",templateUrl:"/templates/budgetTracker.html",controller:"BudgetTrackerController as budgetTracker"}).state("profileShow",{url:"/me",templateUrl:"/templates/profileShow.html",controller:"ProfileShowController as profileShow"}).state("adventurersShow",{url:"/adventurer/:id",templateUrl:"/templates/adventurersShow.html",controller:"AdventurersShowController as adventurersShow"}).state("profileEdit",{url:"/me/:id/edit",templateUrl:"/templates/profileEdit.html",controller:"ProfileEditController as profileEdit"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1750924558566461"})}function AdventurersShowController(e,t,o){var r=this;r.user=e.get(t.params,function(e){r.locations=o.query({user:e._id})})}function RegisterController(e,t,o,r,n,i){function a(){e.signup(l.user).then(function(r){o.localStorage.setItem("token",r.data.token);var a=e.getPayload();o.localStorage.setItem("userId",a._id);var c=n.getTrip();return c?(c.user=r.data.user._id,i.save(c,function(){}),t.go("usersShow",{id:r.data.user._id})):(l.err=!1,void t.go("home"))},function(e){console.log(e),l.err=!0})}var l=this;l.user={},l.submit=a}function LoginController(e,t,o,r,n){function i(){e.login(l.credentials).then(function(i){l.err=!1;var a=e.getPayload();o.localStorage.setItem("userId",a._id);var c=r.getTrip();c&&(c.user=i.data.user._id,n.save(c,function(e){return console.log("saved trip! ",e),t.go("budgetTracker",{id:e._id})})),t.go("home")},function(e){console.log(e),l.err=!0})}function a(o){e.authenticate(o).then(function(e){var o=r.getTrip();o&&(o.user=e.data.user._id,n.save(o,function(e){return console.log("saved trip! ",e),t.go("budgetTracker",{id:e._id})})),t.go("home")})}var l=this;l.credentials={},l.authenticate=a,l.submit=i}function BudgetPlannerController(e,t,o,r,n,i,a,l,c){function s(){d.labels=["Flights","Accomodation","Spending Money"],d.data=[d.newTrip.flightCost,d.newTrip.accomCost,d.newTrip.expenses]}function u(){var e=parseFloat(d.newTrip.duration);d.newTrip.returnDate=g(d.newTrip.departDate).add(e,"days").format("YYYY-MM-DD");for(var t=!1,o=0;!t&&o<=31;)n.getPrice(d.newTrip.origin,d.newTrip.destAirportCode,d.newTrip.departDate,d.newTrip.returnDate).then(function(e){var o=e.response.Quotes[0],r=e.response.Carriers[0];return o?(d.newTrip.flightCost=o.MinPrice,d.newTrip.outboundLeg=g(o.OutboundLeg.DepartureDate).format("Do MMM"),d.newTrip.inboundLeg=g(o.InboundLeg.DepartureDate).format("Do MMM"),d.newTrip.carrier=r.Name,t=!0):void(d.newTrip.noFlightsMsg="We can't find flights for these dates. Try a different month.")},function(e){d.newTrip.searchString="Oh dear, there seems to be a problem. Try again later.",console.log(e)}),d.newTrip.departDate=g(d.newTrip.departDate).add(1,"days").format("YYYY-MM-DD"),d.newTrip.returnDate=g(d.newTrip.returnDate).add(1,"days").format("YYYY-MM-DD"),d.newTrip.accomCost=30*d.newTrip.duration,d.newTrip.expenses=50*d.newTrip.duration,o++}function p(){d.newTrip.totalCost=d.newTrip.flightCost+d.newTrip.expenses+d.newTrip.accomCost-d.newTrip.totalSavings,d.newTrip.location=d.location._id;var e=d.isLoggedIn();e?(d.newTrip.user=l.localStorage.getItem("userId"),t.save(d.newTrip,function(e){r.go("budgetTracker",{id:e._id})})):(a.saveTrip(d.newTrip),r.go("register"))}var d=this,g=l.moment;if(d.isLoggedIn=i.isAuthenticated,d.newTrip={},d.location=e.get(r.params),e.get(r.params,function(e){d.newTrip={origin:"LGW",destination:e.closestAirport,destAirportCode:e.airportCode,suggestedDate:e.bestTime,duration:7,totalSavings:0}}),d.isLoggedIn()){var f=i.getPayload()._id;o.get({id:f},function(e){var t=e.preferredAirportCode;d.newTrip.origin=t})}c.$watchGroup([function(){return d.newTrip.flightCost},function(){return d.newTrip.accomCost},function(){return d.newTrip.expenses}],function(){s()}),d.newTrip.totalCost=d.newTrip.flightCost+d.newTrip.expenses+d.newTrip.accomCost-d.newTrip.totalSavings,d.createTrip=p,d.getFlights=u}function BudgetTrackerController(e,t,o,r){function n(){var e=s(),t=s(c.trip.departDate),o=t.diff(e,"days"),r=o/7;c.timeFromNow=s(t).from(e),c.weeklySavingGoal=Math.ceil((c.trip.flightCost+c.trip.expenses+c.trip.accomCost-c.trip.totalSavings)/r)}function i(){return c.pcSaved=c.trip.totalSavings/(c.trip.flightCost+c.trip.expenses+c.trip.accomCost)*100,Math.ceil(c.pcSaved)}function a(){c.labels=["Flights","Accomodation","Spending Money"],c.data=[c.trip.flightCost,c.trip.accomCost,c.trip.expenses]}function l(){e.update({id:c.trip._id},c.trip,function(){i()})}var c=this,s=r.moment;c.trip=e.get(t.params,function(){c.pcSaved=c.trip.totalSavings/(c.trip.flightCost+c.trip.expenses+c.trip.accomCost)*100,n()}),o.$watch(function(){return c.trip.totalSavings},function(){n()}),o.$watchGroup([function(){return c.trip.flightCost},function(){return c.trip.accomCost},function(){return c.trip.expenses}],function(){a(),n()}),c.save=l,c.calcPcSaved=i}function carousel(e,t){return{restrict:"E",replace:!0,templateUrl:"templates/carousel.html",scope:{images:"=",delay:"="},link:function(o,r){function n(e){if(u.length){g=!0,a();var t=u.eq(e),o=p.eq(e);t.addClass("active").css({left:0,zIndex:1}),t.on("transitionend WebkitTransitionEnd",function(){u.css({left:"100%"}),t.removeClass("active").css({left:0,zIndex:0}),p.removeClass("active"),o.addClass("active"),g=!1,i()})}}function i(){return!d&&void(d=e(c,o.delay))}function a(){return!!d&&(e.cancel(d),void(d=null))}function l(e){g||(o.currentIndex=e)}function c(){g||(o.currentIndex=o.currentIndex===u.length-1?0:o.currentIndex+1)}function s(){g||(o.currentIndex=0===o.currentIndex?u.length-1:o.currentIndex-1)}o.currentIndex=0;var u=[],p=[],d=null,g=!1;r.ready(function(){u=angular.element(r[0].querySelectorAll("li.image")),p=angular.element(r[0].querySelectorAll("nav li")),u.css({left:"100%",zIndex:0}),u.eq(0).css({left:0,zIndex:1}),p.eq(0).addClass("active"),i()}),r.on("mouseenter",a).on("mouseleave",i),angular.element(t).on("blur",a).on("focus",i),o.go=l,o.next=c,o.prev=s,o.$watch("currentIndex",n),o.$on("$destroy",a)}}}function FlightService(e){function t(t,o,r,n){return e({method:"GET",url:"/flights",params:{origin:t,destination:o,departDate:r,returnDate:n}}).then(function(e){return e.data},function(e){console.log(e)})}this.getPrice=t}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map"></div>',scope:{center:"="},link:function(t,o){t.$watch("center",function(r){if(r&&r.lat&&r.lng){var n=new e.google.maps.Map(o[0],{center:t.center,zoom:12,disableDefaultUI:!0,zoomControl:!0,scaleControl:!0,scrollwheel:!1});new e.google.maps.Marker({position:t.center,map:n})}})}}}function inputRevealer(e){return{restrict:"E",replace:!0,templateUrl:"templates/inputRevealer.html",scope:{type:"@",name:"@",ngModel:"=",onSubmit:"&"},link:function(t,o){o.on("click",function(){t.isEditing||(t.isEditing=!0,e(function(){o[0].querySelector("input").select()},0)),t.$apply()}).on("keydown",function(e){9!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),t.onSubmit(),t.isEditing=!1,t.$apply())})}}}function Location(e){return new e("/locations/:id",{id:"@_id"},{update:{method:"PUT"}})}function LocationsIndexController(e){var t=this;t.all=e.query(),console.log(t)}function LocationsNewController(e,t,o){function r(){var r=n.location.airport.split(",");n.location.closestAirport=r[0],n.location.airportCode=r[1],n.location.images=[n.location.tempImage.one,n.location.tempImage.two,n.location.tempImage.three,n.location.tempImage.four,n.location.tempImage.five],n.location.user=o.getPayload()._id,e.save(n.location,function(e){t.go("locationsShow",{id:e._id})})}var n=this,i=o.getPayload()._id;n.location={tempImage:{}},n.location.user=i,n.createLocation=r}function LocationsEditController(e,t){function o(){if(r.location.airport){var o=r.location.airport.split(",");r.location.closestAirport=o[0],r.location.airportCode=o[1]}r.location.images=[r.location.images[0],r.location.images[1],r.location.images[2],r.location.images[3],r.location.images[4]],e.update({id:r.location._id},r.location,function(){t.go("locationsShow",t.params)})}var r=this;r.location=e.get(t.params),this.update=o}function LocationsShowController(e,t,o,r){var n=this;e.get(t.params,function(e){n.location=e,n.user=o.query({_id:e.user}),n.center={},r.getCoords(n.location.locationName).then(function(e){n.center=e},function(e){console.log(e)})})}function MainController(e,t,o,r,n){function i(o,r){!e.isAuthenticated()&&l.includes(r.name)&&(o.preventDefault(),t.go("login"))}var a=this;a.isLoggedIn=e.isAuthenticated,a.userId=o.localStorage.getItem("userId");var l=["locationsNew","locationsEdit","budgetTracker","profileShow","profileEdit"];n.$on("$stateChangeStart",i),a.images=[{url:"https://paraphrasinglife.files.wordpress.com/2014/08/no-1-alternative.jpg",caption:"One's destination is never a place, but a new way of seeing things.."},{url:"http://sevennaturalwonders.org/wp-content/uploads/2015/04/rothera111.jpg",caption:"Don't tell how educated you are, tell me how much you travelled"},{url:"http://maupintour.com/wp-content/uploads/2015/10/Historic-Coliseum-Rome-Italy.jpg",caption:"Coliseum"}]}function MapService(e){function t(t){return e({method:"GET",url:"/maps",params:{destination:t}}).then(function(e){return e.data},function(e){console.log(e)})}this.getCoords=t}function ProfileEditController(e,t){function o(){if(r.profile.preferredAirport){var o=r.profile.preferredAirport.split(",");r.profile.preferredAirport=o[0],r.profile.preferredAirportCode=o[1]}e.update({id:r.profile._id},r.profile,function(){t.go("profileShow",t.params)})}var r=this;r.profile=e.get(t.params),this.update=o}function ProfileShowController(e,t,o,r,n,i,a){function l(){r.logout().then(function(){i.localStorage.removeItem("userId"),a.deleteTrip(),t.go("login")})}var c=this,s=r.getPayload();console.log("-->",s),c.profile=e.get({id:s._id},function(e){console.log("user--->",e),c.trips=o.query({userId:e._id}),c.locations=n.query({user:e._id})}),c.logout=l}function Trip(e){return new e("/trips/:id",{id:"@_id"},{update:{method:"PUT"}})}function TripService(e){function t(t){e.localStorage.setItem("tripData",JSON.stringify(t))}function o(){return JSON.parse(e.localStorage.getItem("tripData"))}function r(){return e.localStorage.removeItem("tripData")}this.saveTrip=t,this.getTrip=o,this.deleteTrip=r}function UploadController(){var e=this;e.data={}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UserService(e){function t(t){e.localStorage.setItem("userId",t)}function o(){return e.localStorage.getItem("userId")}this.saveUser=t,this.getUser=o}angular.module("travelApp",["ngResource","ui.router","satellizer","chart.js"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("AdventurersShowController",AdventurersShowController),AdventurersShowController.$inject=["User","$state","Location"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window","User","TripService","Trip"],LoginController.$inject=["$auth","$state","$window","TripService","Trip"],angular.module("travelApp").controller("BudgetPlannerController",BudgetPlannerController),BudgetPlannerController.$inject=["Location","Trip","User","$state","FlightService","$auth","TripService","$window","$scope"],angular.module("travelApp").controller("BudgetTrackerController",BudgetTrackerController),BudgetTrackerController.$inject=["Trip","$state","$scope","$window"],angular.module("travelApp").directive("carousel",carousel),carousel.$inject=["$interval","$window"],angular.module("travelApp").service("FlightService",FlightService),FlightService.$inject=["$http"],angular.module("travelApp").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("travelApp").directive("inputRevealer",inputRevealer),inputRevealer.$inject=["$timeout"],angular.module("travelApp").factory("Location",Location),Location.$inject=["$resource"],angular.module("travelApp").controller("LocationsIndexController",LocationsIndexController),LocationsIndexController.$inject=["Location"],angular.module("travelApp").controller("LocationsEditController",LocationsEditController).controller("LocationsNewController",LocationsNewController),LocationsNewController.$inject=["Location","$state","$auth"],LocationsEditController.$inject=["Location","$state"],angular.module("travelApp").controller("LocationsShowController",LocationsShowController),LocationsShowController.$inject=["Location","$state","User","MapService"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$window","TripService","$rootScope"],angular.module("travelApp").service("MapService",MapService),MapService.$inject=["$http"],angular.module("travelApp").controller("ProfileEditController",ProfileEditController),ProfileEditController.$inject=["User","$state"],angular.module("travelApp").controller("ProfileShowController",ProfileShowController),ProfileShowController.$inject=["User","$state","Trip","$auth","Location","$window","TripService"],angular.module("travelApp").factory("Trip",Trip),Trip.$inject=["$resource"],angular.module("travelApp").service("TripService",TripService),TripService.$inject=["$window"],angular.module("travelApp").controller("UploadController",UploadController),angular.module("travelApp").factory("User",User),User.$inject=["$resource"],angular.module("travelApp").service("UserService",UserService),UserService.$inject=["$window"];
//# sourceMappingURL=app.js.map
