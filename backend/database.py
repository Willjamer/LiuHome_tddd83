from flask import jsonify
from flask_jwt_extended import create_access_token
from extensions import db, bcrypt
import datetime
import traceback
import itertools
import characters
import logging

logging.basicConfig(level=logging.DEBUG)

db 

class Apartment(db.Model):
    apartment_id    = db.Column(db.Integer, primary_key = True)
    user_id         = db.Column(db.Integer, db.ForeignKey("user.sso_id"), unique = True, nullable = False)
    title           = db.Column(db.String, nullable = False)
    description     = db.Column(db.String, nullable = True)
    address         = db.Column(db.String, nullable = False)
    size            = db.Column(db.Float, nullable = False)
    number_of_rooms = db.Column(db.Integer, nullable = False)
    location        = db.Column(db.String, nullable = False)
    rent_amount     = db.Column(db.Integer, nullable = False)
    is_available    = db.Column(db.Boolean, nullable = False, default = True)
    available_from  = db.Column(db.Date, nullable = True)
    # Något här om images, vet ej än hur

    all_locations = ["Ryd", "Valla", "Irrblosset", "T1", "Lambohov", "Gottfridsberg"]

    def __repr__(self):
        return f"<Apartment {self.apartment_id}: {self.title}: {self.description}: {self.address}: {self.size}: {self.number_of_rooms}: {self.location}: {self.rent_amount}: {self.available_from}>"

    def serialize(self):
        return {
            "apartment_id" : self.apartment_id,
            "user_id" : self.user_id,
            "title" : self.title,
            "description": self.description,
            "address": self.address,
            "size": self.size,
            "number_of_rooms": self.number_of_rooms,
            "location": self.location,
            "rent_amount": self.rent_amount,
            "is_available": self.is_available,
            "available_from": self.available_from,

        }
        
#This user class is for the website without SSO-id 
class User(db.Model):
    sso_id    = db.Column(db.Integer, primary_key = True)
    password  = db.Column(db.String, nullable = False)
    name      = db.Column(db.String, nullable = False)
    email     = db.Column(db.String, nullable = False)
    apartment = db.relationship("Apartment", backref = "user", uselist = False)
    listing_expiry_date = db.Column(db.Date, nullable = False) # Vi vår kolla på denna. Vettefan riktigt hur vi ska styra upp det. 

    #Creating a relationship between users and reviews
    created_reviews = db.relationship("Review", foreign_keys = "[Review.reviewer_id]", backref = "reviewer")
    recieved_reviews = db.relationship("Review", foreign_keys = "[Review.reviewed_user_id]", backref = "reviewed_user")

    def __repr__(self):
        return f"<User {self.sso_id}: {self.name}: {self.email}: {self.apartment}>"
    
    def serialize(self):
        return {
            "sso_id": self.sso_id,
            "name": self.name,
            "email": self.email,
            "apartment": self.apartment.serialize(),
            "listing_expiry_date": self.listing_expiry_date
        }
    
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

# Not implemented until after first user test

class Review(db.Model):
    review_id   = db.Column(db.Integer, primary_key = True)
    content     = db.Column(db.String, nullable = True)
    rating      = db.Column(db.Integer, nullable = False)
    review_date = db.Column(db.Date, nullable = False)

    reviewer_id = db.Column(db.Integer, db.ForeignKey("user.sso_id"), nullable = False)
    reviewed_user_id = db.Column(db.Integer, db.ForeignKey("user.sso_id"), nullable = False)

    def __repr__(self):
        return f"<Review {self.review_id}: {self.content}: {self.rating}: {self.review_date}>"
    
    def serialize(self): 
        return {
            "review_id": self.review_id,
            "content": self.content,
            "rating": self.rating,
            "review_date": self.review_date,
        }
    


class Payment(db.Model):
    payment_id   = db.Column(db.String, primary_key = True)
    amount       = db.Column(db.Integer, nullable = False)
    payment_date = db.Column(db.Date, nullable = False)


    def __repr__(self):
        return f"<Payment {self.payment_id} {self.amount} {self.payment_date}>"
    
    def serialize(self):
        return {
            "payment_id": self.payment_id,
            "amount": self.amount,
            "payment_date": self.payment_date,
        }


# Nevermind this
def generate_unique_id(determinator):
    
    match determinator:
        case "user":
            first = "A"
        case "apartment":
            first = "B"
        case "review":
            first = "C"
        case "payment":
            first = "D"

    characters = characters.get_characters()

    unique_strings = set("".join(p) for p in itertools.permutations(characters, 3))


def db_get_all_available_apartments():
    apartments = Apartment.query.filter_by(is_available=True).all()
    if apartments: 
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]})

    return jsonify({'message': 'No available apartments', 'Apartments': []}) 

def db_get_all_apartments():
    apartments = Apartment.query.all()
    logging.info("db get ok")
    if apartments:
        logging.info("apartments ok")
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]}) 
    
def db_filter_by_rent(arrange):
    
    order = Apartment.rent_amount if arrange == "asc" else Apartment.rent_amount.desc()
    apartments = Apartment.query.order_by(order).all()

    if apartments:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]})
    return jsonify({'message': 'No apartments match your preferences', 'Apartments': []})


