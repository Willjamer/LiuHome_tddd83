from flask import jsonify
from flask_jwt_extended import create_access_token
from extensions import db, bcrypt
from flask import current_app
# from datetime import datetime
import datetime
import traceback
import itertools
import logging
import uuid

logging.basicConfig(level=logging.DEBUG)

# mail = Mail()

class Apartment(db.Model):
    apartment_id    = db.Column(db.Integer, primary_key = True)
    user_id         = db.Column(db.String, db.ForeignKey("user.sso_id"), unique = True)
    title           = db.Column(db.String, nullable = False)
    description     = db.Column(db.String, nullable = True)
    address         = db.Column(db.String, nullable = False)
    size            = db.Column(db.Float, nullable = False)
    number_of_rooms = db.Column(db.Integer, nullable = False)
    location        = db.Column(db.String, nullable = False)
    rent_amount     = db.Column(db.Integer, nullable = False)
    is_available    = db.Column(db.Boolean, nullable = False, default = True)
    available_from  = db.Column(db.Date, nullable = True)

    user = db.relationship('User', back_populates='apartment')
    
    all_locations = ["Ryd", "Colonia", "Valla", "Lambohov", "T1", "Irrblosset", "Vallastaden", "Ebbepark", "Gottfridsberg", "Skäggetorp", "Berga", "Flamman", "Fjärilen", "City"]

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
            "user": {
                "sso_id": self.user.sso_id,
                "name": self.user.name,
                "email": self.user.email,
                "bio": self.user.bio,
                "program": self.user.program,
                "year": self.user.year,
            } if self.user else None
        }
        
class User(db.Model):

    sso_id    = db.Column(db.String, primary_key = True)
    password  = db.Column(db.String, nullable = True)
    name      = db.Column(db.String, nullable = False)
    email     = db.Column(db.String, nullable = False)
    profile_picture = db.Column(db.String, nullable=True)  # Ex. URL till bilden
    program = db.Column(db.String, nullable=True)          # Ex. "Industriell Ekonomi"
    year = db.Column(db.Integer, nullable=True)            # Årskurs
    bio = db.Column(db.Text, nullable=True)                # Kort presentation

    apartment = db.relationship("Apartment", back_populates = "user", uselist = False)
    created_reviews = db.relationship("Review", foreign_keys = "[Review.reviewer_sso_id]", backref = "reviewer")
    recieved_reviews = db.relationship("Review", foreign_keys = "[Review.reviewed_sso_id]", backref = "reviewed_user")

    def __repr__(self):
        return f"<User {self.sso_id}: {self.name}: {self.email}>"
    
    def serialize(self):
        return {
            "sso_id": self.sso_id,
            "email": self.email,
            "name": self.name,
            "profile_picture": self.profile_picture,
            "program": self.program,
            "year": self.year,
            "bio": self.bio,
            "apartment": self.apartment.serialize() if self.apartment else None,
            "created_reviews": [review.serialize('created') for review in self.created_reviews],
            "recieved_reviews": [review.serialize('received')for review in self.recieved_reviews],
        } 

    
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


class Review(db.Model):
    review_id   = db.Column(db.Integer, primary_key = True)
    content     = db.Column(db.String, nullable = True)
    liked      = db.Column(db.Boolean, nullable = False)
    review_date = db.Column(db.Date, nullable = False)

    reviewer_sso_id = db.Column(db.String, db.ForeignKey("user.sso_id"), nullable = False)
    reviewed_sso_id = db.Column(db.String, db.ForeignKey("user.sso_id"), nullable = False)

    def __repr__(self):
        return f"<Review {self.review_id}: {self.content}: {self.rating}: {self.review_date}>"
    
    def serialize(self, context=None): 
        base = {
            "review_id": self.review_id,
            "content": self.content,
            "liked": self.liked,
            "review_date": self.review_date,
        }

        if context == 'created':
            base["reviewed_user"] = {
                "sso_id": self.reviewed_user.sso_id,
                "name": self.reviewed_user.name,
            }
        elif context == 'received':
            base["reviewer"] = {
                "sso_id": self.reviewer.sso_id,
                "name": self.reviewer.name,
            }
    
        return base
    


class Payment(db.Model):
    payment_id   = db.Column(db.String, primary_key = True)
    amount       = db.Column(db.Integer, nullable = True)
    payment_date = db.Column(db.Date, nullable = False)


    def __repr__(self):
        return f"<Payment {self.payment_id} {self.amount} {self.payment_date}>"
    
    def serialize(self):
        return {
            "payment_id": self.payment_id,
            "amount": self.amount,
            "payment_date": self.payment_date,
        }

