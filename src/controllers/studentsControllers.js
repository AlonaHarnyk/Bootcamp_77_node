import { Student } from "../models/student.js";
import createHttpError from "http-errors";

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

export const getStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });
  //   const student = await Student.findById(studentId);
  if (!student) {
    next(createHttpError(404, "Student not found!"));
    return;
  }
  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.status(201).json(newStudent);
};

export const deleteStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const deletedStudent = await Student.findOneAndDelete({ _id: studentId });
  if (!deletedStudent) {
    next(createHttpError(404, "Student not found!"));
    return;
  }
  //   const deletedStudent = await Student.findByIdAndDelete(studentId);
  //   res.status(204).end();
  //   res.sendStatus(204);
  //   res.status(200).json({ message: "Student successfully deleted!" });
  res.status(200).json(deletedStudent);
};

export const updateStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    req.body,
    { new: true }
  );
  //   const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, {
  //     new: true,
  //   });
  if (!updatedStudent) {
    next(createHttpError(404, "Student not found!"));
    return;
  }
  console.log(updatedStudent);
  res.status(200).json(updatedStudent);
};
