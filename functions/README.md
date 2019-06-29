# Los Santos Tourist Guide

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Los Santos Tourist Guide is an open api made with Javascript/Typescript that allows you to CRUD tourist endpoints over a fictional city called Los Santos. It is a fictional city of the game series Grand Theft Auto from Rockstar Games. With this API you can:

  - Sign In, Get, Update and Delete an User.
  - Get All or One specific tourist point, besides Update, Delete.


API Base | https://us-central1-los-santos-tourist-guide.cloudfunctions.net/tgapi/

| Models |  |
| ------ | ------ |
| User | Get self data and can manage TouristSpots |
| TouristSpot | Is is managed by a logged in User |

### User Endpoints
| Method | URL | Expects | Returns 
| ------ | ------ | -------- | ------ |
| POST | ```login/``` | ```email: string, password: string``` | returns the authenticated User |
| POST | ```register/``` | ```name: string, email: string, password``` | returns 'new account created' |
| ------ | ------ | ----- | ---- |
| GET | ```user/``` | - | It returns an array of Users |
| POST | ```user/``` | - | It registers an new User |
| GET | ```user/<integer:id>``` | - | It returns the User with the desired Id |
| DELETE | ```user/<integer:id>``` | - | It destroys the User with the desired Id |
| --- | --- | --- | --- |
| POST | ```/user/<integer:id>/promote``` | - | It changes the role of the user from 'app' to 'admin' an new User |
| POST | ```/user/<integer:id>/demote``` | - | It changes the role of the user from 'admin' to 'app' an new User |
| ------ | ------ | ----- | ---- |
| GET | ```/user/<integer:id>/ratings``` | - | return a list of ratings of the User |

### Tourist Spot Endpoints
| Method | URL | Return |
| ------ | ------ | -------- |
| GET | ```spot/``` | It returns an array of TouristSpot.|
| POST | ```spot/``` | It registers an new TouristSpot |
| GET | ```spot/<integer:id>``` | It returns the TouristSpot with the desired Id |
| PATCH | ```spot/<integer:id>``` | It changes and returns the TouristSpot with the desired Id |
| DELETE | ```spot/<integer:id>``` | It destroys the TouristSpot with the desired Id |get /spot/category/:name
| GET | ```spot/category/<string:name>``` | It gets only TouristSpots with desired category name |
| GET | ```spot/<integer:id>/ratings``` | It gets all ratings of a spot |

### Ratings
| Method | URL | Expects | Returns 
| ------ | ------ | -------- | ------ |
| POST | ```rating/``` | idUser:string, idTouristSpot:string, checking:string | Return status(200) OK

### Models Details

* User
	```js
	{
		name: string;
		description: string;
		adjacentStreets: string[];
		pictures(Optional): string[];
		icon: string;
		maxCapacity(Optional): integer;
		ticketPrice: float | 'free';
		allowsPet(Optional): boolean;
		allowsPhotography(Optional): boolean;
		hasMetalDetector(Optional): boolean;
		categories: Categories[];
		accessibilityItems(Optional): Accessibility[];
		businessHours: BusinessHours[];
		coordinates: Coordinates;
		rating(Optional): Rating[];
		ageGroup?: AgeGroup[];
	}
	```

* BusinessHours
	```js
	{
		day:string (This options must be - sun, mon, tue, wed, thu, fry, sat )
		openAt: string - This is the moment that the touristSpot opens
		closeAt: string - This is the moment that the touristSpot closes
	}
	```

* Coordinates
	```js
	{
		lat: double
		lng: double
	}
	```

* Rating
	```js
	{
		checkin: string - Moment that it was Evaluated
		rate: double
		comment(Optional): string
	}
	```

* AgeGroup
	```js
	{
		minAge: integer
		maxAge: integer
		allowed: boolean - Is this age group is allowed or denied ?
	}
	```
    
#### Enums
* Categories (Enum) - Must be one of them:

| Categories |
| ----- |
| SPORT |
| FOOD |
| HEALTH_CARE |
| FUN |
| BUSINESS |
| RACING |
| AVIATION |
| NAUTICAL |
| SOCIALIZING |
| PUBLIC |
| PRIVATE |

* Acessibility (Enum) - Must be one of them:

| Categories |
| ------ |
| ACCESS_RAMP |
| AUDIO_DESCRIPTION |
| MENU_BRAILLE |
| WHELLCHAIR_BATHROOM |

License
----

MIT
