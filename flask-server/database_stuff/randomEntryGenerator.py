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



import os
import random
import base64
from faker import Faker
from app import db
from models import User, Property, Address, Photo, Inside, Infrastructure, Room, Finishing_standard, Heatinig, Condition

# Initialize Faker
fake = Faker()

# List of 30 cities in Poland
localities = [
    "Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin",
    "Bydgoszcz", "Lublin", "Białystok", "Katowice", "Gdynia", "Częstochowa",
    "Radom", "Sosnowiec", "Toruń", "Kielce", "Gliwice", "Zabrze", "Olsztyn",
    "Rzeszów", "Rybnik", "Ruda Śląska", "Opole", "Tychy",
     "Elbląg", "Płock"
]
Markets = [
    "Wtórny", "Pierwotny"
]
# List of locality names
counties = [
    "Centrum", "Stare Miasto", "Nowe Miasto", "Nadbrzeże", "Osiedle", "Dzielnica",
    "Wieś", "Przedmieście", "Podgórze", "Śródmieście", "Kamienice", "Bloki",
    "Park", "Rynek", "Plac", "Aleje", "Wzgórze", "Zakątek", "Wybrzeże",
     "Zamek", "Podzamcze", "Kolonia", "Osada", "Zacisze", "Zaułek",
    "Przystań", "Ogrodzenie", "Zielone"
]
descriptions = [
    "Przestronne mieszkanie w Warszawie, idealne dla rodziny. Duży balkon, blisko centrum i komunikacji miejskiej.",
    "Nowoczesne mieszkanie w centrum Krakowa. Wysoki standard wykończenia, w pobliżu parki i restauracje.",
    "Luksusowy apartament w Gdańsku z widokiem na morze. Duży taras, dostęp do prywatnej plaży.",
    "Kameralne mieszkanie w Poznaniu. Świeżo po remoncie, blisko uniwersytetu i parków.",
    "Stylowy loft we Wrocławiu. Przestronne wnętrze, duże okna, świetna lokalizacja w centrum miasta.",
    "Nowoczesny apartament w Katowicach. Duża kuchnia, wysoki standard, w pobliżu centrum handlowego.",
    "Przestronne mieszkanie w Łodzi. Balkon, spokojna okolica, blisko szkół i sklepów.",
    "Komfortowe mieszkanie w Szczecinie. Duży salon, blisko parku i komunikacji miejskiej.",
    "Luksusowy apartament w Sopocie. Widok na morze, dostęp do basenu i siłowni w budynku.",
    "Przytulne mieszkanie w Lublinie. Nowoczesne wnętrze, blisko uczelni i centrów handlowych."
]
regions = [
    "Dolnośląskie",
    "Kujawsko-Pomorskie",
    "Lubelskie",
    "Lubuskie",
    "Łódzkie",
    "Małopolskie",
    "Mazowieckie",
    "Opolskie",
    "Podkarpackie",
    "Podlaskie",
    "Pomorskie",
    "Śląskie",
    "Świętokrzyskie",
    "Warmińsko-Mazurskie",
    "Wielkopolskie",
    "Zachodniopomorskie"
]
def get_local_images(num_images=11, folder='examplePhotos'):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    folder_path = os.path.join(script_dir, folder)
    
    if not os.path.exists(folder_path):
        raise FileNotFoundError(f"Folder {folder_path} does not exist.")
    
    images = []
    image_files = [os.path.join(folder_path, file) for file in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file))]
    
    if not image_files:
        raise FileNotFoundError(f"No image files found in folder {folder_path}.")
    
    for _ in range(num_images):
        img_path = random.choice(image_files)
        with open(img_path, 'rb') as img_file:
            img_data = img_file.read()
            encoded_img = base64.b64encode(img_data).decode('utf-8')
            images.append(encoded_img)
    
    return images

def generate_valid_postal_code():
    return f"{random.randint(10, 99)}-{random.randint(100, 999)}"

def generate_valid_house_number():
    number_part = str(random.randint(1, 999))  # 1 do 3 cyfr
    letter_part = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(0, 2)))  # 0 do 2 liter
    return number_part + letter_part

def add_random_properties(num_properties):
    user_ids = [user.id_user for user in User.query.all()]
    images = get_local_images()
    
    for _ in range(num_properties):
        id_owner = random.choice(user_ids)
        title = fake.sentence(nb_words=5)
        price = round(random.uniform(100000, 1000000), 2)
        square_metrage = round(random.uniform(50, 300), 2)
        finishing_standard = random.choice(list(Finishing_standard))
        market = random.choice(Markets)
        publication_date = fake.date_this_year()
        p_p_meter = round(price / square_metrage, 2)
        sponsored = random.choice([True, False])

        new_property = Property(
            id_owner=id_owner, title=title, price=price, square_metrage=square_metrage,
            finishing_standard=finishing_standard, market=market,
            publication_date=publication_date, p_p_meter=p_p_meter, sponsored=sponsored
        )
        db.session.add(new_property)
        db.session.flush()

        county = random.choice(counties)
        region = random.choice(regions)
        district = fake.word()
        locality = random.choice(localities)
        street = fake.street_name()
        postal_code = generate_valid_postal_code()
        house_number = generate_valid_house_number()
        coordinates = random.randint(10000, 99999)

        address = Address(
            id_property=new_property.id_property, county=county, region=region,
            district=district, locality=locality, street=street, postal_code=postal_code,
            house_number=house_number, coordinates=coordinates
        )

        db.session.add(address)

        photo_data = random.choice(images)
        photo_bytes = base64.b64decode(photo_data)

        photo = Photo(
            id_property=new_property.id_property, address_photo=fake.url(), 
            photo=photo_bytes, description_photo=fake.sentence(nb_words=10)
        )
        db.session.add(photo)

        nr_rooms = random.randint(1, 10)
        nr_bathrooms = random.randint(1, 3)
        basement = random.choice([True, False])
        attic = random.choice([True, False])
        nr_garages = random.randint(0, 3)
        nr_balconies = random.randint(0, 2)
        nr_floors = random.randint(1, 3)
        type_of_heating = random.choice(list(Heatinig))
        condition_ = random.choice(list(Condition))
        description = random.choice(descriptions)

        inside = Inside(
            id_property=new_property.id_property, nr_rooms=nr_rooms, nr_bathrooms=nr_bathrooms,
            basement=basement, attic=attic, nr_garages=nr_garages, nr_balconies=nr_balconies,
            nr_floors=nr_floors, type_of_heating=type_of_heating, condition_=condition_,
            description=description
        )
        db.session.add(inside)

        shop_distance = random.randint(1, 1000)
        park_distance = random.randint(1, 1000)
        playground_distance = random.randint(1, 1000)
        kindergarden_distance = random.randint(1, 1000)
        school_distance = random.randint(1, 1000)
        bicycle_rack = random.choice([True, False])
        car_parking_space = random.choice([True, False])

        infrastructure = Infrastructure(
            id_property=new_property.id_property, shop_distance=shop_distance, park_distance=park_distance,
            playground_distance=playground_distance, kindergarden_distance=kindergarden_distance,
            school_distance=school_distance, bicycle_rack=bicycle_rack, car_parking_space=car_parking_space
        )
        db.session.add(infrastructure)

        room_index = 1
        room_metrage = round(random.uniform(10, 30), 2)

        room = Room(
            id_property=new_property.id_property, room_index=room_index,
            room_metrage=room_metrage
        )
        db.session.add(room)

    db.session.commit()