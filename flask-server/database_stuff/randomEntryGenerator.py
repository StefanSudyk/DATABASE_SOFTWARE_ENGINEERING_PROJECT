from faker import Faker
from app import db, create_app
from models import *
import random
import requests
fake = Faker()

def add_random_users(num_users):
    for _ in range(num_users):
        name = fake.first_name()
        surname = fake.last_name()
        phone_number = fake.msisdn()[:9]  # Generate a phone number and take only the first 9 characters
        password = fake.password()
        email = fake.email()
        usertype = random.choice(list(UserType))
        
        new_user = User(name=name, surname=surname, phone_number=phone_number,
                        password=password, email=email, usertype=usertype)
        
        if random.choice([True, False]):
            cp_name = fake.company()
            REGON = fake.bothify(text='#########')
            NIP = fake.bothify(text='##########')
            postal_code = fake.postcode()
            street = fake.street_name()
            city = fake.city()
            house_number = fake.building_number()
            cp_type = random.choice(list(Company_Type))
            
            new_company = Company(cp_name=cp_name, REGON=REGON, NIP=NIP, 
                                  postal_code=postal_code, street=street, 
                                  city=city, house_number=house_number, cp_type=cp_type)
            db.session.add(new_company)
            db.session.flush()  
            
            new_user.id_company = new_company.id_company

        db.session.add(new_user)
    db.session.commit()

def get_random_images(num_images=15, width=400, height=400):
    images = []
    for _ in range(num_images):
        url = f'https://picsum.photos/{width}/{height}'
        response = requests.get(url)
        images.append(response.content)
    return images

def add_random_properties(num_properties):
    # Fetch all user IDs from the database
    user_ids = [user.id_user for user in User.query.all()]
    # Fetch 15 random images
    images = get_random_images()
    
    for _ in range(num_properties):
        id_owner = random.choice(user_ids)  # Randomly select a user ID
        title = fake.sentence(nb_words=6)
        price = round(random.uniform(100000, 1000000), 2)
        square_metrage = round(random.uniform(50, 300), 2)
        finishing_standard = random.choice(list(Finishing_standard))
        market = fake.word()
        publication_date = fake.date_this_year()
        p_p_meter = round(price / square_metrage, 2)
        sponsored = random.choice([True, False])

        new_property = Property(
            id_owner=id_owner, title=title, price=price, square_metrage=square_metrage,
            finishing_standard=finishing_standard, market=market,
            publication_date=publication_date, p_p_meter=p_p_meter, sponsored=sponsored
        )
        db.session.add(new_property)
        db.session.flush()  # Ensure new_property.id_property is populated

        address = Address(
            id_property=new_property.id_property, county=fake.word(), region=fake.word(),
            district=fake.word(), locality=fake.city()[:20],  # Truncate to 20 characters
            street=fake.street_name(), postal_code=fake.postcode(),
            house_number=fake.building_number(), coordinates=random.randint(10000, 99999)
        )
        db.session.add(address)

        photo = Photo(
            id_property=new_property.id_property, address_photo=fake.url(), 
            photo=random.choice(images), description_photo=fake.sentence(nb_words=10)
        )
        db.session.add(photo)

        inside = Inside(
            id_property=new_property.id_property, nr_rooms=random.randint(1, 10), nr_bathrooms=random.randint(1, 3),
            basement=random.choice([True, False]), attic=random.choice([True, False]),
            nr_garages=random.randint(0, 3), nr_balconies=random.randint(0, 2), nr_floors=random.randint(1, 3),
            type_of_heating=random.choice(list(Heatinig)), condition_=random.choice(list(Condition)),
            description=fake.text(max_nb_chars=500)
        )
        db.session.add(inside)

        infrastructure = Infrastructure(
            id_property=new_property.id_property, shop_distance=random.randint(1, 1000),
            park_distance=random.randint(1, 1000), playground_distance=random.randint(1, 1000),
            kindergarden_distance=random.randint(1, 1000), school_distance=random.randint(1, 1000),
            bicycle_rack=random.choice([True, False]), car_parking_space=random.choice([True, False])
        )
        db.session.add(infrastructure)

        # Add a single room to the property
        room = Room(
            id_property=new_property.id_property, room_index=1,
            room_metrage=round(random.uniform(10, 30), 2)
        )
        db.session.add(room)

    db.session.commit()