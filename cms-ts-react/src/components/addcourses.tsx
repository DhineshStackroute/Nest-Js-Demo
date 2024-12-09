import { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { addCourse } from "../servivices/course.service";
import { useFormik } from "formik";
import * as yup from "yup";

const AddCourse = () => {
  // const [course, setCourse]=useState({
  //     cName:"",
  //     cDescription:""
  // });

  // const save=()=>{
  //    console.log("course details");
  //    console.log(course);

  // }
  // const textChange=(event:any)=>{
  //     // setName(event.target.value)
  //     setCourse({
  //         ...course,
  //         [event.target.name]:event.target.value
  //     })
  // }

  // defien the schema for Courses

  const courseSchema = yup.object({
    cName: yup
      .string()
      .required("Field is Required")
      .min(5, "min 5 char req")
      .max(10, "only 10 char allowed"),
    cDescription: yup
      .string()
      .required("Description is Required")
      .min(10,"MIN 10")
      .max(20, "MIN 20"),
  });
  // define a course object using formik

  const courseFormik = useFormik({
    initialValues: {
      cName: "",
      cDescription: "",
    },
    validationSchema: courseSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    //   <Container className="mt-5">
    //   <h1>Add new Course</h1>
    //   <Form className="mt-5" onSubmit={save}>
    //     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
    //       <Form.Label>Name of Course</Form.Label>
    //       <Form.Control name="cName" type="email" placeholder="name@example.com"  onChange={textChange} />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
    //       <Form.Label>Description</Form.Label>
    //       <Form.Control name="cDescription" type="password" placeholder="enter password" onChange={textChange} />
    //     </Form.Group>
    //     <Button type="submit">Add</Button>
    //   </Form>
    // </Container>
    <Container className="mt-5">
      <h1>Add new Course</h1>
      <Form className="mt-5" onSubmit={courseFormik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name of Course</Form.Label>
          <Form.Control
            name="cName"
            type="string"
            placeholder="name of the course"
            onChange={courseFormik.handleChange}
          />
          <Col>
            <p className="text-danger">{courseFormik.errors.cName}</p>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Description</Form.Label>
          <Col>
            <Form.Control
              name="cDescription"
              type="string"
              onChange={courseFormik.handleChange}
            />
          </Col>
          <Col>
            <p className="text-danger">{courseFormik.errors.cDescription }</p>
          </Col>
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </Container>
  );
};

export default AddCourse;
