from database import * # Temporary
from flask import jsonify
from datetime import date
import logging

logging.basicConfig(level=logging.DEBUG)

class courier:
        
    def get_all_available_apartments(self):
        logging.info("rq get ok")
        return db_get_all_available_apartments()
    
    def get_all_apartments(self):
        
        return db_get_all_apartments()

    def get_specific_apartment(self, apartment_id):
        try:
            # Hämta lägenheten från databasen baserat på apartment_id
            apartment = Apartment.query.get(apartment_id)
            if not apartment:
                return jsonify({"error": "Apartment not found"}), 404

            # Returnera lägenhetsdata som JSON
            return jsonify(apartment.serialize()), 200
        except Exception as e:
            print(f"Error fetching apartment: {e}")
            return jsonify({"error": "An error occurred"}), 500

    def add_apartment(self, json_data): 
        print(json_data)
        logging.info(json_data)
        # This one  is temporary

        apartment_data = json_data.get('apartment')
        payment_data = json_data.get('payment')
        apartment_id = apartment_data.get('apartment_id')

        user_id = apartment_data.get('user_id')
        title = apartment_data.get('title')
        description = apartment_data.get('description')
        address = apartment_data.get('address')
        size = apartment_data.get('size')
        number_of_rooms = apartment_data.get('number_of_rooms')
        location = apartment_data.get('location')
        rent_amount = apartment_data.get('rent_amount')

        available_from_primary = apartment_data.get('available_from')
        logging.info('available_from:', available_from_primary)
        available_from = available_from_primary.split('-')


        # this_user = db_get_user(user_id).json
        # expiry_date = this_user['user']['listing_expiry_date']

        # Something to check if the user already has a listing to 
        # db_add_apartment(user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from)
        db_add_apartment(apartment_id, user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from)


        return {'message': 'apartment added successfully'}
    
    def remove_apartment(self, json_data):
        apartment_id = json_data.get('apartment_id')
        db_remove_appartment(apartment_id)
        return {'message': 'apartment successfully taken down'}
    
    def filter_apartment(self, json_data):
        rent_interval = (json_data.get('min_rent'), json_data.get('max_rent'))
        size_interval = (json_data.get('min_size'), json_data.get('max_size'))
        room_interval = (json_data.get('min_rooms'), json_data.get('max_rooms'))
        locations = json_data.get('locations')
        sort_factor = json_data.get('sort_factor')
        asc = json_data.get('asc')

        return db_filtering(rent_interval, size_interval, room_interval, locations, sort_factor, asc)

    def get_user_profile(self, json_data):
        sso_id = json_data.get('sso_id')
        return db_get_user(sso_id)
    
    def get_logged_in_user(self, json_data):
        return json_data

    def add_user(self, json_data):
        return db_add_user(json_data)
        
    def login(self, json_data):
        return db_login(json_data) 
    
    def add_review(self, json_data):
        content = json_data.get('content')
        rating = json_data.get('rating')
        review_date = json_data.get('review_date')

        db_add_review(content, rating, review_date)
        return {'message': 'review added'}
    
    def edit_review(self, json_data):
        content = json_data.get('content')
        rating = json_data.get('rating')
        review_date = json_data.get('review_date')

        db_edit_review(content, rating, review_date)
        return {'message': 'review edited'}
    
    def delete_review(self, json_data):
        review_id = json_data.get('review_id')

        db_delete_review(review_id)

        return {'message': 'review deleted.'}