def db_get_all_available_apartments():
    apartments = Apartment.query.filter_by(is_available=True).all()
    if apartments: 
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]})

    return jsonify({'message': 'No available apartments', 'Apartments': []}) 

def db_get_all_apartments():
    apartments = Apartment.query.all()
    if apartments:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments]}) 

    return jsonify({'message': 'No available apartments', 'Apartments': []}) 


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

    if locations == []:
        locations = Apartment.all_locations

    apartments = Apartment.query.filter(Apartment.rent_amount >= min_rent, 
                                 Apartment.rent_amount <= max_rent, 
                                 Apartment.size >= min_size, 
                                 Apartment.size <= max_size, 
                                 Apartment.number_of_rooms >= min_rooms,
                                 Apartment.number_of_rooms <= max_rooms,
                                 Apartment.location.in_(locations))


    if sort_factor != '':

        apartments = db_sort_apartments(apartments, sort_factor, asc)
    
    apartments_list = apartments if isinstance(apartments, list) else apartments.all()

    if apartments_list:
        return jsonify({'Apartments': [apartment.serialize() for apartment in apartments_list]})
    return jsonify({'message': 'No apartments match your preferences', 'Apartments': []})

    
def db_get_specific_apartment(this_apartment_id):
    this_apartment = Apartment.query.get(this_apartment_id)
    logging.info('database getspec ok ')
    logging.info(this_apartment)
    return jsonify({'apartment' : this_apartment.serialize()})


# def db_add_apartment(user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from):
def db_add_apartment(apartment_id, user_id, title, description, address, size, number_of_rooms, location, rent_amount, available_from):
    logging.info(apartment_id)
    try:
        new_apartment = Apartment(
            # apartment_id = 1000, # Temporary
            apartment_id = apartment_id,
            user_id = user_id,
            title = title,
            description= description,
            address = address,
            size = size,
            number_of_rooms = number_of_rooms,
            location = location,
            rent_amount = rent_amount,
            is_available = True,
            available_from = datetime.date(int(available_from[0]), int(available_from[1]), int(available_from[2]))
        )

        db.session.add(new_apartment)
        db.session.commit()

    except Exception as e:
        traceback.print_exc()
    
def db_remove_appartment(this_apartment_id):
    this_apartment = Apartment.query.get(this_apartment_id)
    logging.info(this_apartment)
    if (this_apartment):
        db.session.delete(this_apartment)
        db.session.commit()
        return jsonify({'message': 'apartment taken down'})
    else:
        return jsonify({'message': 'Apartment not found'})

def db_get_user(this_sso_id):
    logging.info('db getus ok')
    logging.info(this_sso_id)
    this_user = User.query.get(this_sso_id)
    if this_user:
        logging.info("1")
        logging.info(this_user)
        logging.info("2")

        return jsonify({'user': this_user.serialize()})
    else:
        return jsonify({'message': 'user not found', 'User': []})

def db_add_user(json_data):
    try:
        sso_id = json_data.get('sso_id')
        logging.info(sso_id)
        name = json_data.get('name')
        email = json_data.get('email')
        password = json_data.get('password')

        # FAKE SSO CREATION
        if not sso_id:
            while True:
                sso_id = str(uuid.uuid4().int >> 96)
                if not User.query.get(sso_id):
                    break

        # Check for existing email
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 409

        new_user = User(
            sso_id=sso_id,
            name=name,
            email=email
        )
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'user created successfully', 'sso_id': sso_id})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500

def db_update_user_profile(json_data):
    try:
        logging.info('db updus ok')
        sso_id = json_data.get('sso_id')
        this_user = User.query.get(sso_id)
        if not this_user:
            return jsonify({'error': 'User not found'}), 404

        if 'first_name' in json_data:
            this_user.first_name = json_data.get('first_name')
        if 'last_name' in json_data:
            this_user.last_name = json_data.get('last_name')
        if 'profile_picture' in json_data:
            this_user.profile_picture = json_data.get('profile_picture')
        if 'program' in json_data:
            this_user.program = json_data.get('program')
        if json_data.get('year'):
            try:
                logging.info(json_data.get('year'))
                this_user.year = int(json_data.get('year'))
            except ValueError:
                pass
        if 'bio' in json_data:
            this_user.bio = json_data.get('bio')

        db.session.commit()
        return jsonify({'message': 'User profile updated successfully', 'user': this_user.serialize()})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500


