function NewCompany(
    name,
    phone,
    email,
    docType, // CIF-NIF
    docNumber, // String
    zip,
    street,
    city,
    country,
    website,
    logo,
    bio,
    jobOffers, // Array? []
    employes, // Numbers
    socialUrls) { // Array de objectos
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.docType = docType; // CIF-NIF
    this.docNumber = docNumber;// String
    this.zip = zip;
    this.street = street;
    this.city = city;
    this.country = country;
    this.website = website;
    this.logo = logo;
    this.bio = bio;
    this.jobOffers = jobOffers; // Objeto?
    this.employes = employes; // Numbers
    this.socialUrls = socialUrls; // Array de objectos
  }

