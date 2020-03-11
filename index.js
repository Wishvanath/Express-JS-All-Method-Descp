// to create the server 
// to load the joi module for the input validation
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
// handling the Get Request Method so first define the 
// to define the array of computer courses
const courses = [
    { id: 1, name: 'Java'},
    { id: 2, name: 'Angular JS'},
    { id: 3, name: 'Postgress Sql'},
];
 
app.get('/courses', (req, res) => {
    res.send(courses);
});
// to handle the http post request method
app.post('/courses', (req, res) =>{
    /*... now define the schema to use the Joi obeject 
           schema tells the structure of your data
           structure means (type, lenght, minimum range, etc) 

    ...*/
     
    //input validation for 404 bad request
    if(result.error){
        // 404 bad r equest 
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // create a course function 
    const course = {
        id: courses.length + 1,
        name: req.body.name 
        // here now we have to enable the json object by default it is not enable so 
        // to enable this include this command in top 
        // app.use(express.json()); it's kind of middle ware
    };
        courses.push(course);
        res.send(course);
});
/*...
    To test the the http post request method
    you need to install "postman extension in server"
    search for chrome postman 
...*/
//  use of PUT Request to update the course details 
app.put('/courses/:id',(req, res) => {
    // implement the logic 

    // if not existing, return 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course){ 
    res.status(404).send('The course with given ID is not found');
   } 
      // if invalid, return 400 -Bad request
    const result = validateCourse(req.body);  
    if(result.error){
        // 404 bad r equest 
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);

});
// define the validate the function 
function validateCourse(course){
     // validate
     const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// handle the DELETE Request 
app.delete('/courses/:id', (req, res) => {
    // look up the course
    // not existing , return 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course){ 
    res.status(404).send('The course with given ID is not found');
    return;
   } 
    // Delete 
   const index = courses.indexOf(course);
   courses.splice(index, 1);
    // Return the same course
    res.send(course);

});






app.get('/courses/:id' , (req, res) =>{
    // emplement some logic
   const course= courses.find( c => c.id === parseInt(req.params.id));
   if(!course){ 
    res.status(404).send('The course with given ID is not found');
    return;
   } 
   else{
    res.send(course);
   }
})


 
app.get('/',(req,res) => {
    res.send("This is my First Application");
});
// '/' represent the root url

//  to fetch the data from url in array of number format 
app.get('/api/courses' , (req,res) =>{
    res.send([1,2,3,4,5]);
})
/*... Route Parameters 
    in above example we set the url '/api/courses' for the no of courses 
    so what if my endpoint is like this '/api/courses/a' to implement this
    idea see the below expample -
...*/
app.get('/api/courses/:id', (req,res) => {
    // now request to listen the particular id we need to request the params.id
    res.send(req.params.id);
});

// Anohter example of route parameter
app.get('/friends', (req, res) =>{
    res.send([
        "Monika",
        "harika",
        "Sankar",
        "Aakash",
        "Khagesh"
    ])
});
// to create route parameters for the friends
app.get('/friends/:name', (req,res) =>{
    res.send(req.params.name);
})

// set the multiple parameter in your route to bulid a complex application
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
})



app.get('/helloworld', (req, res) =>{
    res.send("Hello world");
})

// to assign the port no dynamically  because when you will host the application your port no
// will assing dynamically so you need to change here
// express js gives the environment variable called port to assign the port no dynamically.
// PORT
const port = process.env.PORT || 3000; 
/*....
NOTE- here process is the global object  and it has the propety called env(environment) 
    and after that we are adding here name of he environment variable which is PORT
    if it is set then port no will assing automatically if it is not 
    then port no will assign 3000.
    Now make some changes in app.listen method(port, () => console.log("Listening port on ${port}"));
    instead of "" in console.log("") use single back tag (`........`);
....*/