def db_login(json_data):
    email = json_data.get('email')
    this_user = User.query.filter_by(email=email).first()

    if this_user and this_user.check_password(json_data.get('password')):
        access_token = create_access_token(identity=this_user.sso_id)
        return jsonify({
            'access_token': access_token,
            'sso_id': this_user.sso_id
        })
    
    return jsonify({'message': 'login failed'}), 401


def db_add_review(content, liked, reviewer_sso_id, reviewed_sso_id):

    reviewing_user = User.query.get(reviewer_sso_id)
    reviewed_user = User.query.get(reviewed_sso_id)

    if (reviewing_user and reviewed_user):
        try:
            new_review = Review(
                # review_id = review_id,
                # review_id = 1000,
                content = content,
                liked = liked,
                review_date = datetime.today(),
                # reviewer = reviewing_user,
                # reviewed_user = reviewed_user
                reviewer_sso_id = reviewer_sso_id,
                reviewed_sso_id = reviewed_sso_id,
            )
            db.session.add(new_review)
            db.session.commit()
            logging.info('db add review ok')
            return jsonify({'message': 'Review added successfully'})
        except Exception as e:
            traceback.print_exc()
    else:
        return jsonify({'error': 'user not found'}), 423

def db_get_review(review_id):
    this_review = Review.query.get(review_id)
    
    if this_review:
        return jsonify({'review': this_review.serialize()}), 200

def db_update_user_profile(json_data):
    try:
        logging.info('db updus ok')
        sso_id = json_data.get('sso_id')
        this_user = User.query.get(sso_id)
        if not this_user:
            return jsonify({'error': 'User not found'}), 404

        if 'first_name' in json_data:
            this_user.first_name = json_data.get('first_name')
        if 'last_name' in json_data:
            this_user.last_name = json_data.get('last_name')
        if 'profile_picture' in json_data:
            this_user.profile_picture = json_data.get('profile_picture')
        if 'program' in json_data:
            this_user.program = json_data.get('program')
        if json_data.get('year'):
            try:
                logging.info(json_data.get('year'))
                this_user.year = int(json_data.get('year'))
            except ValueError:
                pass
        if 'bio' in json_data:
            this_user.bio = json_data.get('bio')

        db.session.commit()
        return jsonify({'message': 'User profile updated successfully', 'user': this_user.serialize()})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
    
# All edit functions are thought to be redone but this should work for now. 
def db_edit_review(review_id, content, rating):
    
    this_review = Review.query.get(review_id)
    if this_review:
        this_review.content = content
        this_review.rating = rating
        this_review.review_date = datetime.today()
        db.session.commit()
        return jsonify({'message': 'review editet successfully'})
    else:
        return jsonify({'error': 'review editet unsuccessfully'})
        
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


def mark_expired_apartments():
    expired_apartments = Apartment.__table__.update().where(
        Apartment.is_available == True,
        Apartment.expiry_date <= datetime.today()
    ).values(is_available=False)

    db.session.execute(expired_apartments)
    db.session.commit()  # Commit the changes



# @listens_for(Apartment, "before_update")
# def apartment_status_change(mapper, connection, target):
#     """
#     This function runs before an Apartment object is updated.
#     It checks if 'is_available' changed from True to False.
#     If so, it sends an email to the apartment owner.
#     """
#     if target.is_available is False:  # Apartment is no longer available
#         user = User.query.get(target.user_id)  # Fetch the owner
#         if user:
#             send_email(user.email, target.title)  # Call email function

# def send_email(to_email, apartment_title):
#     """
#     Sends an email to notify the apartment owner.
#     """
#     with current_app.app_context():
#         msg = Message(
#             subject="Your Apartment Listing is Now Unavailable",
#             sender="noreply@example.com",
#             recipients=[to_email],
#             body=f"Hello,\n\nYour apartment '{apartment_title}' is now marked as unavailable.\n\nBest,\nYour Website Team"
#         )
#         mail.send(msg)

def db_check_SSO_user(email):
    this_sso_id = email.split('@')[0]
    if User.query.get(this_sso_id):
        return True
    return False

def db_add_SSO_user(email, name):
    try:
        logging.info("db add user")
        sso_id = email.split('@')[0]
        new_SSO_user = User(
            sso_id = sso_id,
            email = email,
            name = name
        )
        db.session.add(new_SSO_user)
        db.session.commit()
        logging.info("db add ok")
    except Exception as e:
        traceback.print_exc()
    return jsonify({'message': 'user added with sso successfully'}), 200