def db_filter_by_location(locations):
    apartments = Apartment.query.filter(Apartment.location.in_(locations)).all()    

    if apartments:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]})
    return jsonify({'message': 'No apartments match your preferences', 'Apartments': []})


def db_filter_by_size(min, max):
    min = min if min else 0.0
    max = max if max else 1000

    apartments = Apartment.query.filter(Apartment.size >= min, Apartment.size <= max).all()

    if apartments:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]})
    return jsonify({'message': 'No apartments match your preferences', 'Apartments': []})


def db_filter_by_rooms(min, max):
    min = min if min else 0
    max = max if max else 15

    apartments = Apartment.query.filter(Apartment.number_of_rooms >= min, Apartment.number_of_rooms <= max).all()

    if apartments:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]})
    return jsonify({'message': 'No apartments match your preferences', 'Apartments': []})


def db_sort_apartments(apartments, sort_factor, asc):
    match sort_factor:
        case "rent_amount":
            order = apartments.rent_amount
        case "size":
            order = apartments.size

    if not asc:
        order = order.desc()

    return apartments.order_by(order).all()


def db_filtering(rent_interval, size_interval, room_interval, locations, sort_factor, asc):
    
    min_rent, max_rent = rent_interval[0], rent_interval[1]
    min_size, max_size = size_interval[0], size_interval[1]
    min_rooms, max_rooms = room_interval[0], room_interval[1]

    if locations is None:
        locations = Apartment.all_locations

    apartments = Apartment.query.filter(Apartment.rent_amount >= min_rent, 
                                 Apartment.rent_amount <= max_rent, 
                                 Apartment.size >= min_size, 
                                 Apartment.size <= max_size, 
                                 Apartment.number_of_rooms >= min_rooms,
                                 Apartment.number_of_rooms <= max_rooms,
                                 Apartment.location.in_(locations))

    if sort_factor:
        apartments = db_sort_apartments(apartments, sort_factor, asc)
    
    apartments_list = apartments if isinstance(apartments, list) else apartments.all()

    if apartments_list:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments_list]})
    return jsonify({'message': 'No apartments match your preferences', 'Apartments': []})

    
def db_get_specific_apartment(this_apartment_id):
    this_apartment = Apartment.query.get(this_apartment_id)

    new_apartment = Apartment(apartment_id = 9999, user_id = 2, title = "jontes testlägga", description= "en fin lägenhet i linköping", address = "Vallavägen 4B", size = 40, number_of_rooms = 2, location = "Irrblosset", rent_amount = 6000, is_available = True, available_from = datetime.date(2025, 4, 15))

    return jsonify({'apartment' : this_apartment.serialize()})


def db_add_apartment(user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from):
    try:
        new_apartment = Apartment(
            apartment_id = 1000, # Temporary
            user_id = user_id,
            title = title,
            description= description,
            address = address,
            size = size,
            number_of_rooms = number_of_rooms,
            location = location,
            rent_amount = rent_amount,
            is_available = True,
            available_from = available_from,
        )
        db.session.add(new_apartment)
        db.session.commit()

    except Exception as e:
        traceback.print_exc()
    
def db_remove_appartment(this_apartment_id):
    this_apartment = Apartment.query.get(this_apartment_id)

    db.session.remove(this_apartment)
    db.session.commit()
    return jsonify({'message': 'apartment taken down'})

def db_get_user(this_sso_id):
    
    this_user = User.query.get(this_sso_id)
    return jsonify({'user': this_user.serialize()})

def db_add_user(json_data):
    
    try:
        sso_id = json_data.get('sso_id')
        name = json_data.get('name')
        email = json_data.get('email')

        new_user = User(
            sso_id = sso_id,
            name = name,
            email = email,
        )
        
        new_user.set_password(json_data.get('password'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'user created successfully'})
    except Exception as e:
        traceback.print_exc()

def db_login(json_data):
    email = json_data.get('email')
    this_user = User.query.filter_by(email = email).first() #assuming that a user logs in with the email

    if this_user and this_user.check_password(json_data.get('password')):
        access_token = create_access_token(identity = this_user.sso_id)
        return jsonify({'access_token': access_token})
    return jsonify({'message': 'login failed'})

def db_add_review(content, rating, review_date, reviewer, reviewed_user):
    try:
        new_review = Review(
            # review_id = review_id,
            review_id = 1000,
            content = content,
            rating = rating,
            review_date = review_date,
            reviewer = reviewer,
            reviewed_user = reviewed_user
        )
        db.session.add(new_review)
        db.session.commit()
    except Exception as e:
        traceback.print_exc()

# All edit functions are thought to be redone but this should work for now. 
def db_edit_review(review_id, content, rating, review_date):
    
    this_review = Review.query.get(review_id)

    this_review.content = content
    this_review.rating = rating
    this_review.review_date = review_date
    db.session.commit()
    return jsonify({'message': 'review editet successfully'})

def db_delete_review(review_id):
    
    this_review = Review.query.get(review_id)
    if this_review:
        db.session.remove(this_review)
        db.session.commit()
        return jsonify({'message': 'review deleted successfully'}), 200
    
    return jsonify({'error': 'Review not found'}), 404

# We should have something like this if the user doesn't check in for a long time or something

def db_delete_user(this_sso_id):
    
    this_user = User.query.get(this_sso_id)

    db.session.remove(this_user)
    db.session.commit()
