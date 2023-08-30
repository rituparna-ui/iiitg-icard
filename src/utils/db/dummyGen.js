const { faker } = require('@faker-js/faker');
const fs = require('fs');

const years = [19, 20, 21];
const types = [1, 2, 3];
const courses1 = ['CSE', 'ECE'];
const courses2 = ['CSE', 'ECE', 'HSS', 'Math'];
const modes = ['online', 'on-campus'];
const times = ['part-time', 'full-time'];

const seedData = [];

for (let index = 0; index < 2000; index++) {
  console.log(`Index: ${index}`);
  const student = {
    fullName: '',
    bloodGroup: 'A+',
    dateOfBirth: {
      day: 1,
      month: 1,
      year: 2001,
    },
    guardiansName: '',
    emergencyContact: '9218545945',
    holdersContact: '9218545945',
    email: '',
    presentAddress: "Girls' Hostel, IIIT-Guwahati, Bongora, Guwahati-781015",
    permenantAddress:
      'House No. 11/5, Tentulberia, Madhyapara, Near Natunpara Transformer, Rajpur Sonarpur(M), South 24 Parganas, Solapur, Maharashtra. PIN-413002',

    programme: 'B.Tech (CSE)',
    mode: 'N/A',
    roll: '1901173',
    admissionYear: 19,
    type: 1,
  };

  student.fullName = faker.person.fullName();
  student.guardiansName = faker.person.fullName();

  const type = Math.floor(Math.random() * 3);
  if (types[type] == 1) {
    const programme = 'B.Tech';
    const subject = courses1[Math.floor(Math.random() * 2)];
    student.programme = programme + ' (' + subject + ')';
    student.mode = 'N/A';
    const year = years[Math.floor(Math.random() * 3)];
    student.roll =
      year +
      '01' +
      ((index % 999) + 1).toLocaleString({}, { minimumIntegerDigits: 3 });
    student.admissionYear = year;
    student.type = types[type];
  } else if (types[type] == 2) {
    const programme = 'M.Tech';
    const subject = courses1[Math.floor(Math.random() * 2)];
    student.programme = programme + ' (' + subject + ')';
    student.mode = modes[Math.floor(Math.random() * 2)];
    const year = years[Math.floor(Math.random() * 3)];
    student.roll =
      year +
      '02' +
      ((index % 999) + 1).toLocaleString({}, { minimumIntegerDigits: 3 });
    student.admissionYear = year;
    student.type = types[type];
  } else if (types[type] == 3) {
    const programme = 'PhD.';
    const subject = courses2[Math.floor(Math.random() * 2)];
    student.programme = programme + ' (' + subject + ')';
    student.mode = times[Math.floor(Math.random() * 2)];
    const year = years[Math.floor(Math.random() * 3)];
    student.roll =
      year +
      '03' +
      ((index % 999) + 1).toLocaleString({}, { minimumIntegerDigits: 3 });
    student.admissionYear = year;
    student.type = types[type];
  }

  student.email =
    student.fullName.toLowerCase().replace(/ +/g, '') +
    '.' +
    student.roll +
    '@iiitg.ac.in';

  seedData.push(student);
}

fs.writeFileSync('dummy.json', JSON.stringify(seedData));
