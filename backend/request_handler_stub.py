from flask import jsonify

class courier:

    #Fetch DB
    def get_all_appartments(self):

        item = {
            
            "id": "1234",
            "ownerUserID": "1",
            "Address": "Vallavägen 6",
            "City": "Linköping",
            "State": "Östergötland",
            "Description": "En lägenhet i Linköping",
            "NumRooms": 1,
            "SquareFootage": 30
 
        }
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