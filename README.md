# Orakulas

*Orakulas* is a student project for Vilnius University, Mathematics and Informatics Faculty, Software Engineering discipline.

# Notes

##

Site's address:

    http://localhost/Orakulas/web/app_dev.php/

## Symfony2 tips

### After cloning repository

#### Install vendors

    php bin/vendors install

#### Install assets

    php app/console assets:install web/

### Creating new bundle

While in Orakulas/symfony execute

    php app/console generate:bundle --namespace=Orakulas/FoobarBundle --format=yml

Preferably, please change **Foobar** to something else.

### Clearing cache

    php app/console cache:clear

## Users and hashing

Currently two users are in the database:

  1. **dev** - admin
  2. **dev-user** - simple user

Passwords for both users are the same: **123**

To hash the password, one must concatenate password and salt in such way: **password**{**salt**}

**SHA-512** must be used for hashing
