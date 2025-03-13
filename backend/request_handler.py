from .database import * # Temporary
from flask import jsonify
from datetime import date

class courier:
        
    def get_all_apartments():
        
        return get_all_available_apartments()

    def get_specific_apartment(json_data):
        apartment_id = json_data.get('apartment_id')
        return db_get_specific_apartment(apartment_id)

    def add_apartment(json_data): 
        user_id = json_data.get('user_id')
        title = json_data.get('title')
        description = json_data.get('description')
        location = json_data.get('location')
        rent_amount = json_data.get('rent_amount')
        available_from = json_data.get('available_from')

        this_user = db_get_user(user_id).json
        expiry_date = this_user['user']['listing_expiry_date']

        # Something to check if the user already has a listing to 
        db_add_apartment(user_id, title, description, location, rent_amount, available_from)

        return {'message': 'apartment added successfully'}
    
    def remove_apartment_listing(json_data):
        apartment_id = json_data.get('apartment_id')
        remove_appartment(apartment_id)
        return {'message': 'apartment successfully taken down'}
        
    def get_user(json_data):
        sso_id = json_data.get('sso_id')
        return db_get_user(sso_id)
    
    def get_logged_in_user(json_data):
        return json_data

    def add_user(json_data):
        sso_id = json_data.get('sso_id')
        name = json_data.get('name')
        email = json_data.get('email')

        db_add_user(sso_id, name, email)
        return {'message' : 'user created successfully'}
        
    def add_review(json_data):
        content = json_data.get('content')
        rating = json_data.get('rating')
        review_date = json_data.get('review_date')

        db_add_review(content, rating, review_date)
        return {'message': 'review added'}
    
    def edit_review(json_data):
        content = json_data.get('content')
        rating = json_data.get('rating')
        review_date = json_data.get('review_date')

        db_edit_review(content, rating, review_date)
        return {'message': 'review edited'}
    
    def delete_review(json_data):
        review_id = json_data.get('review_id')

        db_delete_review(review_id)

        return {'message': 'review deleted.'}