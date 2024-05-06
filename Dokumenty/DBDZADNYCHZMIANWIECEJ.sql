
CREATE TABLE User (
    id_user int NOT NULL ,
    `id_company` int  ,
    `name` varchar(50)  NOT NULL ,
    `surname` varchar(50)  NOT NULL ,
    `phonenumber` varchar(20)  NOT NULL ,
    `password` varchar(50)  NOT NULL ,
    `email` varchar(255)  NOT NULL ,
    `type` enum('Admin','User','Company')  NOT NULL ,
    PRIMARY KEY (
        `id_user`
    )
);

CREATE TABLE `Company` (
    `id_company` int  NOT NULL ,
    `cp_name` varchar(255)  NOT NULL ,
    `REGON` varchar(9)  NOT NULL ,
    `NIP` varchar(10)  NOT NULL ,
    `postal_code` varchar(20)  NOT NULL ,
    `street` varchar(30)  NOT NULL ,
    `city` varchar(30)  NOT NULL ,
    `house_noumber` varchar(6)  NOT NULL ,
    `cp_type` enum('Deweloper','Bióro nieruchomości')  NOT NULL ,
    PRIMARY KEY (
        `id_company`
    )
);

CREATE TABLE `Property` (
    `id_property` int  NOT NULL ,
    `id_owner` int  NOT NULL ,
    `title` varchar(100)  NOT NULL ,
    `price` decimal(15,2)  NOT NULL ,
    `square_metrage` double  NOT NULL ,
    `finishing_standard` enum('Dom', 'Szeregówka', 'Mieszkanie','inne')  NOT NULL ,
    `market` enum('Wtórny','Pierwotny')  NOT NULL ,
    `publication_date` date  NOT NULL ,
    `p_p_meter` decimal(15,2)  NOT NULL ,
    `sponsored` bool  NOT NULL ,
    PRIMARY KEY (
        `id_property`
    )
);

CREATE TABLE `Favourite` (
    `id_favourite` int  NOT NULL ,
    `id_user` int  NOT NULL ,
    `id_property` int  NOT NULL ,
    PRIMARY KEY (
        `id_favourite`
    )
);

CREATE TABLE `Address` (
    `id_property` int  NOT NULL ,
    `county` varchar(20)  NOT NULL ,
    `region` varchar(20)  NOT NULL ,
    `district` varchar(20)  NOT NULL ,
    `locality` varchar(20)  NOT NULL ,
    `street` varchar(30)  NOT NULL ,
    `postal_code` varchar(20)  NOT NULL ,
    `house_noumber` varchar(6)  NOT NULL ,
    `coordinates` point NOT NULL ,
    PRIMARY KEY (
        `id_property`
    )
);

CREATE TABLE `Inside` (
    `id_property` int  NOT NULL ,
    `id_infrastructure` int  NOT NULL ,
    `nr_rooms` int  NOT NULL ,
    `nr_bathrooms` int  NOT NULL ,
    `basement` bool  NOT NULL ,
    `attic` bool  NOT NULL ,
    `nr_floors` int  NOT NULL ,
    `type_of_heating` enum('Brak','Pompa ciepła','Piec','Piec na eko groszek','Piec gazowy','Ogrzewanie elektryczne','Kolektory słoneczne')  NOT NULL ,
    `condition` enum('Formalności przed','Stan zerowy','Stan surowy otwarty','Stan surowy zamknięty','Prace wykończeniowe','Gotowy')  NOT NULL ,
    `description` text ,
    PRIMARY KEY (
        `id_property`
    )
);

CREATE TABLE `Photo` (
    `id_property` int  NOT NULL ,
    `address_photo` varchar(100)  NOT NULL ,
    `description_photo` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `id_property`
    )
);

CREATE TABLE `Infrastructure` (
    `id_property` int  NOT NULL ,
    `shop_distance` int  NOT NULL ,
    `park_distance` int  NOT NULL ,
    `playground_distance` int NOT NULL ,
    `kindergarden_distance` int NOT NULL ,
    `school_distance` int NOT NULL ,
    `bicycle_rack` bool  NOT NULL ,
    `car_parking_space` bool NOT NULL ,
    PRIMARY KEY (
        `id_property`
    )
);

CREATE TABLE `Balcony` (
    `id_balcony` int  NOT NULL ,
    `id_infrastructure` int  NOT NULL ,
    `balcony_size` double  NOT NULL ,
    PRIMARY KEY (
        `id_balcony`
    )
);

CREATE TABLE `Garage` (
    `id_garage` int NOT NULL ,
    `id_infrastructure` int NOT NULL ,
    `garage_size` double NOT NULL ,
    PRIMARY KEY (
        `id_garage`
    )
);

ALTER TABLE `Company` ADD CONSTRAINT `fk_Company_id_company` FOREIGN KEY(`id_company`)
REFERENCES `User` (`id_company`);

ALTER TABLE `Property` ADD CONSTRAINT `fk_Property_id_owner` FOREIGN KEY(`id_owner`)
REFERENCES `User` (`id_user`);

ALTER TABLE `Favourite` ADD CONSTRAINT `fk_Favourite_id_user` FOREIGN KEY(`id_user`)
REFERENCES `User` (`id_user`);

ALTER TABLE `Favourite` ADD CONSTRAINT `fk_Favourite_id_property` FOREIGN KEY(`id_property`)
REFERENCES `Property` (`id_property`);

ALTER TABLE `Address` ADD CONSTRAINT `fk_Address_id_property` FOREIGN KEY(`id_property`)
REFERENCES `Property` (`id_property`);

ALTER TABLE `Inside` ADD CONSTRAINT `fk_Inside_id_property` FOREIGN KEY(`id_property`)
REFERENCES `Property` (`id_property`);

ALTER TABLE `Photo` ADD CONSTRAINT `fk_Photo_id_property` FOREIGN KEY(`id_property`)
REFERENCES `Property` (`id_property`);

ALTER TABLE `Infrastructure` ADD CONSTRAINT `fk_Infrastructure_id_property` FOREIGN KEY(`id_property`)
REFERENCES `Property` (`id_property`);

ALTER TABLE `Balcony` ADD CONSTRAINT `fk_Balcony_id_infrastructure` FOREIGN KEY(`id_infrastructure`)
REFERENCES `Inside` (`id_infrastructure`);

ALTER TABLE `Garage` ADD CONSTRAINT `fk_Garage_id_infrastructure` FOREIGN KEY(`id_infrastructure`)
REFERENCES `Inside` (`id_infrastructure`);

