from flask import jsonify

class courier:

    # Handle adding an item (already implemented)
    def handle_json_add(self, json_data):
        # Assuming json_data is a dictionary
        Area = json_data.get('area')
        # Optional: You can add validation or checks here for required fields
        if Area:
            return {"message": "Appartment added successfully stub"}, 201  # 201 Created status
        else:
            return {"error": "Missing required fields stub"}, 400  # 400 Bad Request status

    #Fetch DB
    def get_appartment(self):

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
      
    def get_user(self):

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


    def remove_item(self, json_data):
        
        id = json_data.get('id')
        if id:
            return {"message": "Item successfully removed stub"}, 201  # 201 Created status
        else:
            return {"error": "Item not removed (no part_id)"}, 400 # 400 Bad Request status
    
    def edit_item(self, json_data):
        id = json_data.get('id')
        
        response = {}

        if id:
            response["id"] = id

        if response:
            return response
        else:
            return {"message": "No valid data provided"}
