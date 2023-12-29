# we.bloom

- Tech Stack: React, TypeScript, Google Firebase Realtime Database
- Others: React Bootstrap, Mapbox

[we.bloom](https://we-bloom.onrender.com) is a self-service website enabling business owners to showcase their products online without the need to understand the technicalities behind it. The main functionality is a UI to perform CRUD operations on data hosted on Google Firebase Realtime Database.

## Data Structure
A one-to-many relationship between category and service. Each service falls under a single category while each category can hold multiple services. Each service data holds an array of details objects.

<img width="554" alt="Screenshot 2023-12-29 at 2 45 41 PM" src="https://github.com/Huiling97/we.bloom/assets/71744836/ab3fa48e-0800-4bac-b496-211f4e1305bf">

## Key Reature - CRUD Operations
A UI for users to manage their all business offerings.

### Create
Category and service data has separate reference paths.

- Category reference path
```js
set(ref(database, 'categories/' + formData.name), data);
```

Every service is tied to a category through the `dropdownOption` field which holds the list of all available categories.
- Service reference path
```js
set(ref(database, 'services/' + dropdownOption), updatedData);
```
<img width="1257" alt="Screenshot 2023-12-29 at 5 42 52 PM" src="https://github.com/Huiling97/we.bloom/assets/71744836/224d8f2b-775f-48d0-b872-dd225383f243">

### Read
Use for displaying list of categories and services on the `/home` and `/services` page. Data from Firebase will only be fetched when the component first mounts. Subsequently, data is read from the category and service context providers to limit the number of calls made to Firebase.

https://github.com/Huiling97/we.bloom/assets/71744836/693686d0-34f0-4cfe-8b25-c90ba646b342

### Update
If data matching the unique ID is found, the existing data in Firebase will be overwritten by using the existing database reference path. A pre-populated form will also be displayed through the use of modal context provider which determines if the user is updating a piece of data or not.

<img width="1189" alt="Screenshot 2023-12-29 at 5 45 00 PM" src="https://github.com/Huiling97/we.bloom/assets/71744836/c43972d6-206b-4911-8912-b78bad165cdf">

### Delete
To uphold the one-to-many relationship, when a category is deleted, all associated services will be removed as well. The inverse is not true. In the code below, by passing null into the database reference path, it deletes all associated data on Firebase.

```js
set(ref(database, 'categories/' + name), null);
set(ref(database, 'services/' + name), null);
```

<img width="1195" alt="Screenshot 2023-12-29 at 5 47 47 PM" src="https://github.com/Huiling97/we.bloom/assets/71744836/4b828ba0-7502-4b89-8c81-b3e2edd52958">


## Challenges & Learnings

### Data Structure
The data structure presented above was made based on the needs of my application. 

While there were thoughts of nesting service data within category data and vice versa, it is necessary given that my application has no use case which serves both data to the user at the concurrently. 
Choosing between an object and array structure was also easy given that my application aims to present only specific data each time. Looping through an array was simply inefficient.

Utimately, I settled on a data structure where category and service data are saved in separate paths, allowing for separate calls to be made to retrieve the desired data, keeping the application responsive and fast.

### State Management
The main difficulty faced was managing the state of the details data, struggling between reading from the array of details data and a single detail object from each service data.

To resolve this, I created another context provider dedicated to managing the details array instead of relying on its parent - the service context provider

To simplify things further, I adopted an approach which only allows users to add a new field if all the other existing fields are populated. This prevents complexities such as identifying which of the multiple fields were changing and which duration-price pair were tied together all while maintaining the purpose of the component.

## Future Enhancements

### OTP Verification
As part of early development to prevent deletion of data by users, verification is required before deletion goes through. Moving forward, I will be adopting the use of OTP for verification purposes where only admins are able to access the page for performing changes to data.

### Improving user experience
Despite having accomplished the main purpose of the application, there can be confusion surrounding the purpose of each form input field. For instance, under the category data, the description field is used in the banner component while the name field is used in the card component.
To improve clarity, a possible approach can be to display the banner component and reflect the value change dynamically.
