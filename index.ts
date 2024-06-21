
import inquirer from 'inquirer';
class Student {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class Person {
  students: Student[] = [];

  addStudent(obj: Student) {
    this.students.push(obj);
  }
}


const persons = new Person();

const programStart = async (persons: Person) => {
  do {
    console.log('Welcome');

    const answer = await inquirer.prompt({
      type: 'list',
      name: 'select',
      message: 'Who do you want to connect with?',
      choices: ['staff', 'student', 'exit'],
    });
    switch (answer.select) {
      case 'staff':
        console.log('You approach the staff room. Please feel free to ask me any question.');
        break;
      case 'student':
        const studentName = await inquirer.prompt({
          type: 'input',
          name: 'student',
          message: 'Please enter the name of the student you like to interact with'
        });
        const student = persons.students.find((value) => value.name === studentName.student);

        if (!student) {
          const newStudent = new Student(studentName.student);
          persons.addStudent(newStudent);
          console.log(`Hello, I am ${newStudent.name}. It's pleasure to meet you.`);
          console.log('New student added');
          console.log('Current student list:');
          console.log(persons.students);
        } else {
          console.log(`Hello, I am ${student.name}. It's pleasure to meet you.`);
          console.log('Existing student list:');
          console.log(persons.students);
        }
        break;
      case 'exit':
        console.log('Exiting the program.');
        process.exit();
    }
  } while (true);
};
