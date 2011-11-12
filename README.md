# Orakulas

*Orakulas* is a student project for Vilnius University, Mathematics and Informatics Faculty, Software Engineering discipline.

# Notes

## Symfony2 tips

### Creating new bundle

While in Orakulas/symfony execute

    *php app/console generate:bundle --namespace=Orakulas/**Foobar**Bundle --format=yml*

Preferably, please change **Foobar** to something else.

## Users and hashing
Currently two users are in the database:

  1. **dev** - admin
  2. **dev-user** - simple user

Passwords for both users are the same: **123**

To hash the password, one must concatenate password and salt in such way: **password**{**salt**}

**SHA-512** must be used for hashing