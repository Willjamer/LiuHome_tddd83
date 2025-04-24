from database import * 
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

        user_id = json_data.get('sso_id')

        title = apartment_data.get('title')
        description = apartment_data.get('description')
        address = apartment_data.get('address')
        size = apartment_data.get('size')
        number_of_rooms = apartment_data.get('number_of_rooms')
        location = apartment_data.get('area')
        rent_amount = apartment_data.get('rent_amount')

        available_from_primary = apartment_data.get('available_from')
        available_from = available_from_primary.split('-')
        logging.info(user_id)

        # this_user = db_get_user(user_id).json
        # expiry_date = this_user['user']['listing_expiry_date']

        # Something to check if the user already has a listing to 
        # db_add_apartment(user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from)
        db_add_apartment(apartment_id, user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from)


        return {'message': 'apartment added successfully'}
    
    def remove_apartment(self, json_data):
        apartment_id = json_data
        db_remove_appartment(apartment_id)
        return {'message': 'apartment successfully taken down'}
    
    def filter_apartment(self, json_data):
        rent_interval = json_data.get('priceRange')
        size_interval = json_data.get('sizeRange')
        room_interval = json_data.get('roomRange')
        locations = json_data.get('selectedAreas')
        sort_factor = json_data.get('sortOption')

        if "LowToHigh" in sort_factor or "earliest" in sort_factor:
            asc = True
        elif "HighToLow" in sort_factor or "latest" in sort_factor:
            asc = False
        return db_filtering(rent_interval, size_interval, room_interval, locations, sort_factor, asc)

    def get_user(self, sso_id):
        return db_get_user(sso_id)
    
    def get_user(self, user_id):
        logging.info('hand getus ok')
        return db_get_user(user_id)
    
    def get_logged_in_user(self, json_data):
        return json_data

    def add_user(self, json_data):
        logging.info('json_data', json_data)
        email = str(json_data.get('email'))
        logging.info(email)
        sso_id = str(email.split('@')[0])
        logging.info(sso_id)
        name = str(json_data.get('name'))
        logging.info(name)
        password = json_data.get('password')
        logging.info(password)
        return db_add_user(sso_id, name, password, email)
    
    def update_user_profile(self, json_data):
        logging.info('rh updus ok')
        return db_update_user_profile(json_data)
    
    def login(self, json_data):
        return db_login(json_data) 
    
    def update_user_profile(self, json_data):
        logging.info('rh updus ok')
        return db_update_user_profile(json_data)

    
    def add_review(self, sso_id, json_data):
        content = json_data.get('content')
        liked = json_data.get('liked')
        reviewed_sso_id = sso_id
        reviwer_sso_id = json_data.get('reviewer_id')
        logging.info('rq add review ok')
        db_add_review(content, liked, reviwer_sso_id, reviewed_sso_id)
        return {'message': 'review added'}
    
    def edit_review(self, json_data):
        review_id = json_data.get('review_id')
        content = json_data.get('content')
        rating = json_data.get('rating')

        db_edit_review(review_id, content, rating)
        return {'message': 'review edited'}
    
    def delete_review(self, json_data):
        review_id = json_data.get('review_id')

        db_delete_review(review_id)

        return {'message': 'review deleted.'}

    def get_review(self, json_data):
        review_id = json_data.get('review_id')

        return db_get_review(review_id)

    def check_user(self, email):
        return db_check_SSO_user(email)

