from flask import jsonify
from datetime import date
import logging

class courier:

    #Fetch DB
    def get_all_apartments(self):
        item = [{
            
            "apartment_id": 1234,
            "user_id": 1,
            "title": "chrippas testlägga",
            "description": "En lägenhet i Linköping",
            "address": "Vallavägen 6",
            "size": 30.0,
            "number_of_rooms": 1,
            "location": "Irrblosset",
            "rent_amount": 6000,
            "bathrooms" : 1,
            "is_available": True,
            "available_from": date(2025, 4, 15)
 
        },
        {
            "apartment_id": 5678,
            "user_id": 2,
            "title": "Jontes testlägga",
            "description": "En annan lägenhet i Linköping",
            "address": "Betonggatan 12",
            "size": 90.0,
            "number_of_rooms": 5,
            "location": "T1",
            "rent_amount": 7500,
            "bathrooms" : 2,
            "is_available": True,
            "available_from": date(2025, 5, 20)

        },
        {
            "apartment_id": 9101,
            "user_id": 3,
            "title": "Sannas mysiga etta",
            "description": "Perfekt för en student, nära universitetet.",
            "address": "Studentgatan 4B",
            "size": 25.0,
            "number_of_rooms": 1,
            "location": "Ryd",
            "rent_amount": 4700,
            "bathrooms" : 1,
            "is_available": True,
            "available_from": date(2025, 6, 1)
        },
        {
            "apartment_id": 1121,
            "user_id": 4,
            "title": "Stor lägenhet med balkong",
            "description": "Ljus och fräsch, passar för ett par eller liten familj.",
            "address": "Majgatan 7",
            "size": 70.0,
            "number_of_rooms": 3,
            "location": "Lambohov",
            "rent_amount": 8200,
            "bathrooms" : 2,
            "is_available": False,
            "available_from": date(2025, 8, 1)
        },
        {
            "apartment_id": 3141,
            "user_id": 5,
            "title": "Centralt boende",
            "description": "Gångavstånd till resecentrum och centrum.",
            "address": "Storgatan 1",
            "size": 40.0,
            "number_of_rooms": 2,
            "location": "Innerstaden",
            "rent_amount": 6900,
            "bathrooms" : 1,
            "is_available": True,
            "available_from": date(2025, 4, 5)
        },
        {
            "apartment_id": 5161,
            "user_id": 6,
            "title": "Fridas soliga tvåa",
            "description": "Nyrenoverad tvåa med bra ljusinsläpp.",
            "address": "Solgatan 10",
            "size": 45.0,
            "number_of_rooms": 2,
            "location": "Mjärdevi",
            "rent_amount": 7200,
            "bathrooms" : 1,
            "is_available": True,
            "available_from": date(2025, 7, 10)
        },
        {
            "apartment_id": 7181,
            "user_id": 7,
            "title": "Billig studentetta",
            "description": "Enkel men prisvärd studentlägenhet.",
            "address": "Kårhusgatan 3",
            "size": 20.0,
            "number_of_rooms": 1,
            "location": "Ryd",
            "rent_amount": 4200,
            "bathrooms" : 1,
            "is_available": True,
            "available_from": date(2025, 4, 25)
        },
        {
            "apartment_id": 9202,
            "user_id": 8,
            "title": "Familjevänlig fyrarummare",
            "description": "Stort kök, nära skolor och grönområden.",
            "address": "Familjegatan 9",
            "size": 85.0,
            "number_of_rooms": 4,
            "location": "Berga",
            "rent_amount": 8900,
            "bathrooms" : 3,
            "is_available": False,
            "available_from": date(2025, 10, 1)
        },
        {
            "apartment_id": 1222,
            "user_id": 9,
            "title": "Modern lägenhet vid Campus",
            "description": "Perfekt för studenter, gångavstånd till LiU.",
            "address": "Campusvägen 1A",
            "size": 35.0,
            "number_of_rooms": 1,
            "location": "Valla",
            "rent_amount": 5800,
            "bathrooms" : 1,
            "is_available": True,
            "available_from": date(2025, 5, 5)
        }
        
        ]

        if item:
            return jsonify(item), 200  # Return the found item as JSON
        else:
            return {"error": "Database error!"}, 404  # 404 Not Found status

        # Handle adding an item (already implemented)
    def add_apartment(self, json_data):
        # Assuming json_data is a dictionary
        Area = json_data.get('area')
        # Optional: You can add validation or checks here for required fields
        if Area:
            return {"message": "Appartment added successfully stub"}, 201  # 201 Created status
        else:
            return {"error": "Missing required fields stub"}, 400  # 400 Bad Request status

    def edit_apartment(self, json_data):
        id = json_data.get('id')
        
        response = {}

        if id:
            response["id"] = id

        if response:
            return response
        else:
            return {"message": "No valid data provided"}

    def remove_apartment(self, json_data):
        
        id = json_data.get('id')
        if id:
            return {"message": "Apartment successfully removed stub"}, 201  # 201 Created status
        else:
            return {"error": "Apartment not removed (no apartment_id)"}, 400 # 400 Bad Request status

    def get_user_profile(self):

        item = {
            
            "UserId": "1",
            "PhoneNumber": "0723875864",
            "Bio": "Industriell Ekonomi år 3",
 
        }
        if item:
            return jsonify(item), 200  # Return the found item as JSON
        else:
            return {"error": "Database error!"}, 404  # 404 Not Found status
      
    def get_logged_in_user(self):

        item = {
            
            "Id": "1",
            "SSOId": "123",
            "FirstName": "Christoffer",
            "LastName": "Roempke",
            "Email": "chrro688@student.liu.se"
        }
        if item:
            return jsonify(item), 200  # Return the found item as JSON
        else:
            return {"error": "Database error!"}, 404  # 404 Not Found status
   
    def get_Listing(self, json_data):
        Id = json_data.get('Id')
        if Id:
            item = {
            
                "AppartmentID": "1",
                "ListedByUserId": "1",
                "InterestedUser": "2",
                "Payment": "123",
                "ListingData": "01-01-2025",
                "AvailabilityDate": "01-03-2025",
                "ExpireDate": "02-01-2025",
                "rentCost": 5506
 
        }
            

    #la till detta för att kunna hämta specifik lägenhet /Nils
    def get_specific_apartment(self, json_data):
            item = {
                "apartment_id": 7181,
                "user_id": 7,
                "title": "Billig studentetta",
                "description": "Enkel men prisvärd studentlägenhet.",
                "address": "Kårhusgatan 3",
                "size": 20.0,
                "number_of_rooms": 1,
                "location": "Ryd",
                "rent_amount": 4200,
                "bathrooms" : 1,
                "is_available": True,
                "available_from": date(2025, 4, 25)
        }
            return jsonify(item), 200 

    def add_user(self, json_data):
        sso_id = json_data.get('sso_id')

        if sso_id:
            return {'message': 'User added successfully'}
        else:
            return {"error": "Missing required fields stub (no sso id found)"}, 400  # 400 Bad Request status

    def add_review(self, json_data):
        rating = json_data.get('rating')

        if rating:
            return {'message': 'Review added successfully'}
        else:
            return {"error": "Missing required fields stub (no rating found)"}, 400  # 400 Bad Request status 

    def get_review(self, json_data):
        review_id = json_data.get('review_id')

        if review_id:
            review = {
                "review_id" : 1001,
                "content" : "keff",
                "rating": 1,
                "review_date" : "2025-03-14",
                "reviewer_id" : 1001,
                "reviewed_user_id" : 1002
            }

        if review:
            return jsonify(review), 200

    def edit_review(self, json_data):
        id = json_data.get('id')
        
        response = {}

        if id:
            response["id"] = id

        if response:
            return response
        else:
            return {"message": "No valid data provided"}

    def delete_review(self, json_data):
        review_id = json_data.get('id')
        if review_id:
            return {"message": "Review successfully removed stub"}, 201  # 201 Created status
        else:
            return {"error": "Review not removed (no review_id)"}, 400 # 400 Bad Request status